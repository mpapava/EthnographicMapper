import { db } from "./db";
import { regions, tours, products, blogPosts } from "@shared/schema";

async function seedDatabase() {
  console.log("🌱 Seeding database...");

  try {
    // Clear existing data
    await db.delete(blogPosts);
    await db.delete(products);
    await db.delete(tours);
    await db.delete(regions);

    // Seed regions
    const insertedRegions = await db.insert(regions).values([
      {
        name: "Kakheti",
        nameKa: "კახეთი",
        nameRu: "Кахетия",
        slug: "kakheti",
        description: "The wine region of Georgia, home to ancient winemaking traditions and spectacular vineyard landscapes.",
        descriptionKa: "საქართველოს ღვინის რეგიონი, უძველესი ღვინის დამზადების ტრადიციებისა და ღვინის ვენახების მშვენიერი ლანდშაფტების სამშობლო.",
        descriptionRu: "Винодельческий регион Грузии, родина древних традиций виноделия и великолепных виноградных пейзажей.",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
        mainAttraction: "Ancient wine cellars and vineyards",
        featured: true
      },
      {
        name: "Svaneti",
        nameKa: "სვანეთი",
        nameRu: "Сванетия",
        slug: "svaneti",
        description: "A highland region known for its medieval towers, unique culture, and breathtaking mountain landscapes.",
        descriptionKa: "მთიანი რეგიონი, რომელიც ცნობილია თავისი შუა საუკუნეების კოშკებით, უნიკალური კულტურითა და თვალწარმტაცი მთის ლანდშაფტებით.",
        descriptionRu: "Горный регион, известный своими средневековыми башнями, уникальной культурой и захватывающими горными пейзажами.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        mainAttraction: "Medieval Svan towers",
        featured: true
      },
      {
        name: "Samegrelo",
        nameKa: "სამეგრელო",
        nameRu: "Самегрело",
        slug: "samegrelo",
        description: "A region rich in Mingrelian culture, known for its distinctive cuisine and warm hospitality.",
        descriptionKa: "რეგიონი მდიდარი მეგრული კულტურით, ცნობილია თავისი გამორჩეული სამზარეულოთი და თბილი სტუმარმასპინძლობით.",
        descriptionRu: "Регион, богатый мегрельской культурой, известный своей отличительной кухней и теплым гостеприимством.",
        imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        mainAttraction: "Mingrelian cultural sites",
        featured: false
      },
      {
        name: "Imereti",
        nameKa: "იმერეთი",
        nameRu: "Имерети",
        slug: "imereti",
        description: "The central region of Georgia, featuring diverse landscapes from caves to vineyards.",
        descriptionKa: "საქართველოს ცენტრალური რეგიონი, რომელიც ხასიათდება მრავალფეროვანი ლანდშაფტებით მღვიმეებიდან ვენახებამდე.",
        descriptionRu: "Центральный регион Грузии с разнообразными ландшафтами от пещер до виноградников.",
        imageUrl: "https://images.unsplash.com/photo-1536431311719-398b6704d4cc",
        mainAttraction: "Prometheus Cave and vineyards",
        featured: false
      },
      {
        name: "Racha",
        nameKa: "რაჭა",
        nameRu: "Рача",
        slug: "racha",
        description: "A mountainous region famous for its mineral waters and traditional mountain culture.",
        descriptionKa: "მთიანი რეგიონი, რომელიც ცნობილია თავისი მინერალური წყლებითა და ტრადიციული მთის კულტურით.",
        descriptionRu: "Горный регион, известный своими минеральными водами и традиционной горной культурой.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        mainAttraction: "Mineral springs and mountain villages",
        featured: false
      },
      {
        name: "Javakheti",
        nameKa: "ჯავახეთი",
        nameRu: "Джавахети",
        slug: "javakheti",
        description: "A high plateau region with unique volcanic landscapes and ancient cultural heritage.",
        descriptionKa: "მაღალმთიანი პლატო რეგიონი უნიკალური ვულკანური ლანდშაფტებითა და უძველესი კულტურული მემკვიდრეობით.",
        descriptionRu: "Высокогорный плато-регион с уникальными вулканическими ландшафтами и древним культурным наследием.",
        imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144",
        mainAttraction: "Volcanic plateaus and ancient sites",
        featured: false
      }
    ]).returning();

    console.log("✅ Regions seeded");

    // Seed tours
    await db.insert(tours).values([
      {
        title: "Kakheti Wine Heritage Tour",
        titleKa: "კახეთის ღვინის მემკვიდრეობის ტური",
        titleRu: "Тур винного наследия Кахетии",
        description: "Explore the ancient winemaking traditions of Georgia's premier wine region.",
        descriptionKa: "გამოიკვლიეთ საქართველოს მთავარი ღვინის რეგიონის უძველესი ღვინის დამზადების ტრადიციები.",
        descriptionRu: "Исследуйте древние традиции виноделия главного винного региона Грузии.",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
        featured: true,
        category: "Cultural",
        price: "150",
        duration: "Full Day",
        maxPeople: 12,
        includes: "Transportation, wine tasting, traditional lunch, guide",
        regionId: insertedRegions[0].id
      },
      {
        title: "Svaneti Mountain Adventure",
        titleKa: "სვანეთის მთის თავგადასავალი",
        titleRu: "Горное приключение в Сванетии",
        description: "Discover the medieval towers and mountain culture of Upper Svaneti.",
        descriptionKa: "აღმოაჩინეთ ზემო სვანეთის შუა საუკუნეების კოშკები და მთის კულტურა.",
        descriptionRu: "Откройте для себя средневековые башни и горную культуру Верхней Сванетии.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true,
        category: "Adventure",
        price: "200",
        duration: "2 Days",
        maxPeople: 8,
        includes: "Mountain guide, accommodation, meals, transportation",
        regionId: insertedRegions[1].id
      },
      {
        title: "Samegrelo Cultural Experience",
        titleKa: "სამეგრელოს კულტურული გამოცდილება",
        titleRu: "Культурный опыт Самегрело",
        description: "Immerse yourself in the unique Mingrelian culture and cuisine.",
        descriptionKa: "ჩაეფლვეთ უნიკალურ მეგრულ კულტურასა და სამზარეულოში.",
        descriptionRu: "Погрузитесь в уникальную мегрельскую культуру и кухню.",
        imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: false,
        category: "Cultural",
        price: "120",
        duration: "Half Day",
        maxPeople: 15,
        includes: "Cultural guide, traditional meal, local crafts workshop",
        regionId: insertedRegions[2].id
      },
      {
        title: "Tbilisi Historical Walking Tour",
        titleKa: "თბილისის ისტორიული ფეხით ტური",
        titleRu: "Исторический пешеходный тур по Тбилиси",
        description: "Explore the old town and discover centuries of Georgian history.",
        descriptionKa: "გამოიკვლიეთ ძველი ქალაქი და აღმოაჩინეთ საქართველოს საუკუნეების ისტორია.",
        descriptionRu: "Исследуйте старый город и откройте для себя века грузинской истории.",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true,
        category: "Cultural",
        price: "80",
        duration: "Half Day",
        maxPeople: 20,
        includes: "Professional guide, entrance fees, traditional snacks",
        regionId: insertedRegions[0].id
      },
      {
        title: "Samtskhe-Javakheti Adventure",
        titleKa: "სამცხე-ჯავახეთის თავგადასავალი",
        titleRu: "Приключение в Самцхе-Джавахети",
        description: "Discover ancient fortresses and volcanic landscapes.",
        descriptionKa: "აღმოაჩინეთ უძველესი ციხე-სიმაგრეები და ვულკანური ლანდშაფტები.",
        descriptionRu: "Откройте древние крепости и вулканические пейзажи.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: false,
        category: "Adventure",
        price: "180",
        duration: "Full Day",
        maxPeople: 10,
        includes: "Transportation, guide, lunch, fortress entrance",
        regionId: insertedRegions[3].id
      },
      {
        title: "Adjara Coastal Discovery",
        titleKa: "აჭარის სანაპირო აღმოჩენა",
        titleRu: "Открытие побережья Аджарии",
        description: "Experience the unique blend of Georgian and Turkish cultures by the Black Sea.",
        descriptionKa: "გამოიცადეთ ქართული და თურქული კულტურების უნიკალური ნაზავი შავი ზღვის სანაპიროზე.",
        descriptionRu: "Испытайте уникальное сочетание грузинской и турецкой культур у Черного моря.",
        imageUrl: "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true,
        category: "Cultural",
        price: "140",
        duration: "Full Day",
        maxPeople: 15,
        includes: "Beach access, cultural sites, traditional Adjarian khachapuri",
        regionId: insertedRegions[4].id
      },
      {
        title: "Imereti Cave Exploration",
        titleKa: "იმერეთის მღვიმეების აღმოჩენა",
        titleRu: "Исследование пещер Имерети",
        description: "Journey through Georgia's most spectacular underground caves.",
        descriptionKa: "მოგზაურობა საქართველოს ყველაზე ეფექტურ მიწისქვეშა მღვიმეებში.",
        descriptionRu: "Путешествие по самым зрелищным подземным пещерам Грузии.",
        imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: false,
        category: "Adventure",
        price: "100",
        duration: "Half Day",
        maxPeople: 12,
        includes: "Cave entrance, safety equipment, guide",
        regionId: insertedRegions[5].id
      }
    ]);

    console.log("✅ Tours seeded");

    // Seed products
    await db.insert(products).values([
      {
        name: "Kakheti Saperavi 2020",
        nameKa: "კახური საფერავი 2020",
        nameRu: "Кахетинский Саперави 2020",
        description: "Premium Georgian red wine from ancient Qvevri method.",
        descriptionKa: "პრემიუმ ქართული წითელი ღვინო უძველესი ქვევრის მეთოდით.",
        descriptionRu: "Премиальное грузинское красное вино древним методом квеври.",
        imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb",
        featured: true,
        category: "Wine",
        price: "45.00",
        inStock: true
      },
      {
        name: "Svan Salt",
        nameKa: "სვანური მარილი",
        nameRu: "Сванская соль",
        description: "Traditional seasoning blend from Svaneti highlands.",
        descriptionKa: "ტრადიციული სანელებლების ნაზავი სვანეთის მთებიდან.",
        descriptionRu: "Традиционная смесь приправ из высокогорной Сванетии.",
        imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
        featured: false,
        category: "Food",
        price: "12.00",
        inStock: true
      },
      {
        name: "Georgian Chacha",
        nameKa: "ქართული ჭაჭა",
        nameRu: "Грузинская чача",
        description: "Traditional Georgian grape brandy, 40% alcohol.",
        descriptionKa: "ტრადიციული ქართული ყურძნის ბრენდი, 40% ალკოჰოლი.",
        descriptionRu: "Традиционный грузинский виноградный бренди, 40% алкоголя.",
        imageUrl: "https://images.unsplash.com/photo-1566821582776-92b2c0df1c02",
        featured: false,
        category: "Spirits",
        price: "35.00",
        inStock: true
      },
      {
        name: "Adjarian Honey",
        nameKa: "აჭარული თაფლი",
        nameRu: "Аджарский мед",
        description: "Pure mountain honey from Adjara's pristine forests.",
        descriptionKa: "სუფთა მთის თაფლი აჭარის უბიწო ტყეებიდან.",
        descriptionRu: "Чистый горный мед из нетронутых лесов Аджарии.",
        imageUrl: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true,
        category: "Food",
        price: "18.00",
        inStock: true
      },
      {
        name: "Georgian Khinkali Spice Mix",
        nameKa: "ქართული ხინკლის სანელებლები",
        nameRu: "Грузинская смесь специй для хинкали",
        description: "Authentic spice blend for traditional Georgian dumplings.",
        descriptionKa: "ავთენტური სანელებლების ნაზავი ტრადიციული ქართული ხინკლისთვის.",
        descriptionRu: "Аутентичная смесь специй для традиционных грузинских пельменей.",
        imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: false,
        category: "Food",
        price: "8.00",
        inStock: true
      },
      {
        name: "Rkatsiteli White Wine 2021",
        nameKa: "რქაწითელი თეთრი ღვინო 2021",
        nameRu: "Ркацители белое вино 2021",
        description: "Crisp white wine from Georgia's indigenous grape variety.",
        descriptionKa: "გამბრუნებული თეთრი ღვინო საქართველოს ადგილობრივი ყურძნის ჯიშიდან.",
        descriptionRu: "Свежее белое вино из местного грузинского сорта винограда.",
        imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true,
        category: "Wine",
        price: "38.00",
        inStock: true
      },
      {
        name: "Georgian Churchkhela",
        nameKa: "ქართული ჩურჩხელა",
        nameRu: "Грузинская чурчхела",
        description: "Traditional Georgian candle-shaped candy made with grape juice and nuts.",
        descriptionKa: "ტრადიციული ქართული სანთლის ფორმის ტკბილეული ყურძნის წვენითა და კაკლით.",
        descriptionRu: "Традиционная грузинская свеча-конфета из виноградного сока и орехов.",
        imageUrl: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: false,
        category: "Food",
        price: "15.00",
        inStock: true
      },
      {
        name: "Traditional Georgian Clay Wine Jug",
        nameKa: "ტრადიციული ქართული თიხის ღვინის ქოთანი",
        nameRu: "Традиционный грузинский глиняный винный кувшин",
        description: "Handcrafted clay vessel for storing and serving Georgian wine.",
        descriptionKa: "ხელნაკეთი თიხის ჭურჭელი ქართული ღვინის შესანახად და მიწოდებისთვის.",
        descriptionRu: "Ручной работы глиняный сосуд для хранения и подачи грузинского вина.",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true,
        category: "Souvenirs",
        price: "65.00",
        inStock: true
      }
    ]);

    console.log("✅ Products seeded");

    // Seed blog posts
    await db.insert(blogPosts).values([
      {
        title: "The Sacred Art of Georgian Supra",
        titleKa: "ქართული სუფრის წმინდა ხელოვნება",
        titleRu: "Священное искусство грузинского супра",
        slug: "sacred-art-georgian-supra",
        content: "The Georgian supra is more than just a feast—it's a sacred ritual that connects generations, honors guests, and celebrates life itself...",
        excerpt: "Discover the deep cultural significance behind Georgia's traditional feast and its role in preserving national identity.",
        excerptKa: "აღმოაჩინეთ ღრმა კულტურული მნიშვნელობა ქართული ტრადიციული ზაფხულის მიღმა და მისი როლი ეროვნული იდენტობის შენარჩუნებაში.",
        excerptRu: "Откройте глубокое культурное значение грузинского традиционного пира и его роль в сохранении национальной идентичности.",
        imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975",
        category: "Culture",
        published: true,
        publishedAt: new Date("2024-01-15"),
        createdAt: new Date("2024-01-15")
      },
      {
        title: "Winemaking Traditions in Modern Georgia",
        titleKa: "ღვინის დამზადების ტრადიციები თანამედროვე საქართველოში",
        titleRu: "Традиции виноделия в современной Грузии",
        slug: "winemaking-traditions-modern-georgia",
        content: "Georgia's 8,000-year winemaking tradition continues to thrive in the modern era, blending ancient techniques with contemporary innovation...",
        excerpt: "How Georgia's ancient qvevri winemaking method is experiencing a renaissance in the 21st century.",
        excerptKa: "როგორ განიცდის საქართველოს უძველესი ქვევრის ღვინის დამზადების მეთოდი რენესანსს XXI საუკუნეში.",
        excerptRu: "Как древний грузинский метод виноделия квеври переживает ренессанс в XXI веке.",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
        category: "Wine",
        published: true,
        publishedAt: new Date("2024-01-10"),
        createdAt: new Date("2024-01-10")
      }
    ]);

    console.log("✅ Blog posts seeded");
    console.log("🎉 Database seeding completed successfully!");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export { seedDatabase };