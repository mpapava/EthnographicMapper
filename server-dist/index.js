var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import "dotenv/config";
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  blogPosts: () => blogPosts,
  bookings: () => bookings,
  cartItems: () => cartItems,
  contacts: () => contacts,
  insertBlogPostSchema: () => insertBlogPostSchema,
  insertBookingSchema: () => insertBookingSchema,
  insertCartItemSchema: () => insertCartItemSchema,
  insertContactSchema: () => insertContactSchema,
  insertProductSchema: () => insertProductSchema,
  insertRegionSchema: () => insertRegionSchema,
  insertTourSchema: () => insertTourSchema,
  insertUserSchema: () => insertUserSchema,
  products: () => products,
  regions: () => regions,
  sessions: () => sessions,
  tours: () => tours,
  upsertUserSchema: () => upsertUserSchema,
  users: () => users
});
import { pgTable, text, serial, integer, boolean, decimal, timestamp, varchar, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull()
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);
var users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  username: varchar("username").unique(),
  email: varchar("email").unique(),
  passwordHash: varchar("password_hash"),
  // for username/password auth
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").default("user"),
  // user, admin
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var regions = pgTable("regions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameKa: text("name_ka"),
  // Georgian name
  nameRu: text("name_ru"),
  // Russian name
  description: text("description").notNull(),
  descriptionKa: text("description_ka"),
  descriptionRu: text("description_ru"),
  imageUrl: text("image_url").notNull(),
  mainAttraction: text("main_attraction").notNull(),
  location: text("location"),
  // Geographic location
  locationKa: text("location_ka"),
  locationRu: text("location_ru"),
  bestTimeToVisit: text("best_time_to_visit"),
  // Best time to visit
  bestTimeToVisitKa: text("best_time_to_visit_ka"),
  bestTimeToVisitRu: text("best_time_to_visit_ru"),
  climate: text("climate"),
  // Climate information
  climateKa: text("climate_ka"),
  climateRu: text("climate_ru"),
  howToReach: text("how_to_reach"),
  // Transportation info
  howToReachKa: text("how_to_reach_ka"),
  howToReachRu: text("how_to_reach_ru"),
  slug: text("slug").notNull().unique(),
  featured: boolean("featured").default(false)
});
var tours = pgTable("tours", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleKa: text("title_ka"),
  titleRu: text("title_ru"),
  description: text("description").notNull(),
  descriptionKa: text("description_ka"),
  descriptionRu: text("description_ru"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  duration: text("duration").notNull(),
  maxPeople: integer("max_people").notNull(),
  includes: text("includes").notNull(),
  includesKa: text("includes_ka"),
  includesRu: text("includes_ru"),
  category: text("category").notNull(),
  // wine, culinary, cultural, adventure
  imageUrl: text("image_url").notNull(),
  regionId: integer("region_id").references(() => regions.id),
  featured: boolean("featured").default(false)
});
var products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameKa: text("name_ka"),
  nameRu: text("name_ru"),
  description: text("description").notNull(),
  descriptionKa: text("description_ka"),
  descriptionRu: text("description_ru"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(),
  // wine, food, crafts, souvenirs
  imageUrl: text("image_url").notNull(),
  inStock: boolean("in_stock").default(true),
  featured: boolean("featured").default(false)
});
var blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleKa: text("title_ka"),
  titleRu: text("title_ru"),
  excerpt: text("excerpt").notNull(),
  excerptKa: text("excerpt_ka"),
  excerptRu: text("excerpt_ru"),
  content: text("content").notNull(),
  contentKa: text("content_ka"),
  contentRu: text("content_ru"),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  slug: text("slug").notNull().unique(),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow()
});
var contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  interest: text("interest").notNull(),
  message: text("message").notNull(),
  status: text("status").default("new"),
  // new, responded, closed
  createdAt: timestamp("created_at").defaultNow()
});
var bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  tourId: integer("tour_id").references(() => tours.id).notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  numberOfPeople: integer("number_of_people").notNull(),
  preferredDate: text("preferred_date").notNull(),
  specialRequests: text("special_requests"),
  status: text("status").default("pending"),
  // pending, confirmed, cancelled
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  productId: integer("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).omit({ createdAt: true, updatedAt: true, passwordHash: true }).extend({
  password: z.string().min(6, "Password must be at least 6 characters")
});
var upsertUserSchema = createInsertSchema(users).omit({ createdAt: true, updatedAt: true });
var insertRegionSchema = createInsertSchema(regions).omit({ id: true });
var insertTourSchema = createInsertSchema(tours).omit({ id: true });
var insertProductSchema = createInsertSchema(products).omit({ id: true });
var insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true, createdAt: true });
var insertContactSchema = createInsertSchema(contacts).omit({ id: true, createdAt: true });
var insertBookingSchema = createInsertSchema(bookings).omit({ id: true, createdAt: true });
var insertCartItemSchema = createInsertSchema(cartItems).omit({ id: true, createdAt: true });

// server/db.ts
import "dotenv/config";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set.");
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle(pool, { schema: schema_exports });

// server/storage.ts
import { eq } from "drizzle-orm";
import session from "express-session";
import createMemoryStore from "memorystore";
import { v4 as uuidv4 } from "uuid";
var DatabaseStorage = class {
  // User operations (mandatory for Replit Auth)
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async upsertUser(userData) {
    const [user] = await db.insert(users).values(userData).onConflictDoUpdate({
      target: users.id,
      set: {
        ...userData,
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return user;
  }
  // New authentication methods for username/password auth
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  async createUser(userData) {
    const id = uuidv4();
    const newUser = {
      id,
      username: userData.username,
      email: userData.email,
      passwordHash: userData.password,
      // Will be hashed by auth layer
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      profileImageUrl: null,
      role: userData.role || "user",
      isActive: true,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    const [user] = await db.insert(users).values(newUser).returning();
    return user;
  }
  async getAllUsers() {
    return await db.select().from(users);
  }
  async updateUser(id, userData) {
    const updateData = { ...userData };
    delete updateData.newPassword;
    const [updatedUser] = await db.update(users).set({ ...updateData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, id)).returning();
    return updatedUser || void 0;
  }
  async updateUserRole(id, role) {
    const [updatedUser] = await db.update(users).set({ role, updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, id)).returning();
    return updatedUser || void 0;
  }
  async updateUserStatus(id, isActive) {
    const [updatedUser] = await db.update(users).set({ isActive, updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, id)).returning();
    return updatedUser || void 0;
  }
  async getAllRegions() {
    return await db.select().from(regions);
  }
  async getRegionById(id) {
    const [region] = await db.select().from(regions).where(eq(regions.id, id));
    return region || void 0;
  }
  async getRegionBySlug(slug) {
    const [region] = await db.select().from(regions).where(eq(regions.slug, slug));
    return region || void 0;
  }
  async createRegion(region) {
    const [newRegion] = await db.insert(regions).values(region).returning();
    return newRegion;
  }
  async updateRegion(id, region) {
    const [updatedRegion] = await db.update(regions).set(region).where(eq(regions.id, id)).returning();
    return updatedRegion || void 0;
  }
  async deleteRegion(id) {
    const result = await db.delete(regions).where(eq(regions.id, id));
    return result.rowCount > 0;
  }
  async getAllTours() {
    return await db.select().from(tours);
  }
  async getTourById(id) {
    const [tour] = await db.select().from(tours).where(eq(tours.id, id));
    return tour || void 0;
  }
  async getToursByRegion(regionId) {
    return await db.select().from(tours).where(eq(tours.regionId, regionId));
  }
  async getToursByCategory(category) {
    return await db.select().from(tours).where(eq(tours.category, category));
  }
  async getFeaturedTours() {
    return await db.select().from(tours).where(eq(tours.featured, true));
  }
  async createTour(tour) {
    const [newTour] = await db.insert(tours).values(tour).returning();
    return newTour;
  }
  async updateTour(id, tour) {
    const [updatedTour] = await db.update(tours).set(tour).where(eq(tours.id, id)).returning();
    return updatedTour || void 0;
  }
  async deleteTour(id) {
    const result = await db.delete(tours).where(eq(tours.id, id));
    return result.rowCount > 0;
  }
  async getAllProducts() {
    return await db.select().from(products);
  }
  async getProductById(id) {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || void 0;
  }
  async getProductsByCategory(category) {
    return await db.select().from(products).where(eq(products.category, category));
  }
  async getFeaturedProducts() {
    return await db.select().from(products).where(eq(products.featured, true));
  }
  async createProduct(product) {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }
  async updateProduct(id, product) {
    const [updatedProduct] = await db.update(products).set(product).where(eq(products.id, id)).returning();
    return updatedProduct || void 0;
  }
  async deleteProduct(id) {
    const result = await db.delete(products).where(eq(products.id, id));
    return result.rowCount > 0;
  }
  async getAllBlogPosts() {
    return await db.select().from(blogPosts);
  }
  async getPublishedBlogPosts() {
    return await db.select().from(blogPosts).where(eq(blogPosts.published, true));
  }
  async getBlogPostById(id) {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || void 0;
  }
  async getBlogPostBySlug(slug) {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || void 0;
  }
  async getBlogPostsByCategory(category) {
    return await db.select().from(blogPosts).where(eq(blogPosts.category, category));
  }
  async createBlogPost(post) {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }
  async updateBlogPost(id, post) {
    const [updatedPost] = await db.update(blogPosts).set(post).where(eq(blogPosts.id, id)).returning();
    return updatedPost || void 0;
  }
  async deleteBlogPost(id) {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return result.rowCount > 0;
  }
  async getAllContacts() {
    return await db.select().from(contacts);
  }
  async getContactById(id) {
    const [contact] = await db.select().from(contacts).where(eq(contacts.id, id));
    return contact || void 0;
  }
  async createContact(contact) {
    const [newContact] = await db.insert(contacts).values(contact).returning();
    return newContact;
  }
  async updateContactStatus(id, status) {
    const [updatedContact] = await db.update(contacts).set({ status }).where(eq(contacts.id, id)).returning();
    return updatedContact || void 0;
  }
  async getAllBookings() {
    return await db.select().from(bookings);
  }
  async getBookingById(id) {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || void 0;
  }
  async createBooking(booking) {
    const [newBooking] = await db.insert(bookings).values(booking).returning();
    return newBooking;
  }
  async updateBookingStatus(id, status) {
    const [updatedBooking] = await db.update(bookings).set({ status }).where(eq(bookings.id, id)).returning();
    return updatedBooking || void 0;
  }
  async getCartItems(sessionId) {
    return await db.select().from(cartItems).where(eq(cartItems.sessionId, sessionId));
  }
  async addToCart(item) {
    const [newItem] = await db.insert(cartItems).values(item).returning();
    return newItem;
  }
  async updateCartItem(id, quantity) {
    const [updatedItem] = await db.update(cartItems).set({ quantity }).where(eq(cartItems.id, id)).returning();
    return updatedItem || void 0;
  }
  async removeFromCart(id) {
    const result = await db.delete(cartItems).where(eq(cartItems.id, id));
    return result.rowCount > 0;
  }
  async clearCart(sessionId) {
    const result = await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId));
    return result.rowCount > 0;
  }
};
var storage = new DatabaseStorage();

// server/auth.ts
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session2 from "express-session";
import bcrypt from "bcrypt";
async function hashPassword(password) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}
async function comparePasswords(supplied, stored) {
  return await bcrypt.compare(supplied, stored);
}
function setupAuth(app2) {
  const sessionSettings = {
    secret: process.env.SESSION_SECRET || "fallback-secret-key-for-development",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      httpOnly: true,
      secure: false,
      // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1e3
      // 24 hours
    }
  };
  app2.set("trust proxy", 1);
  app2.use(session2(sessionSettings));
  app2.use(passport.initialize());
  app2.use(passport.session());
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !user.passwordHash || !user.isActive) {
          return done(null, false);
        }
        const isValid = await comparePasswords(password, user.passwordHash);
        if (!isValid) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  app2.post("/api/register", async (req, res, next) => {
    try {
      const { username, email, password, firstName, lastName } = req.body;
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const hashedPassword = await hashPassword(password);
      const user = await storage.createUser({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: "user"
      });
      req.login(user, (err) => {
        if (err) return next(err);
        const { passwordHash, ...userResponse } = user;
        res.status(201).json(userResponse);
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Registration failed" });
    }
  });
  app2.post("/api/login", passport.authenticate("local"), (req, res) => {
    if (req.user) {
      const { passwordHash, ...userResponse } = req.user;
      res.status(200).json(userResponse);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
  app2.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });
  app2.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }
    if (req.user) {
      const { passwordHash, ...userResponse } = req.user;
      res.json(userResponse);
    } else {
      res.sendStatus(401);
    }
  });
  app2.get("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      const users2 = await storage.getAllUsers();
      const usersResponse = users2.map(({ passwordHash, ...user }) => user);
      res.json(usersResponse);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });
  app2.patch("/api/admin/users/:id/role", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const updatedUser = await storage.updateUserRole(id, role);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const { passwordHash, ...userResponse } = updatedUser;
      res.json(userResponse);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user role" });
    }
  });
  app2.patch("/api/admin/users/:id/status", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { isActive } = req.body;
      const updatedUser = await storage.updateUserStatus(id, isActive);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const { passwordHash, ...userResponse } = updatedUser;
      res.json(userResponse);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user status" });
    }
  });
}
function requireAdmin(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Authentication required" });
  }
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
}

// server/routes.ts
async function registerRoutes(app2) {
  setupAuth(app2);
  app2.get("/api/regions", async (req, res) => {
    try {
      const regions2 = await storage.getAllRegions();
      res.json(regions2);
    } catch (error) {
      console.error("Error fetching regions:", error);
      res.status(500).json({
        error: "Failed to fetch regions",
        details: error.message || error.toString()
        // ტექსტი json-ში
      });
    }
  });
  app2.get("/api/regions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const region = await storage.getRegionById(id);
      if (!region) {
        return res.status(404).json({ error: "Region not found" });
      }
      res.json(region);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch region" });
    }
  });
  app2.get("/api/regions/slug/:slug", async (req, res) => {
    try {
      const region = await storage.getRegionBySlug(req.params.slug);
      if (!region) {
        return res.status(404).json({ error: "Region not found" });
      }
      res.json(region);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch region" });
    }
  });
  app2.put("/api/admin/regions/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const updatedRegion = await storage.updateRegion(id, updateData);
      if (!updatedRegion) {
        return res.status(404).json({ error: "Region not found" });
      }
      res.json(updatedRegion);
    } catch (error) {
      console.error("Error updating region:", error);
      res.status(500).json({ error: "Failed to update region" });
    }
  });
  app2.get("/api/tours", async (req, res) => {
    try {
      const { category, region, featured } = req.query;
      let tours2 = await storage.getAllTours();
      if (category) {
        tours2 = tours2.filter((tour) => tour.category === category);
      }
      if (region) {
        tours2 = tours2.filter((tour) => tour.regionId === parseInt(region));
      }
      if (featured === "true") {
        tours2 = tours2.filter((tour) => tour.featured);
      }
      res.json(tours2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tours" });
    }
  });
  app2.get("/api/tours/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const tour = await storage.getTourById(id);
      if (!tour) {
        return res.status(404).json({ error: "Tour not found" });
      }
      res.json(tour);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tour" });
    }
  });
  app2.get("/api/products", async (req, res) => {
    try {
      const { category, featured } = req.query;
      let products2 = await storage.getAllProducts();
      if (category) {
        products2 = products2.filter((product) => product.category === category);
      }
      if (featured === "true") {
        products2 = products2.filter((product) => product.featured);
      }
      res.json(products2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });
  app2.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProductById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });
  app2.get("/api/blog", async (req, res) => {
    try {
      const { category } = req.query;
      let posts = await storage.getPublishedBlogPosts();
      if (category) {
        posts = posts.filter((post) => post.category === category);
      }
      posts.sort((a, b) => {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateB - dateA;
      });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });
  app2.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post || !post.published) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json({ message: "Contact form submitted successfully", id: contact.id });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to submit contact form" });
      }
    }
  });
  app2.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.status(201).json({ message: "Booking created successfully", id: booking.id });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to create booking" });
      }
    }
  });
  app2.get("/api/cart", async (req, res) => {
    try {
      const sessionId = req.headers["x-session-id"] || "anonymous";
      const cartItems2 = await storage.getCartItems(sessionId);
      const cartWithProducts = await Promise.all(cartItems2.map(async (item) => {
        const product = await storage.getProductById(item.productId);
        return {
          ...item,
          product
        };
      }));
      res.json(cartWithProducts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart items" });
    }
  });
  app2.post("/api/cart", async (req, res) => {
    try {
      const sessionId = req.headers["x-session-id"] || "anonymous";
      const validatedData = insertCartItemSchema.parse({
        ...req.body,
        sessionId
      });
      const cartItem = await storage.addToCart(validatedData);
      res.status(201).json(cartItem);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to add item to cart" });
      }
    }
  });
  app2.put("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { quantity } = req.body;
      if (!quantity || quantity < 1) {
        return res.status(400).json({ error: "Invalid quantity" });
      }
      const cartItem = await storage.updateCartItem(id, quantity);
      if (!cartItem) {
        return res.status(404).json({ error: "Cart item not found" });
      }
      res.json(cartItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to update cart item" });
    }
  });
  app2.delete("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.removeFromCart(id);
      if (!success) {
        return res.status(404).json({ error: "Cart item not found" });
      }
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove cart item" });
    }
  });
  app2.delete("/api/cart", async (req, res) => {
    try {
      const sessionId = req.headers["x-session-id"] || "anonymous";
      await storage.clearCart(sessionId);
      res.json({ message: "Cart cleared" });
    } catch (error) {
      res.status(500).json({ error: "Failed to clear cart" });
    }
  });
  app2.put("/api/admin/users/:id", requireAdmin, async (req, res) => {
    try {
      const id = req.params.id;
      const updateData = req.body;
      const updatedUser = await storage.updateUser(id, updateData);
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  });
  app2.put("/api/admin/tours/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const updatedTour = await storage.updateTour(id, updateData);
      if (!updatedTour) {
        return res.status(404).json({ error: "Tour not found" });
      }
      res.json(updatedTour);
    } catch (error) {
      console.error("Error updating tour:", error);
      res.status(500).json({ error: "Failed to update tour" });
    }
  });
  app2.put("/api/admin/products/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const updatedProduct = await storage.updateProduct(id, updateData);
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Failed to update product" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
console.log(">> DATABASE_URL =", process.env.DATABASE_URL);
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
