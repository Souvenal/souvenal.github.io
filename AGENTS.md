# Agent Guidelines for souvenal-blog

## Current State - GPU-Powered Blog Interface

This is a **GPU-rendered personal blog** for a graphics engineer with no full-stack experience. The project showcases WebGL/Shader expertise through an immersive 3D interface.

### Implemented Features

#### 1. Shader Background (`app/components/ShaderBackground.tsx`)
- **GLSL Fragment Shader**: FBM (Fractal Brownian Motion) fluid effect with dynamic color mixing
- **Interactive Glow**: Mouse-following glow effect using smoothstep interpolation
- **GPU Particle System**: 100 floating particles with boundary collision physics
- **Color Palette**: Tech blue-purple gradient (#0a0a0f base, blue-400 to purple-400 accents)

#### 2. 3D Blog Cards (`app/components/BlogCards3D.tsx`)
- **Interactive 3D Cards**: Hover scaling, floating animation, click rotation feedback
- **Camera Movement**: Mouse-position-based subtle camera parallax
- **Lighting Setup**: Ambient + directional + colored point lights (blue & cyan)
- **Card Data Structure**: Title, category, date fields with responsive positioning

#### 3. Page Layout (`app/page.tsx`)
- **Hero Section**: Gradient text, CTA buttons, status indicator
- **3D Cards Section**: Full-width WebGL canvas for blog posts
- **Tech Stack Tags**: WebGL, GLSL, Three.js, React Three Fiber badges
- **Responsive Navigation**: Glassmorphism navbar with mobile menu
- **Footer**: Social links (GitHub/Twitter), copyright

### File Structure

```
app/
├── components/
│   ├── ShaderBackground.tsx   # GLSL fluid background + particles
│   ├── BlogCards3D.tsx        # Interactive 3D blog post cards
│   └── Navigation.tsx         # Responsive glassmorphism navbar
├── page.tsx                   # Main landing page
├── layout.tsx                 # Root layout with dark theme
└── globals.css                # Custom scrollbar, selection styles
```

## Phase Goals & Roadmap

### Phase 1: Core Interface ✅ COMPLETE
- [x] Shader animated background with mouse interaction
- [x] 3D interactive blog cards system
- [x] Responsive navigation and layout
- [x] Dark theme with GPU aesthetics

### Phase 2: Content & Blog System (Next Priority)
- [ ] Create `/posts` page with list view
- [ ] Add individual blog post page (`/posts/[slug]`)
- [ ] Implement MDX support for writing technical articles
- [ ] Add post metadata (reading time, tags, publish date)
- [ ] Create post card component with thumbnail support

### Phase 3: Shader Demo Showcase
- [ ] Create `/shaders` page for interactive GLSL demos
- [ ] Add shader playground component (code editor + live preview)
- [ ] Showcase particle systems, ray marching, post-processing effects
- [ ] Allow users to interact with shader parameters

### Phase 4: Advanced Features
- [ ] Loading screen with GPU particle animation
- [ ] Page transitions with WebGL effects
- [ ] Dark/light theme toggle (shader uniforms)
- [ ] Performance monitoring (FPS counter)
- [ ] Mobile touch interaction optimization

### Phase 5: Content Migration
- [ ] Write 3-5 initial technical articles:
  - GPU Particle System Optimization
  - GLSL Shader Techniques
  - WebGL Performance Tuning
  - Ray Tracing Basics
  - Compute Shader Guide
- [ ] Create about page with 3D avatar/profile
- [ ] Add contact/social links

## Content Architecture

### Multi-Repository Setup

This blog uses a **separation of concerns** architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                    Content Flow                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌──────────────┐      ┌──────────────┐                   │
│   │ pure-notes   │      │   blog       │                   │
│   │  (Obsidian)  │─────▶│  (Next.js)   │                   │
│   │              │      │              │                   │
│   │ Render/      │ sync │ app/         │                   │
│   │ Languages/   │─────▶│ components/  │                   │
│   │ Math/        │      │ content/     │                   │
│   │              │      │      posts/  │                   │
│   └──────────────┘      └──────────────┘                   │
│          │                      │                          │
│          │                      ▼                          │
│          │            ┌──────────────┐                     │
│          │            │ GitHub Pages │                     │
│          │            │  (deployed)  │                     │
│          │            └──────────────┘                     │
│          │                                                 │
│          └─ #publish tag triggers sync                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Why This Architecture?

**pure-notes repository:**
- ✅ Clean Obsidian workspace (no node_modules)
- ✅ Fast sync across devices
- ✅ Private notes in excluded directories
- ✅ Version control for knowledge base

**blog repository:**
- ✅ Contains Next.js app and build config
- ✅ Transform scripts for markdown conversion
- ✅ CI/CD workflows for sync & deploy
- ✅ Independent deployment cycle

### How Sync Works

1. **Authoring**: Write notes in Obsidian as usual
2. **Publishing**: Add `#publish` tag to any note
3. **Sync**: GitHub Actions detects changes hourly
4. **Transform**: Script converts Obsidian links → blog format
5. **Deploy**: Blog rebuilds automatically

### File Locations

```
project/
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml          # Deploy to GitHub Pages
│   │   └── sync-notes.yml      # Sync from Obsidian
│   └── OBSIDIAN_SYNC_GUIDE.md  # Usage documentation
├── scripts/
│   └── sync-notes.js           # Sync & transform script
├── content/
│   └── posts/                  # Synced markdown files
└── ...
```

See `.github/OBSIDIAN_SYNC_GUIDE.md` for detailed usage instructions.

## Build & Development Commands

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting (ESLint with Next.js config)
npm run lint

# Lint specific file
npx eslint app/page.tsx

# Type checking
npx tsc --noEmit
```

**Note:** No test framework is currently configured. Consider adding Jest, Vitest, or Playwright for testing.

## Project Structure

- **Framework:** Next.js 16 (App Router)
- **Runtime:** React 19
- **Language:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS v4
- **Path Alias:** `@/*` maps to root directory

## Code Style Guidelines

### TypeScript

- Enable strict mode - all code must be type-safe
- Use explicit return types for exported functions
- Prefer `interface` over `type` for object shapes
- Use `readonly` for immutable props and arrays
- Avoid `any` - use `unknown` with type guards instead

### Imports & Exports

- Use absolute imports with `@/` prefix for project files
- Group imports: React/Next → third-party → local
- Prefer named exports for utilities, default exports for pages/components
- Example:
  ```typescript
  import Image from "next/image";
  import { useState } from "react";
  import { Component } from "@/components/Component";
  ```

### React Components

- Use functional components with explicit props interfaces
- Destructure props in function parameters
- Use `React.ReactNode` for children types
- Prefix event handlers with `handle` (e.g., `handleClick`)
- Prefer Server Components by default; mark Client Components with `"use client"`

### Naming Conventions

- Components: PascalCase (e.g., `UserCard.tsx`)
- Utilities/hooks: camelCase (e.g., `useAuth.ts`)
- Constants: UPPER_SNAKE_CASE for true constants
- Files match their default export name
- Boolean props prefixed with `is`, `has`, `should` (e.g., `isLoading`)

### Styling (Tailwind)

- Use Tailwind utility classes exclusively
- Follow mobile-first responsive design (`sm:`, `md:`, `lg:`)
- Support dark mode with `dark:` prefix
- Group related classes logically
- Use arbitrary values sparingly (e.g., `w-[158px]`)

### Error Handling

- Use try/catch for async operations
- Return early for error cases
- Use Next.js error boundaries for component errors
- Log errors appropriately for debugging

### ESLint Configuration

- Uses `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Run `npm run lint` before committing
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

### General Best Practices

- No unused variables or imports
- Prefer `const` over `let`
- Use template literals for string concatenation
- Keep components focused and small (< 200 lines ideally)
- Comment complex logic; self-document simple code
- Never commit secrets or API keys
