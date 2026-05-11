# Click & Build Labs

**Free online tools for developers and creators.**

A modern, fast, and privacy-focused collection of utilities. No signup required, no tracking, no BS.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/clickbuildlabs/clickbuildlabs)
[![Deploy to Cloudflare](https://img.shields.io/badge/Cloudflare-Cloudflare%20Pages-orange?style=flat-square&logo=cloudflare)](https://pages.cloudflare.com/)

## Features

- **100% Free** - No hidden costs, no premium tiers
- **No Signup** - Use immediately, no account required
- **Privacy-First** - All processing happens in your browser
- **Fast & Light** - Optimized for speed and performance
- **SEO Optimized** - Built with search engines in mind
- **Dark Mode** - Automatic theme support

## Tools

| Tool | Description |
|------|-------------|
| UUID Generator | Generate RFC 4122 compliant UUIDs (v4, v1, v7) |
| Base64 Encoder | Encode and decode Base64 strings |
| Password Generator | Create cryptographically secure passwords |
| JSON Formatter | Format, validate, and beautify JSON |
| URL Slug Generator | Create SEO-friendly URL slugs |
| Hash Generator | Generate MD5, SHA-1, SHA-256 hashes |

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Theme**: [next-themes](https://github.com/pacelliv/next-themes)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

```bash
# Clone the repository
git clone https://github.com/clickbuildlabs/clickbuildlabs.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start
```

## Project Structure

```
clickbuildlabs/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Home page
│   ├── tools/              # Tools listing
│   │   ├── page.tsx        # All tools
│   │   └── [slug]/         # Dynamic tool pages
│   ├── privacy/            # Privacy policy
│   └── terms/              # Terms of service
├── components/
│   ├── ads/                 # Ad slot components (prepared for AdSense)
│   ├── marketing/           # Header, Footer, etc.
│   ├── providers/           # Theme provider
│   ├── tools/               # Tool-specific components
│   └── ui/                  # Reusable UI components
├── lib/
│   ├── registry.ts          # Tool registry
│   ├── seo.ts               # SEO utilities
│   ├── types.ts             # TypeScript types
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

## Adding New Tools

1. Create the tool component in `components/tools/`
2. Add the tool to `lib/registry.ts`
3. Map the component in `app/tools/[slug]/page.tsx`
4. Update sitemap if needed

```typescript
// Example tool registration
{
  slug: 'my-tool',
  name: 'My Tool',
  shortDescription: 'Brief description',
  description: 'Full description for SEO',
  category: 'utility',
  tags: ['tag1', 'tag2'],
  icon: 'code',
  featured: false,
  popular: true,
  relatedTools: ['other-tool'],
  seo: {
    title: 'My Tool | Click & Build Labs',
    description: 'SEO description...',
    keywords: ['keyword1', 'keyword2'],
  },
  ads: { enabled: false, positions: [] },
}
```

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/clickbuildlabs/clickbuildlabs)

### Cloudflare Pages

1. Connect your GitHub repository to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Select the `main` branch
3. Set build command: `npm run build`
4. Set output directory: `.next`

### Other Platforms

The project exports as a static site. Configure your platform to use:
- Build command: `npm run build`
- Output directory: `.next` (or `out/` with static export)

## SEO

The project includes:
- Dynamic metadata per tool
- OpenGraph and Twitter cards
- JSON-LD structured data (WebApplication schema)
- Breadcrumb structured data
- Dynamic sitemap generation
- robots.txt configuration

## Analytics & Monetization

Ad slots are prepared for future integration with Google AdSense or similar platforms. The architecture is designed to be non-intrusive and performance-first.

## Performance

- Lighthouse Performance: 95+
- First Contentful Paint: < 1s
- Total Bundle Size: < 100KB (excluding fonts)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-tool`)
3. Commit your changes (`git commit -m 'Add amazing tool'`)
4. Push to the branch (`git push origin feature/amazing-tool`)
5. Open a Pull Request

## License

MIT License - See [LICENSE](LICENSE) for details.

---

Built with care by [Click & Build Labs](https://clickbuildlabs.com)