import { Metadata } from 'next';
import type { Tool } from './registry';

const SITE_URL = 'https://clickbuildlabs.com';
const SITE_NAME = 'Click & Build Labs';
const SITE_DESCRIPTION =
  'Free online tools, converters, and utilities. Fast, clean, and no signup required.';

export const siteMetadata = {
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
};

export function createToolMetadata(
  tool: Pick<Tool, 'slug' | 'name' | 'shortDescription' | 'tags'>
): Metadata {
  const url = `${SITE_URL}/tools/${tool.slug}`;

  return {
    title: `${tool.name} | ${SITE_NAME}`,
    description: tool.shortDescription,
    keywords: tool.tags,
    openGraph: {
      title: `${tool.name} | ${SITE_NAME}`,
      description: tool.shortDescription,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} | ${SITE_NAME}`,
      description: tool.shortDescription,
    },
    alternates: {
      canonical: url,
    },
  };
}

export function createPageMetadata(
  title: string,
  description: string,
  path: string = ''
): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary',
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export function createToolJsonLd(tool: Tool) {
  const url = `${SITE_URL}/tools/${tool.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.shortDescription,
    url,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

export function createBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}