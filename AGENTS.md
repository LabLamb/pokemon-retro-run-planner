# Pokémon Retro Run Planner - AI Agent Instructions

## Project Architecture

This is a **SPA (Single Page Application)** built with **React Router v7** in SPA mode (`ssr: false`) with selective SSG prerendering for i18n paths. Not a server-side rendered app.

### Strict 5-Layer Architecture (do not violate)
1) **Layer 1 – UI components (atomic/compound/composite/layout):**
	- Accept only primitive props (strings, numbers, booleans, arrays of primitives, callbacks).
	- No imports from higher layers (no business logic, hooks, services, or app context/state).
	- Logic allowed: UI-only (conditional rendering, style switching, calling passed callbacks), controlled/uncontrolled handling.
2) **Layer 2 – Screens (routes):**
	- Compose UI components with app state, app context, user interaction, and data hooks.
	- Should clearly express the page intent; contains no business-specific logic.
	- Acts as the glue layer connecting UI components to hooks/logic/state.
3) **Layer 3 – Business logic & hooks:**
	- Encapsulate workflows and app-use-cases; may be sync or async.
	- Import services to fetch/transform data, perform sequencing/mapping, expose simple interfaces to screens (e.g., `logout()` orchestrates clearing storage + notifying backend).
	- Hooks are used to integrate business logic with React lifecycle for screens.
4) **Layer 4 – App state & context:**
	- Session-scoped shared data (e.g., current team of 6 Pokémon) available across screens.
	- Provides setters/getters to screens/hooks; no direct service calls from here.
5) **Layer 5 – Services (IO/adapters):**
	- External boundaries: HTTP/PokeAPI, storage, adapters to map raw responses into domain shapes understood by business logic.

**Dependency rule:** Higher layers may depend on lower layers only (1←2←3←4←5 direction never allowed). UI must stay free of app logic; services never import upward.

### Key Technologies
- **React Router v7** - File-based routing with type-safe route modules
- **Vite** - Build tool with HMR
- **TypeScript** - Strict mode enabled
- **TailwindCSS v4** - Utility-first styling with `@tailwindcss/vite`
- **Radix UI** - Unstyled accessible component primitives
- **i18next** - Internationalization with 10 supported locales

## Critical Patterns

### Routing System
Routes are defined in [app/routes.ts](app/routes.ts) using React Router's config format:
- Root redirects to `home.tsx` (locale auto-detection)
- `/:locale` routes prerendered at build time for SEO (SSG)
- `/planner` is SPA-only (not prerendered)

Route modules use typed imports: `import type { Route } from "./+types/root"` for loader args, meta, etc.

### Internationalization Strategy
**10 locales supported**: en, es, fr, de, it, ja, ko, pt, zh-Hans, zh-Hant

Translation pattern across all components:
```tsx
const { t } = useTranslation();
t("namespace.key", "Fallback text")
```

- Translation files in [app/messages/*.json](app/messages/)
- Locale constants in [app/lib/i18n.ts](app/lib/i18n.ts) - use `supportedLocales` and `Locale` type
- Client-side locale switching via `LocaleProvider` context ([app/lib/locale-provider.tsx](app/lib/locale-provider.tsx))
- Prerendering hydrates locale from URL params in [app/routes/$locale._index.tsx](app/routes/$locale._index.tsx)

**When adding i18n strings**: Add to all 10 JSON files in `app/messages/`, use consistent key namespacing.

### Theme System
Custom Pokémon-themed palettes: `fire-red`, `leaf-green`, `gb`, `gbc`, `gba`

- Theme state managed by `ThemeProvider` context ([app/lib/theme-provider.tsx](app/lib/theme-provider.tsx))
- Uses CSS custom properties applied to `documentElement`
- Persisted to localStorage with key `pokemon-planner-theme`

### UI Components
All components in [app/components/ui/](app/components/ui/) follow **shadcn/ui** patterns:
- Radix UI primitives with Tailwind styling
- Variants via `class-variance-authority`
- Use `cn()` utility from [app/lib/utils.ts](app/lib/utils.ts) for class merging
- **Slot-based composition** - Always use compound component patterns with slots for flexibility

Import pattern: `import { Button } from "~/components/ui/button"`

#### Slot-Based Component Architecture
**ALWAYS use slot-based composition for complex components:**

```tsx
// ✅ CORRECT - Slot-based compound component pattern
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("card-styles", className)} {...props} />
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("header-styles", className)} {...props} />
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("content-styles", className)} {...props} />
}

// Usage allows flexible composition
<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Body</CardContent>
</Card>

// ❌ WRONG - Monolithic component with props
export function Card({ title, content, footer, showBorder }: CardProps) {
  return (
    <div>
      {title && <div>{title}</div>}
      <div>{content}</div>
      {footer && <div>{footer}</div>}
    </div>
  )
}
```

**Key slot-based patterns:**
- Export subcomponents as separate named exports (e.g., `CardHeader`, `CardContent`, `CardFooter`)
- Use `asChild` prop from Radix UI for polymorphic composition
- Allow consumers to compose layout and content flexibly
- Avoid rigid prop-based content injection
- Preserve HTML semantics and accessibility through proper element composition

## Development Workflows

**This project uses yarn as the package manager** - always use `yarn` commands, not `npm`.

### Commands
```bash
yarn dev        # Start Vite dev server (http://localhost:5173)
yarn build      # Build for production (outputs to build/client/)
yarn start      # Serve production build locally
yarn typecheck  # Generate route types + TypeScript check
```

### Build Output
- **Client bundle**: `build/client/` - static assets for deployment
- **No server bundle** - this is SPA mode, not SSR
- Prerendered HTML for each locale path in `build/client/{locale}/index.html`

### Testing Strategy
**Test all functions, components, pages, and routes EXCEPT SSG pages**
- Functional components should be tested
- Page components should be tested
- Route logic should be tested
- **Skip**: SSG prerendered pages (e.g., `$locale._index.tsx`)

We focus exclusively on unit tests. This includes UI component tests that validate rendering and UI logic, business logic function tests, more complex hook tests, and service/adapter tests.

Only 100% test coverage is acceptable; adjust the scope to ensure every relevant unit is covered by tests.

All unit tests are executed with Vitest, complemented by Testing Library helpers and `@testing-library/jest-dom` matchers for UI assertions.

## Code Conventions

### File Organization
- Routes in `app/routes/` (flat structure)
- Reusable components in `app/components/ui/`
- Context providers in `app/lib/`
- Translation files in `app/messages/`

### Import Aliases
- `~/` resolves to `app/` (configured in [tsconfig.json](tsconfig.json))
- Use absolute imports: `import { foo } from "~/lib/utils"`

### Type Safety
- Route type imports: `import type { Route } from "./+types/routeName"`
- Locale type: `Locale` from `app/lib/i18n.ts` (union of 10 supported locales)
- Strict TypeScript with `noEmit: true` (Vite handles compilation)

### Styling Patterns
- Use Tailwind utility classes directly in JSX
- Retro gaming aesthetic with pixel-art borders (`border-[3px]`, `shadow-[0_4px_0_0]`)
- Responsive breakpoints: `sm:`, `md:`, `lg:` prefixes
- Theme colors via CSS custom properties (automatically set by theme provider)

## Integration Points

### Context Providers
All providers wrap app in [app/root.tsx](app/root.tsx):
1. `ThemeProvider` (outermost)
2. `I18nextProvider` 
3. `LocaleProvider` (innermost)

Access via hooks: `useTheme()`, `useTranslation()`, `useLocale()`

### Data Sources
- **PokeAPI** - External API for Pokémon data (species, stats, moves, etc.)
- **Static JSON** - Special game logic and custom data stored locally

### State Management
No global state library - using React Context for:
- Theme preference (persisted to localStorage)
- Locale preference (persisted to localStorage)
- i18next instance (ephemeral)

### External Dependencies
- **Radix UI primitives** - Heavily used for accessible dropdowns, dialogs, tabs, etc.
- **Lucide React** - Icon library (e.g., `<Flame />`, `<Languages />`)
- **i18next** - Initialized client-side, language changed on route/context updates

## Common Tasks

### Adding a New Route
1. Create file in `app/routes/`
2. Add to [app/routes.ts](app/routes.ts) config
3. Run `yarn typecheck` to generate types
4. Use `Route.ComponentProps`, `Route.LoaderArgs` types

### Adding a New Translation
1. Add key to all 10 files in [app/messages/](app/messages/)
2. Use `t("your.key", "English fallback")` in components

### Adding a New UI Component
Follow shadcn/ui slot-based patterns in [app/components/ui/](app/components/ui/):
- **Always use compound component pattern with slots** - export root component and all subcomponents separately
- Radix primitive + Tailwind styling
- Export component and sub-components as named exports
- Use `cn()` for conditional classes
- Define variants with `cva()` if needed
- Leverage `asChild` prop for polymorphic behavior
- Prefer composition over configuration (slots over props)

**Example structure:**
```tsx
// ✅ Proper slot-based component
export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogContent = React.forwardRef<...>((props) => ...)
export const DialogHeader = ({ className, ...props }) => (...)
export const DialogTitle = React.forwardRef<...>((props) => ...)
export const DialogDescription = React.forwardRef<...>((props) => ...)
```

### Testing Routes Locally
- Dev server auto-updates on file changes
- Test locale routes: `http://localhost:5173/en`, `/es`, etc.
- Test SPA route: `http://localhost:5173/planner`
