# Portfolio Project

## Tooling
- Package manager: **bun** (not npm)
- Build: Vite + TypeScript
- Framework: React 19

## Project Structure
- `src/components/ui/` - Shared UI components (Button, GlassCard, Badge, Avatar)
- `src/components/shared/` - Shared app components (ThemeToggle, LanguageToggle, CookieBanner)
- `src/components/home/` - Homepage components (SocialGrid, FeaturedLinks, ProfileSection)
- `src/components/projects/` - Project page components (ProjectCard)
- `src/pages/` - Page components (HomePage, ProjectsPage, ContactPage, NotFoundPage)
- `src/hooks/` - Custom hooks (useTheme, useFx, useDocumentTitle)
- `src/styles/main.css` - Global styles with Tailwind v4

## Notable Patterns
- Uses framer-motion for animations throughout
- Dark mode via `data-theme` attribute on `html` element
- i18n with react-intl (EN/FR)
- CSS uses safe area utilities (.safe-top, .safe-bottom) for notched phones
- Haptic feedback via `web-haptics` package added at the shared component level