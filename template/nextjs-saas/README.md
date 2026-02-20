# Next.js SaaS Template

Template frontend pour applications SaaS avec Next.js 15 + shadcn/ui + Firebase Auth.

## Stack

| | |
|---|---|
| Framework | Next.js 15 (static export) |
| UI | shadcn/ui (new-york, neutral) |
| CSS | Tailwind CSS v3 |
| Auth | Firebase Authentication |
| Forms | react-hook-form + zod |
| Toasts | sonner |
| Icons | lucide-react |
| Tests | Vitest + Playwright |
| Deploy | Firebase Hosting |

## Démarrage

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Structure

```
app/
├── globals.css          ← Design tokens (couleurs HSL, shadows, dark mode)
├── (auth)/login/        ← Page de connexion
└── (app)/               ← Zone protégée (auth requise)
    └── dashboard/

components/
├── layout/AppShell.tsx  ← Shell principal (sidebar collapsible + header)
└── ui/
    ├── button.tsx       ← Bouton WCAG (44px min, 6 variants)
    ├── badge.tsx        ← Badge avec variants success/warning/info
    └── page-states.tsx  ← EmptyState / LoadingState / ErrorState

lib/
├── api.ts               ← Fetch authentifié (Bearer token Firebase auto)
├── errors.ts            ← ApiError, ForbiddenError, RateLimitError, OfflineError
├── firebase.ts          ← Init lazy Firebase (SSR-safe)
├── themeStore.ts        ← Dark mode (localStorage + system preference)
├── navigation.ts        ← Config navigation typée
└── utils.ts             ← cn() (clsx + tailwind-merge)
```

## Ajouter des composants shadcn/ui

```bash
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add table
# etc.
```

## Points d'attention

- `output: 'export'` → pas de SSR, pas d'API Routes Next.js
- Routes dynamiques → `generateStaticParams()` + `usePathname()` (pas `useParams()`)
- Firebase → init lazy via Proxy pour éviter les crashs SSR au build
- Dark mode → classe `.dark` sur `<html>`, toggle via `useTheme()`

Voir `~/.claude/rules/FRONTEND_BUILD.md` pour les détails.
