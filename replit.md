# Replit.md

## Overview

This is a creative portfolio website with a retro CRT terminal aesthetic. The application features a React frontend with Framer Motion animations, styled to look like an old computer interface with scanlines, glitch effects, and pixelated typography. The backend is a minimal Express.js server that serves the frontend and provides a simple visitor logging API backed by PostgreSQL.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, bundled using Vite
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming, custom CRT/retro terminal design
- **Animations**: Framer Motion for entrance animations, glitch effects, and interactive elements
- **Typography**: Custom pixel fonts (PixelOperatorMono) loaded from `/public/fonts/`

### Backend Architecture
- **Server**: Express.js running on Node.js with TypeScript
- **Build**: Custom esbuild script for production bundling, Vite for development HMR
- **API Pattern**: RESTful endpoints defined in `shared/routes.ts` with Zod validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect

### Shared Code Structure
- `shared/schema.ts`: Database schema definitions using Drizzle's pgTable
- `shared/routes.ts`: API route definitions with input/output Zod schemas for type safety between client and server

### Key Design Patterns
- **Monorepo Structure**: Client code in `client/`, server code in `server/`, shared types in `shared/`
- **Path Aliases**: `@/` maps to client src, `@shared/` maps to shared directory
- **Type-Safe API**: Routes defined with Zod schemas that validate both request and response
- **Component-Based UI**: Reusable UI components from shadcn/ui in `client/src/components/ui/`

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Schema management and type-safe queries
- **drizzle-kit**: Database migrations stored in `/migrations`

### Third-Party Services
- **Google Fonts**: DM Sans, Fira Code, Geist Mono, VT323 font families
- **Replit Plugins**: Development banner, cartographer, and runtime error overlay (dev only)

### Key NPM Packages
- **Frontend**: React, Framer Motion, TanStack Query, Radix UI, Tailwind CSS, Wouter
- **Backend**: Express, pg (PostgreSQL client), connect-pg-simple (session store)
- **Validation**: Zod, drizzle-zod for schema-to-validator generation
- **Build Tools**: Vite, esbuild, tsx (TypeScript execution)