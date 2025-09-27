# Georgian Heritage Website - Architecture Overview

## Overview

The Georgian Heritage Website is a full-stack web application built to showcase Georgia's ethnographic regions through an immersive digital experience. The platform combines cultural exploration, e-commerce functionality, and content management to promote Georgian heritage through tours, products, and educational content.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite for build tooling
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom Georgian-themed color palette
- **Internationalization**: Custom i18n implementation supporting English, Georgian (ka), and Russian (ru)

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API with structured error handling
- **Session Management**: Express sessions with PostgreSQL store

### Build and Development
- **Development**: Vite dev server with HMR and Replit integration
- **Production Build**: ESBuild for server bundling, Vite for client bundling
- **TypeScript**: Strict mode enabled across the entire codebase

## Key Components

### Database Schema
The application uses a comprehensive database schema with the following main entities:
- **Users**: Authentication and role management (user/admin)
- **Regions**: Ethnographic regions with multilingual content
- **Tours**: Tour packages with pricing, duration, and regional associations
- **Products**: E-commerce items (food, wine, souvenirs) with categories
- **Blog Posts**: Content management with publishing workflow
- **Bookings**: Tour reservation system
- **Shopping Cart**: Session-based cart management
- **Contact Forms**: Customer inquiry handling

### Frontend Components
- **Layout Components**: Header with navigation and language switching, Footer
- **Content Cards**: RegionCard, TourCard, ProductCard, BlogCard for consistent presentation
- **Forms**: ContactForm with validation, booking forms
- **UI Components**: Complete Shadcn/ui component library

### API Endpoints
- `/api/regions` - Region data and details
- `/api/tours` - Tour listings with filtering capabilities
- `/api/products` - Product catalog with categories
- `/api/blog` - Blog post management
- `/api/contact` - Contact form handling
- `/api/bookings` - Tour booking system
- `/api/cart` - Shopping cart operations

## Data Flow

1. **Client Requests**: React components use TanStack Query for data fetching
2. **API Layer**: Express.js routes handle business logic and validation
3. **Data Layer**: Drizzle ORM provides type-safe database operations
4. **Response Flow**: JSON responses with structured error handling
5. **State Management**: React Query manages caching and synchronization

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React routing
- **react-helmet-async**: SEO and meta tag management

### UI and Styling
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Tools
- **vite**: Fast build tool and dev server
- **typescript**: Type safety
- **drizzle-kit**: Database migrations and management

## Deployment Strategy

### Development Environment
- Replit integration with live reload
- Vite dev server with Express middleware
- Hot module replacement for rapid development

### Production Build Process
1. Client build: Vite bundles React application
2. Server build: ESBuild bundles Express server
3. Database migrations: Drizzle Kit handles schema updates
4. Static assets: Served from dist/public directory

### Environment Configuration
- Database URL configuration via environment variables
- Development/production mode switching
- Replit-specific plugins and optimizations

## Changelog

- September 27, 2025. Completed comprehensive username/password authentication system implementation: created full-stack authentication with user registration, login, logout functionality; implemented admin control panel with user management capabilities; added role-based access control (user/admin roles); integrated bcrypt password hashing and PostgreSQL session storage; updated header navigation with authentication state management; fixed critical DatabaseStorage class missing methods; all functionality tested end-to-end and working perfectly
- June 29, 2025. Added login and registration pages with full authentication integration, updated header navigation to include login/register buttons for unauthenticated users and user dropdown for authenticated users, includes mobile menu support
- June 29, 2025. Fixed all broken image URLs (Samegrelo, Javakheti regions, Samegrelo Cultural Experience tour, Imereti Cave Exploration tour, Georgian Chacha product), removed scroll caption texts from all sliders, added 5 new Georgian cultural blog stories covering Queen Tamar, polyphonic singing, cloisonné metalwork, sacred mountains, and Georgian script
- June 29, 2025. Fixed broken image URLs for Svaneti and Samegrelo regions, added 4 additional tours and 5 additional products to enhance slider content, implemented visible scrollbars with custom styling for all horizontal sliders (regions, tours, products), added scroll indicators to improve user experience
- June 29, 2025. Added PostgreSQL database with Drizzle ORM, migrated from in-memory storage to persistent database storage, seeded with Georgian heritage data
- June 28, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.