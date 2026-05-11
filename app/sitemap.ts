import { MetadataRoute } from 'next';
import { tools } from '@/lib/registry';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://clickbuildlabs.com';
  const now = new Date();

  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/tools`, lastModified: now, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.4 },
  ];

  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: tool.popular ? 0.8 : 0.6,
  }));

  return [...staticPages, ...toolPages];
}