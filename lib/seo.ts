import { Metadata } from 'next';
import type { Tool } from './registry';

const SITE_URL = 'https://clickbuildlabs.com';
const SITE_NAME = 'Click & Build Labs';
const SITE_DESCRIPTION =
  'Free online tools, converters, calculators, text utilities, and developer tools. Fast, browser-based, no signup required.';

function createAbsoluteUrl(path: string = '') {
  const normalizedPath = path ? `/${path.replace(/^\/+|\/+$/g, '')}` : '';
  return `${SITE_URL}${normalizedPath}/`;
}

export const siteMetadata = {
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  siteName: SITE_NAME,
  locale: 'en_US',
};

export function createToolMetadata(
  tool: Pick<Tool, 'slug' | 'name' | 'shortDescription' | 'tags'>
): Metadata {
  const url = createAbsoluteUrl(`/tools/${tool.slug}`);

  return {
    title: tool.name,
    description: tool.shortDescription,
    keywords: tool.tags,
    openGraph: {
      title: tool.name,
      description: tool.shortDescription,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary',
      title: tool.name,
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
  const url = createAbsoluteUrl(path);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export function createHomeMetadata(): Metadata {
  const url = createAbsoluteUrl();

  return {
    title: 'Free Online Tools, Converters & Calculators',
    description: SITE_DESCRIPTION,
    openGraph: {
      title: 'Click & Build Labs - Free Online Tools',
      description: SITE_DESCRIPTION,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary',
      title: 'Click & Build Labs - Free Online Tools',
      description: SITE_DESCRIPTION,
    },
    alternates: {
      canonical: url,
    },
  };
}

export function createToolJsonLd(tool: Tool) {
  const url = createAbsoluteUrl(`/tools/${tool.slug}`);

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
    browserRequirements: 'Any',
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: { '@type': 'UseAction' },
      userInteractionCount: 'Unknown',
    },
  };
}

export function createWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: createAbsoluteUrl(),
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${createAbsoluteUrl('/tools')}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
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

export function createFaqJsonLd(
  faqs: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
