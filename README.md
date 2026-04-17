<div align="center">
  <img src="public/assets/logo-white.svg" alt="CKY Logo" width="200"/>

# CKY Portal

English | [简体中文](README.zh-CN.md)

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

</div>

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Content Management](#content-management)
- [Development](#development)
- [Deployment](#deployment)

---

## Tech Stack

| Technology     | Version | Purpose                                       |
| -------------- | ------- | --------------------------------------------- |
| **Next.js**    | 16.2    | React framework, Static Site Generation (SSG) |
| **React**      | 19.2    | UI library                                    |
| **TypeScript** | 5.x     | Type system                                   |
| **SCSS**       | 1.99    | Style preprocessor                            |
| **Bootstrap**  | 5.3     | UI framework                                  |
| **AOS**        | 2.3     | Scroll animation library                      |
| **Swiper**     | 12.1    | Carousel component                            |
| **GLightbox**  | 3.3     | Image lightbox                                |
| **Zod**        | 4.3     | Schema validation                             |
| **Aliyun OSS** | -       | Static hosting                                |

**Features:**

- Static export
- i18n routing
- JSON-driven content
- Responsive design
- SEO optimization

---

## Quick Start

### Prerequisites

- Node.js >= 18.x
- pnpm >= 8.x

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev          # http://localhost:3000
```

### Build

```bash
pnpm run build          # Output to out/
pnpm run preview        # Preview build result
pnpm run preview:build  # Output & preview in one step, equivalent to `pnpm run build && pnpm run preview`
pnpm run deploy         # Build and deploy to Aliyun OSS (see Deployment section)
```

---

## Project Structure

```text
ckychina-portal/
├── app/
│   ├── [lang]/                   # i18n routing
│   │   ├── layout.tsx            # Language layout (includes Footer)
│   │   ├── page.tsx              # Homepage
│   │   ├── products/             # Product pages
│   │   │   ├── page.tsx          # Product list
│   │   │   └── [category]/[id]/  # Product details
│   │   ├── privacy/              # Privacy policy
│   │   ├── terms/                # Terms of service
│   │   └── 404/                  # 404 page
│   ├── styles/                   # Global styles
│   │   ├── main.scss             # Entry point
│   │   ├── _variables.scss       # CSS variables
│   │   ├── layouts/              # Layout styles
│   │   ├── sections/             # Section styles
│   │   └── components/           # Component styles
│   ├── page.tsx                  # Root redirect
│   ├── sitemap.ts                # Dynamic sitemap.xml generation
│   └── robots.ts                 # Dynamic robots.txt generation
│
├── components/
│   ├── layout/
│   │   ├── header/               # Navigation, language switcher
│   │   └── footer/               # Footer
│   ├── sections/                 # Page sections
│   │   ├── homepage/
│   │   ├── products/
│   │   ├── privacy/
│   │   ├── terms/
│   │   └── error/
│   ├── ui/                       # Common components
│   └── providers/                # Client-side providers
│
├── lib/
│   ├── i18n.ts                   # i18n utilities
│   ├── constants.ts              # Constants
│   ├── config.ts                 # Configuration
│   ├── utils.ts                  # Utility functions
│   └── models/                   # Data models
│       ├── header.ts
│       ├── footer.ts
│       ├── metadata.ts
│       └── pages/                # Page data builders
│
├── data/                         # JSON content data
│   ├── languages.json            # Language configuration
│   ├── metadata.json             # Global SEO
│   ├── en/                       # English content
│   └── zh/                       # Chinese content
│       └── ...
│
├── public/
│   └── assets/
│       ├── img/                  # Image assets
│       ├── fonts/                # Font files
│       ├── logo.svg              # Logo (dark)
│       └── logo-white.svg        # Logo (light)
│
├── .ossutilconfig                # OSS config (not committed)
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Content Management

### Data Architecture

Content is managed using **JSON + TypeScript Schema**:

1. **Data Source**: JSON files in `data/[lang]/` directory
2. **Data Models**: TypeScript schemas and builders in `lib/models/`
3. **Rendering**: Load and validate JSON via `buildXxxData()` functions, then pass to components

**Example Flow:**

```text
data/en/pages/home.json  →  lib/models/pages/home.ts  →  app/[lang]/page.tsx
      ↓ JSON data              ↓ buildHomePageData()        ↓ Render component
   { hero: {...} }            Validate & transform         <Hero data={...} />
```

### Modifying Content

**Text Content:**
Edit JSON files in `data/[lang]/**/*.json`

**Image Assets:**

1. Place files in `public/assets/img/` directory
2. Reference path in JSON (e.g., `/assets/img/hero/01.webp`)

**Styles:**
Modify SCSS files in `app/styles/`

### Extensibility

The current architecture is designed for future migration to CMS or document databases:

- JSON schemas can be directly mapped to MongoDB/PostgreSQL
- Builders in `lib/models/` can be modified to fetch from APIs
- Type definitions remain unchanged, only data source changes

---

## Development

### Adding a New Page

1. Create route file: `app/[lang]/new-page/page.tsx`
2. Create data files: `data/en/pages/new-page.json`, `data/zh/pages/new-page.json`
3. Create data model: `lib/models/pages/new-page.ts`
4. Add styles: `app/styles/sections/_new-page.scss`
5. Update navigation: Modify `data/*/header.json`

### Adding a New Component

```tsx
// components/sections/example/feature.tsx
'use client';

import { FeatureData } from '@/lib/models/pages/example';

type Props = {
  data: FeatureData;
};

export default function Feature({ data }: Props) {
  return <section className='feature section'>{/* ... */}</section>;
}
```

### Modifying Configuration

**Theme Colors:**
`app/styles/_variables.scss`

**Site Configuration:**
`lib/config.ts`

**Environment Variables:**
Create `.env.local`

---

## Deployment

### Aliyun OSS

#### 1. Configure OSS Credentials

```bash
pnpm oss:config
```

Input parameters:

- **Endpoint**: `oss-cn-hongkong.aliyuncs.com`
- **AccessKeyId**: `<your-access-key-id>`
- **AccessKeySecret**: `<your-access-key-secret>`

Configuration is saved in `.ossutilconfig`. Do not commit to version control.

#### 2. Deploy

```bash
pnpm deploy
```

Equivalent to: `pnpm build && pnpm oss:sync`

#### 3. Other Commands

```bash
pnpm oss:ls      # List OSS files
pnpm oss:cp      # Upload files (keep old files)
pnpm oss:sync    # Sync files (delete remote extras)
pnpm oss:rm      # Clear OSS bucket
```

#### 4. OSS Configuration Requirements

- Bucket: **Public Read**
- Enable static website hosting
- Default homepage: `index.html`
- Default 404 page: `404.html`
- Optional CDN acceleration

---

## Development Standards

### Git Hooks

Project uses Husky + lint-staged for automated checks:

```bash
git commit
```

### Commit Convention

```text
feat: New feature
fix: Bug fix
docs: Documentation
style: Formatting
refactor: Refactoring
perf: Performance
chore: Build/Tools
```

---

<div align="center">
  © 2026 CKY. All Rights Reserved.
</div>
