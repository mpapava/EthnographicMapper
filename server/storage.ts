import { 
  users, regions, tours, products, blogPosts, contacts, bookings, cartItems,
  type User, type InsertUser, type UpsertUser, type Region, type InsertRegion, 
  type Tour, type InsertTour, type Product, type InsertProduct,
  type BlogPost, type InsertBlogPost, type Contact, type InsertContact,
  type Booking, type InsertBooking, type CartItem, type InsertCartItem
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import createMemoryStore from "memorystore";
import { v4 as uuidv4 } from "uuid";

export interface IStorage {
  // Users (supports both Replit Auth and username/password auth)
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(userData: { username: string; email: string; password: string; firstName?: string; lastName?: string; role?: string }): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: string, userData: Partial<InsertUser> & { newPassword?: string }): Promise<User | undefined>;
  updateUserRole(id: string, role: string): Promise<User | undefined>;
  updateUserStatus(id: string, isActive: boolean): Promise<User | undefined>;
  
  // Session store for authentication
  sessionStore: session.SessionStore;

  // Regions
  getAllRegions(): Promise<Region[]>;
  getRegionById(id: number): Promise<Region | undefined>;
  getRegionBySlug(slug: string): Promise<Region | undefined>;
  createRegion(region: InsertRegion): Promise<Region>;
  updateRegion(id: number, region: Partial<InsertRegion>): Promise<Region | undefined>;
  deleteRegion(id: number): Promise<boolean>;

  // Tours
  getAllTours(): Promise<Tour[]>;
  getTourById(id: number): Promise<Tour | undefined>;
  getToursByRegion(regionId: number): Promise<Tour[]>;
  getToursByCategory(category: string): Promise<Tour[]>;
  getFeaturedTours(): Promise<Tour[]>;
  createTour(tour: InsertTour): Promise<Tour>;
  updateTour(id: number, tour: Partial<InsertTour>): Promise<Tour | undefined>;
  deleteTour(id: number): Promise<boolean>;

  // Products
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;

  // Blog Posts
  getAllBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostsByCategory(category: string): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;

  // Contacts
  getAllContacts(): Promise<Contact[]>;
  getContactById(id: number): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContactStatus(id: number, status: string): Promise<Contact | undefined>;

  // Bookings
  getAllBookings(): Promise<Booking[]>;
  getBookingById(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;

  // Cart
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private regions: Map<number, Region>;
  private tours: Map<number, Tour>;
  private products: Map<number, Product>;
  private blogPosts: Map<number, BlogPost>;
  private contacts: Map<number, Contact>;
  private bookings: Map<number, Booking>;
  private cartItems: Map<number, CartItem>;
  private currentUserId: number;
  private currentRegionId: number;
  private currentTourId: number;
  private currentProductId: number;
  private currentBlogPostId: number;
  private currentContactId: number;
  private currentBookingId: number;
  private currentCartItemId: number;
  
  public sessionStore: session.SessionStore;

  constructor() {
    this.users = new Map();
    this.regions = new Map();
    this.tours = new Map();
    this.products = new Map();
    this.blogPosts = new Map();
    this.contacts = new Map();
    this.bookings = new Map();
    this.cartItems = new Map();
    this.currentUserId = 1;
    this.currentRegionId = 1;
    this.currentTourId = 1;
    this.currentProductId = 1;
    this.currentBlogPostId = 1;
    this.currentContactId = 1;
    this.currentBookingId = 1;
    this.currentCartItemId = 1;

    // Initialize session store for authentication
    const MemoryStore = createMemoryStore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });

    this.initializeData();
  }

  private initializeData() {
    // Initialize with Georgian regions
    const georgianRegions: InsertRegion[] = [
      {
        name: "Kakheti",
        nameKa: "კახეთი",
        nameRu: "Кахетия",
        description: "The wine region of Georgia, home to ancient winemaking traditions and spectacular vineyard landscapes.",
        descriptionKa: "საქართველოს ღვინის რეგიონი, უძველესი ღვინის დამზადების ტრადიციებისა და თოვლის ვენახების სახლი.",
        descriptionRu: "Винодельческий регион Грузии, дом древних традиций виноделия и захватывающих виноградных пейзажей.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        mainAttraction: "Wine Tasting Tours",
        slug: "kakheti",
        featured: true
      },
      {
        name: "Svaneti",
        nameKa: "სვანეთი",
        nameRu: "Сванетия",
        description: "Ancient mountain region famous for its medieval defensive towers and pristine alpine landscapes.",
        descriptionKa: "უძველესი მთის რეგიონი, რომელიც ცნობილია თავისი შუასაუკუნეების თავდაცვითი კოშკებით და ბუნებრივი ალპური პეიზაჟებით.",
        descriptionRu: "Древний горный регион, известный своими средневековыми оборонительными башнями и первозданными альпийскими пейзажами.",
        imageUrl: "https://pixabay.com/get/g346b7b7ab685519ea4030dc4396d64f6b8e2c640a39cfd2a124069f3b06120fa13d1ff947c96264ab1d9495a5a49e5f09db2bb267a285923445cbe4e9ca6536c_1280.jpg",
        mainAttraction: "Mountain Hiking",
        slug: "svaneti",
        featured: true
      },
      {
        name: "Samegrelo",
        nameKa: "სამეგრელო",
        nameRu: "Самегрело",
        description: "Coastal region known for its unique Megrelian cuisine and subtropical climate.",
        descriptionKa: "სანაპირო რეგიონი, რომელიც ცნობილია თავისი უნიკალური მეგრული სამზარეულოთი და სუბტროპიკული კლიმატით.",
        descriptionRu: "Прибрежный регион, известный своей уникальной мегрельской кухней и субтропическим климатом.",
        imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        mainAttraction: "Culinary Tours",
        slug: "samegrelo",
        featured: true
      },
      {
        name: "Imereti",
        nameKa: "იმერეთი",
        nameRu: "Имеретия",
        description: "Historical heartland featuring ancient cave cities and traditional Georgian architecture.",
        descriptionKa: "ისტორიული სათავე, რომელიც მოიცავს უძველეს გამოქვაბული ქალაქებს და ტრადიციულ ქართულ არქიტექტურას.",
        descriptionRu: "Историческое сердце с древними пещерными городами и традиционной грузинской архитектурой.",
        imageUrl: "https://pixabay.com/get/gd35f027c66d20240d4bd7644af5b6a7ca6865713ea30f677bf1ffec2a800476c281cea1bf9dfd2b174f74b2947bf8b86a6bab7d2072436a17ef2783aa2b8cb26_1280.jpg",
        mainAttraction: "Historical Sites",
        slug: "imereti",
        featured: true
      },
      {
        name: "Racha",
        nameKa: "რაჭა",
        nameRu: "Рача",
        description: "Highland region renowned for its pristine nature and traditional mountain hospitality.",
        descriptionKa: "მთიანი რეგიონი, რომელიც ცნობილია თავისი ბუნებრივი ბუნებითა და ტრადიციული მთის სტუმარმასპინძლობით.",
        descriptionRu: "Горный регион, известный своей первозданной природой и традиционным горным гостеприимством.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        mainAttraction: "Nature Tours",
        slug: "racha",
        featured: false
      },
      {
        name: "Javakheti",
        nameKa: "ჯავახეთი",
        nameRu: "Джавахети",
        description: "High plateau region with unique volcanic landscapes and nomadic heritage.",
        descriptionKa: "მაღალი პლატოს რეგიონი უნიკალური ვულკანური პეიზაჟებითა და ნომადური მემკვიდრეობით.",
        descriptionRu: "Высокогорный плато регион с уникальными вулканическими пейзажами и кочевым наследием.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        mainAttraction: "Adventure Tours",
        slug: "javakheti",
        featured: false
      }
    ];

    // Initialize regions
    georgianRegions.forEach(region => {
      const newRegion: Region = { ...region, id: this.currentRegionId++ };
      this.regions.set(newRegion.id, newRegion);
    });

    // Initialize tours
    const tours: InsertTour[] = [
      {
        title: "Kakheti Wine Heritage Tour",
        titleKa: "კახეთის ღვინის მემკვიდრეობის ტური",
        titleRu: "Тур винного наследия Кахетии",
        description: "Experience traditional Georgian winemaking in ancient qvevri clay vessels. Includes tastings, cellar visits, and participation in wine pressing.",
        descriptionKa: "გამოცდილება ტრადიციული ქართული ღვინის დამზადება ძველ ქვევრის თიხის ჭურჭელში. მოიცავს დეგუსტაციას, მარნის ვიზიტს და ღვინის მორწვაში მონაწილეობას.",
        descriptionRu: "Познакомьтесь с традиционным грузинским виноделием в древних глиняных сосудах квеври. Включает дегустации, посещения погребов и участие в давке винограда.",
        price: "89.00",
        duration: "Full Day (8 hours)",
        maxPeople: 12,
        includes: "Traditional lunch included",
        includesKa: "ტრადიციული ლანჩი შედის",
        includesRu: "Включен традиционный обед",
        category: "wine",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        regionId: 1,
        featured: true
      },
      {
        title: "Authentic Cooking Experience",
        titleKa: "ავთენტური მზარეულობის გამოცდილება",
        titleRu: "Аутентичный кулинарный опыт",
        description: "Learn to prepare traditional Georgian dishes like khachapuri and khinkali with local families. Take home recipes and techniques.",
        descriptionKa: "ისწავლეთ ტრადიციული ქართული კერძების მომზადება, როგორიცაა ხაჭაპური და ხინკალი ადგილობრივ ოჯახებთან ერთად. წაიღეთ სახლში რეცეპტები და ტექნიკები.",
        descriptionRu: "Научитесь готовить традиционные грузинские блюда, такие как хачапури и хинкали, с местными семьями. Заберите домой рецепты и техники.",
        price: "65.00",
        duration: "Half Day (4 hours)",
        maxPeople: 8,
        includes: "Recipe book included",
        includesKa: "რეცეპტების წიგნი შედის",
        includesRu: "Включена книга рецептов",
        category: "culinary",
        imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        regionId: 3,
        featured: true
      },
      {
        title: "Svaneti Heritage Trek",
        titleKa: "სვანეთის მემკვიდრეობის ტრეკი",
        titleRu: "Поход по наследию Сванетии",
        description: "Explore ancient defensive towers and pristine mountain landscapes. Experience traditional Svan hospitality and mountain culture.",
        descriptionKa: "გამოიკვლიეთ უძველეს თავდაცვით კოშკები და ბუნებრივი მთის პეიზაჟები. გამოცდილება ტრადიციული სვანური სტუმარმასპინძლობა და მთის კულტურა.",
        descriptionRu: "Исследуйте древние оборонительные башни и первозданные горные пейзажи. Познакомьтесь с традиционным сванским гостеприимством и горной культурой.",
        price: "120.00",
        duration: "2 Days / 1 Night",
        maxPeople: 10,
        includes: "Guesthouse accommodation",
        includesKa: "სასტუმროს საცხოვრებელი",
        includesRu: "Размещение в гостевом доме",
        category: "adventure",
        imageUrl: "https://pixabay.com/get/g557f845fe2dd020d6a0a2d9c88633869487f9d1165ce31839f0bf5c33776c480667ea1263998dba2646928b6e6279a7406ec8e35ceeca6d98947c245805d1f54_1280.jpg",
        regionId: 2,
        featured: true
      }
    ];

    tours.forEach(tour => {
      const newTour: Tour = { ...tour, id: this.currentTourId++ };
      this.tours.set(newTour.id, newTour);
    });

    // Initialize products
    const products: InsertProduct[] = [
      {
        name: "Kakheti Saperavi 2020",
        nameKa: "კახეთის საფერავი 2020",
        nameRu: "Кахетинский Саперави 2020",
        description: "Premium red wine from traditional qvevri fermentation",
        descriptionKa: "პრემიუმ წითელი ღვინო ტრადიციული ქვევრის ფერმენტაციიდან",
        descriptionRu: "Премиальное красное вино от традиционной ферментации в квеври",
        price: "24.99",
        category: "wine",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        inStock: true,
        featured: true
      },
      {
        name: "Handmade Ceramic Set",
        nameKa: "ხელნაკეთი კერამიკული ნაკრები",
        nameRu: "Набор керамики ручной работы",
        description: "Traditional Georgian pottery, handcrafted by local artisans",
        descriptionKa: "ტრადიციული ქართული ჭურჭელი, ხელნაკეთი ადგილობრივი ხელოსნების მიერ",
        descriptionRu: "Традиционная грузинская керамика, изготовленная местными мастерами",
        price: "45.00",
        category: "crafts",
        imageUrl: "https://pixabay.com/get/g91afe9039e81e33a0e716be0a14794038342bdfc0060c916bf0b574f8a9d67e582891d95529e45c5b08f4c6198f2c122_1280.jpg",
        inStock: true,
        featured: true
      },
      {
        name: "Mountain Honey Collection",
        nameKa: "მთის თაფლის კოლექცია",
        nameRu: "Коллекция горного меда",
        description: "Pure wildflower honey from Georgian highlands",
        descriptionKa: "სუფთა ველური ყვავილების თაფლი ქართული მთებიდან",
        descriptionRu: "Чистый мед из диких цветов грузинских высокогорий",
        price: "18.50",
        category: "food",
        imageUrl: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        inStock: true,
        featured: true
      },
      {
        name: "Wool Carpet Runner",
        nameKa: "მატარღაბის ნახევრადი",
        nameRu: "Шерстяная ковровая дорожка",
        description: "Hand-woven carpet with traditional Georgian patterns",
        descriptionKa: "ხელით ნაქსოვი ღაბადა ტრადიციული ქართული ნიმუშებით",
        descriptionRu: "Ковер ручной работы с традиционными грузинскими узорами",
        price: "89.00",
        category: "crafts",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        inStock: true,
        featured: false
      }
    ];

    products.forEach(product => {
      const newProduct: Product = { ...product, id: this.currentProductId++ };
      this.products.set(newProduct.id, newProduct);
    });

    // Initialize blog posts
    const blogPosts: InsertBlogPost[] = [
      {
        title: "The Sacred Art of Georgian Supra",
        titleKa: "ქართული სუფრის წმინდა ხელოვნება",
        titleRu: "Священное искусство грузинского супра",
        excerpt: "Discover the profound cultural significance of the Georgian feast tradition, where every toast carries meaning and community bonds are strengthened...",
        excerptKa: "აღმოაჩინეთ ქართული ზიავარობის ტრადიციის ღრმა კულტურული მნიშვნელობა, სადაც ყოველი ტოსტი ატარებს მნიშვნელობას და საზოგადოებრივი ბმები ძლიერდება...",
        excerptRu: "Откройте для себя глубокое культурное значение грузинской традиции застолья, где каждый тост несет смысл и укрепляются общественные связи...",
        content: "The Georgian supra is much more than a simple meal...",
        contentKa: "ქართული სუფრა ბევრად მეტია, ვიდრე უბრალო კერძი...",
        contentRu: "Грузинское супра - это гораздо больше, чем простая еда...",
        category: "Traditions",
        imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        slug: "georgian-supra",
        published: true,
        publishedAt: new Date('2024-03-15')
      },
      {
        title: "8000 Years of Winemaking Legacy",
        titleKa: "ღვინის დამზადების 8000 წლის მემკვიდრეობა",
        titleRu: "8000 лет наследия виноделия",
        excerpt: "Journey through Georgia's ancient winemaking heritage, from the first qvevri vessels to UNESCO recognition of traditional methods...",
        excerptKa: "იმოგზაურეთ საქართველოს უძველეს ღვინის მემკვიდრეობაში, პირველი ქვევრებიდან UNESCO-ს აღიარებული ტრადიციული მეთოდებამდე...",
        excerptRu: "Путешествие по древнему винодельческому наследию Грузии, от первых сосудов квеври до признания ЮНЕСКО традиционных методов...",
        content: "Georgia's winemaking tradition spans over 8000 years...",
        contentKa: "საქართველოს ღვინის დამზადების ტრადიცია 8000 წელზე მეტია...",
        contentRu: "Традиция виноделия в Грузии насчитывает более 8000 лет...",
        category: "Heritage",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        slug: "winemaking-legacy",
        published: true,
        publishedAt: new Date('2024-03-10')
      },
      {
        title: "Guardians of the Mountains: Svan Towers",
        titleKa: "მთების მცველები: სვანური კოშკები",
        titleRu: "Стражи гор: Сванские башни",
        excerpt: "Explore the defensive architecture of Upper Svaneti, where medieval stone towers stand as testaments to resilience and community protection...",
        excerptKa: "გამოიკვლიეთ ზემო სვანეთის თავდაცვითი არქიტექტურა, სადაც შუასაუკუნეების ქვის კოშკები დგანან, როგორც მდგრადობისა და საზოგადოების დაცვის მოწმეები...",
        excerptRu: "Исследуйте оборонительную архитектуру Верхней Сванетии, где средневековые каменные башни стоят как свидетельства стойкости и защиты сообщества...",
        content: "The Svan towers of Upper Svaneti represent one of the most unique architectural achievements...",
        contentKa: "ზემო სვანეთის სვანური კოშკები წარმოადგენს ერთ-ერთ ყველაზე უნიკალურ არქიტექტურულ მიღწევას...",
        contentRu: "Сванские башни Верхней Сванетии представляют одно из самых уникальных архитектурных достижений...",
        category: "Architecture",
        imageUrl: "https://pixabay.com/get/g7078e8099237048b8b5ec84f44a6872444c8bfbb9d2265a963a6143916091211a95ef5f77eb687c671a1f12632c45596214d5065f3af9b0ce7bfda81617b0cf7_1280.jpg",
        slug: "svan-towers",
        published: true,
        publishedAt: new Date('2024-03-05')
      }
    ];

    blogPosts.forEach(post => {
      const newPost: BlogPost = { ...post, id: this.currentBlogPostId++, createdAt: post.publishedAt };
      this.blogPosts.set(newPost.id, newPost);
    });
  }

  // User methods (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.id === id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const existingUser = await this.getUser(userData.id);
    
    if (existingUser) {
      const updatedUser: User = {
        ...existingUser,
        ...userData,
        updatedAt: new Date(),
      };
      this.users.set(userData.id, updatedUser);
      return updatedUser;
    } else {
      const newUser: User = {
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.users.set(userData.id, newUser);
      return newUser;
    }
  }

  // New authentication methods for username/password auth
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(userData: { username: string; email: string; password: string; firstName?: string; lastName?: string; role?: string }): Promise<User> {
    const id = `user_${this.currentUserId++}`;
    const newUser: User = {
      id,
      username: userData.username,
      email: userData.email,
      passwordHash: userData.password, // Will be hashed by auth layer
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      profileImageUrl: null,
      role: userData.role || 'user',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(id, newUser);
    return newUser;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async updateUser(id: string, userData: Partial<InsertUser> & { newPassword?: string }): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updateData: any = { ...userData };
    delete updateData.newPassword; // Handle password separately if needed
    
    const updatedUser = { 
      ...user, 
      ...updateData,
      updatedAt: new Date() 
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async updateUserRole(id: string, role: string): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, role, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async updateUserStatus(id: string, isActive: boolean): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, isActive, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Region methods
  async getAllRegions(): Promise<Region[]> {
    return Array.from(this.regions.values());
  }

  async getRegionById(id: number): Promise<Region | undefined> {
    return this.regions.get(id);
  }

  async getRegionBySlug(slug: string): Promise<Region | undefined> {
    return Array.from(this.regions.values()).find(region => region.slug === slug);
  }

  async createRegion(region: InsertRegion): Promise<Region> {
    const id = this.currentRegionId++;
    const newRegion: Region = { ...region, id };
    this.regions.set(id, newRegion);
    return newRegion;
  }

  async updateRegion(id: number, region: Partial<InsertRegion>): Promise<Region | undefined> {
    const existing = this.regions.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...region };
    this.regions.set(id, updated);
    return updated;
  }

  async deleteRegion(id: number): Promise<boolean> {
    return this.regions.delete(id);
  }

  // Tour methods
  async getAllTours(): Promise<Tour[]> {
    return Array.from(this.tours.values());
  }

  async getTourById(id: number): Promise<Tour | undefined> {
    return this.tours.get(id);
  }

  async getToursByRegion(regionId: number): Promise<Tour[]> {
    return Array.from(this.tours.values()).filter(tour => tour.regionId === regionId);
  }

  async getToursByCategory(category: string): Promise<Tour[]> {
    return Array.from(this.tours.values()).filter(tour => tour.category === category);
  }

  async getFeaturedTours(): Promise<Tour[]> {
    return Array.from(this.tours.values()).filter(tour => tour.featured);
  }

  async createTour(tour: InsertTour): Promise<Tour> {
    const id = this.currentTourId++;
    const newTour: Tour = { ...tour, id };
    this.tours.set(id, newTour);
    return newTour;
  }

  async updateTour(id: number, tour: Partial<InsertTour>): Promise<Tour | undefined> {
    const existing = this.tours.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...tour };
    this.tours.set(id, updated);
    return updated;
  }

  async deleteTour(id: number): Promise<boolean> {
    return this.tours.delete(id);
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.category === category);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.featured);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const newProduct: Product = { ...product, id };
    this.products.set(id, newProduct);
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const existing = this.products.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...product };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  // Blog methods
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(post => post.published);
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(post => post.category === category);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const newPost: BlogPost = { ...post, id, createdAt: new Date() };
    this.blogPosts.set(id, newPost);
    return newPost;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existing = this.blogPosts.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...post };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  // Contact methods
  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getContactById(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const newContact: Contact = { ...contact, id, createdAt: new Date() };
    this.contacts.set(id, newContact);
    return newContact;
  }

  async updateContactStatus(id: number, status: string): Promise<Contact | undefined> {
    const existing = this.contacts.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, status };
    this.contacts.set(id, updated);
    return updated;
  }

  // Booking methods
  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBookingById(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const newBooking: Booking = { ...booking, id, createdAt: new Date() };
    this.bookings.set(id, newBooking);
    return newBooking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const existing = this.bookings.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, status };
    this.bookings.set(id, updated);
    return updated;
  }

  // Cart methods
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItem = Array.from(this.cartItems.values()).find(
      cartItem => cartItem.sessionId === item.sessionId && cartItem.productId === item.productId
    );

    if (existingItem) {
      // Update quantity
      const updated = { ...existingItem, quantity: existingItem.quantity + item.quantity };
      this.cartItems.set(existingItem.id, updated);
      return updated;
    } else {
      // Add new item
      const id = this.currentCartItemId++;
      const newItem: CartItem = { ...item, id, createdAt: new Date() };
      this.cartItems.set(id, newItem);
      return newItem;
    }
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const existing = this.cartItems.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, quantity };
    this.cartItems.set(id, updated);
    return updated;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const items = Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
    items.forEach(item => this.cartItems.delete(item.id));
    return true;
  }
}

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // New authentication methods for username/password auth
  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(userData: { username: string; email: string; password: string; firstName?: string; lastName?: string; role?: string }): Promise<User> {
    const id = uuidv4();
    const newUser: User = {
      id,
      username: userData.username,
      email: userData.email,
      passwordHash: userData.password, // Will be hashed by auth layer
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      profileImageUrl: null,
      role: userData.role || 'user',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const [user] = await db
      .insert(users)
      .values(newUser)
      .returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async updateUser(id: string, userData: Partial<InsertUser> & { newPassword?: string }): Promise<User | undefined> {
    const updateData: any = { ...userData };
    delete updateData.newPassword; // Handle password separately if needed
    
    const [updatedUser] = await db
      .update(users)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return updatedUser || undefined;
  }

  async updateUserRole(id: string, role: string): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set({ role, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return updatedUser || undefined;
  }

  async updateUserStatus(id: string, isActive: boolean): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set({ isActive, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return updatedUser || undefined;
  }

  async getAllRegions(): Promise<Region[]> {
    return await db.select().from(regions);
  }

  async getRegionById(id: number): Promise<Region | undefined> {
    const [region] = await db.select().from(regions).where(eq(regions.id, id));
    return region || undefined;
  }

  async getRegionBySlug(slug: string): Promise<Region | undefined> {
    const [region] = await db.select().from(regions).where(eq(regions.slug, slug));
    return region || undefined;
  }

  async createRegion(region: InsertRegion): Promise<Region> {
    const [newRegion] = await db
      .insert(regions)
      .values(region)
      .returning();
    return newRegion;
  }

  async updateRegion(id: number, region: Partial<InsertRegion>): Promise<Region | undefined> {
    const [updatedRegion] = await db
      .update(regions)
      .set(region)
      .where(eq(regions.id, id))
      .returning();
    return updatedRegion || undefined;
  }

  async deleteRegion(id: number): Promise<boolean> {
    const result = await db.delete(regions).where(eq(regions.id, id));
    return result.rowCount > 0;
  }

  async getAllTours(): Promise<Tour[]> {
    return await db.select().from(tours);
  }

  async getTourById(id: number): Promise<Tour | undefined> {
    const [tour] = await db.select().from(tours).where(eq(tours.id, id));
    return tour || undefined;
  }

  async getToursByRegion(regionId: number): Promise<Tour[]> {
    return await db.select().from(tours).where(eq(tours.regionId, regionId));
  }

  async getToursByCategory(category: string): Promise<Tour[]> {
    return await db.select().from(tours).where(eq(tours.category, category));
  }

  async getFeaturedTours(): Promise<Tour[]> {
    return await db.select().from(tours).where(eq(tours.featured, true));
  }

  async createTour(tour: InsertTour): Promise<Tour> {
    const [newTour] = await db
      .insert(tours)
      .values(tour)
      .returning();
    return newTour;
  }

  async updateTour(id: number, tour: Partial<InsertTour>): Promise<Tour | undefined> {
    const [updatedTour] = await db
      .update(tours)
      .set(tour)
      .where(eq(tours.id, id))
      .returning();
    return updatedTour || undefined;
  }

  async deleteTour(id: number): Promise<boolean> {
    const result = await db.delete(tours).where(eq(tours.id, id));
    return result.rowCount > 0;
  }

  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProductById(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.category, category));
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.featured, true));
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db
      .insert(products)
      .values(product)
      .returning();
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updatedProduct] = await db
      .update(products)
      .set(product)
      .where(eq(products.id, id))
      .returning();
    return updatedProduct || undefined;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return result.rowCount > 0;
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts);
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).where(eq(blogPosts.published, true));
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).where(eq(blogPosts.category, category));
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db
      .insert(blogPosts)
      .values(post)
      .returning();
    return newPost;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updatedPost] = await db
      .update(blogPosts)
      .set(post)
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost || undefined;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return result.rowCount > 0;
  }

  async getAllContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }

  async getContactById(id: number): Promise<Contact | undefined> {
    const [contact] = await db.select().from(contacts).where(eq(contacts.id, id));
    return contact || undefined;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const [newContact] = await db
      .insert(contacts)
      .values(contact)
      .returning();
    return newContact;
  }

  async updateContactStatus(id: number, status: string): Promise<Contact | undefined> {
    const [updatedContact] = await db
      .update(contacts)
      .set({ status })
      .where(eq(contacts.id, id))
      .returning();
    return updatedContact || undefined;
  }

  async getAllBookings(): Promise<Booking[]> {
    return await db.select().from(bookings);
  }

  async getBookingById(id: number): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || undefined;
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db
      .insert(bookings)
      .values(booking)
      .returning();
    return newBooking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const [updatedBooking] = await db
      .update(bookings)
      .set({ status })
      .where(eq(bookings.id, id))
      .returning();
    return updatedBooking || undefined;
  }

  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return await db.select().from(cartItems).where(eq(cartItems.sessionId, sessionId));
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const [newItem] = await db
      .insert(cartItems)
      .values(item)
      .returning();
    return newItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const [updatedItem] = await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, id))
      .returning();
    return updatedItem || undefined;
  }

  async removeFromCart(id: number): Promise<boolean> {
    const result = await db.delete(cartItems).where(eq(cartItems.id, id));
    return result.rowCount > 0;
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const result = await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId));
    return result.rowCount > 0;
  }
}

export const storage = new DatabaseStorage();
