import type { MetadataRoute } from "next"

const base = "https://glydeapi.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: new Date(), priority: 1.0 },
    { url: `${base}/docs`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/docs/api`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/docs/interceptors`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/docs/errors`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/docs/nextjs`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/comparison`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/blog`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/blog/introducing-glyde`, lastModified: new Date(), priority: 0.6 },
    { url: `${base}/blog/why-zero-deps`, lastModified: new Date(), priority: 0.6 },
    { url: `${base}/blog/nextjs-auth-patterns`, lastModified: new Date(), priority: 0.6 },
  ]
}
