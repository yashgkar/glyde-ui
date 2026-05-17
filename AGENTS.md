<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# glyde Documentation Site — AI Agent Context

## What this project is

This is the **documentation and marketing website** for [glyde](https://www.npmjs.com/package/glyde), a lightweight TypeScript HTTP client with zero dependencies.

The site is built with **Next.js 16 App Router + shadcn/ui + Tailwind CSS** and uses a **liquid glass design system** with pastel colors and dark/light theme support.

**There are no user accounts, logins, or authentication on this site.** It is purely a static content site for documentation.

---

## Architecture

```
glyde-docs/
├── app/
│   ├── page.tsx              — Landing/hero page
│   ├── layout.tsx            — Root layout (navbar, footer, theme)
│   ├── globals.css           — Theme variables, glass utilities
│   ├── docs/
│   │   ├── layout.tsx        — Docs sidebar layout
│   │   ├── page.tsx          — Getting Started
│   │   ├── api/page.tsx      — API Reference
│   │   ├── interceptors/page.tsx — Interceptors guide
│   │   ├── errors/page.tsx   — Error handling guide
│   │   └── nextjs/page.tsx   — Next.js usage patterns
│   ├── comparison/page.tsx   — vs axios, ky, wretch, got
│   └── blog/
│       ├── page.tsx          — Blog index
│       └── [slug]/page.tsx   — Individual blog posts
├── components/
│   ├── navbar.tsx            — Glass navigation bar
│   ├── footer.tsx            — Site footer with links
│   ├── theme-provider.tsx    — next-themes wrapper
│   ├── theme-toggle.tsx      — Dark/light toggle button
│   ├── docs-sidebar.tsx      — Documentation sidebar nav
│   ├── code-block.tsx        — Shiki syntax highlighting (server component)
│   └── stats-section.tsx     — Library stats display
└── lib/
    └── utils.ts              — cn() utility (clsx + tailwind-merge)
```

---

## Design System

### Theme: Liquid Glass

The design uses frosted glass effects (backdrop-filter blur) with pastel color accents:

- **`.glass`** — Standard glass card (blur 16px, semi-transparent bg, subtle border)
- **`.glass-strong`** — Stronger blur (24px) with inset highlight, used for navbar
- **`.gradient-text`** — Multi-color gradient text (purple → pink → amber)
- **`.gradient-text-subtle`** — Purple gradient text for headings/stats

### Colors

Light mode uses warm pastels on white. Dark mode uses deep purples/blues on near-black.

| Token | Light | Dark |
|-------|-------|------|
| `--primary` | #7c6fea (purple) | #a78bfa (lighter purple) |
| `--background` | #faf8f6 (warm white) | #0f0f1a (deep navy) |
| `--pastel-purple` | #e8e0ff | #2e1065 |
| `--pastel-blue` | #dbeafe | #1e3a5f |
| `--pastel-pink` | #fce7f3 | #4a1942 |
| `--pastel-green` | #d1fae5 | #064e3b |

### Fonts

- **Sans**: Inter (body text)
- **Mono**: JetBrains Mono (code blocks, terminal snippets)

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `next` 16 | Framework (App Router, RSC) |
| `next-themes` | Dark/light theme toggle |
| `shiki` | Server-side syntax highlighting |
| `lucide-react` | Icons |
| `tailwind-merge` + `clsx` | Conditional class merging |
| `@next/mdx` | MDX support for blog posts |

---

## The glyde library

glyde is published at `npm install glyde`. Key facts:

- **Factory function**: `plane()` creates HTTP client instances
- **Size**: 1.73 KB min+gzip, zero dependencies
- **Methods**: get, post, put, patch, delete, head, request, upload, stream
- **Features**: async interceptors, typed error hierarchy (GlydeError → HttpError/TimeoutError/NetworkError), type guards
- **Works**: browser, Node.js 18+, Bun, Deno, Cloudflare Workers

### Naming conventions for Next.js usage

| Term | Meaning |
|------|---------|
| **tower** | Server-side glyde instance (Route Handlers) |
| **passenger** | Client-side glyde instance (browser) |
| **plane()** | Factory function that creates instances |

---

## How to customize this site for your library

If you're forking this project to document your own library:

1. **Replace content**: Update all references to "glyde" with your package name
2. **Update comparison**: Modify `/app/comparison/page.tsx` with your library's stats
3. **Change theme colors**: Edit CSS variables in `app/globals.css`
4. **Update nav links**: Edit `components/navbar.tsx` and `components/footer.tsx`
5. **Add/remove doc pages**: Create new directories under `app/docs/`
6. **Blog posts**: Add new directories under `app/blog/`
7. **Package info**: Update `package.json` name, description

### Running locally

```bash
npm install
npm run dev    # → http://localhost:3000
```

### Deploying

Deploy to Vercel (recommended), Netlify, or any platform that supports Next.js:

```bash
npm run build  # Static export + server components
```

---

## Conventions

- **Server Components** by default — only mark `"use client"` when state/effects are needed
- **Shiki code blocks** are server-rendered (no client JS for syntax highlighting)
- **No CMS** — content is in TSX files, blog posts are React components
- **Responsive** — mobile-first, glass effects degrade gracefully
- **Accessible** — proper heading hierarchy, alt text, aria labels
