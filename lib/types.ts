export type ToolCategory =
  | 'text'
  | 'image'
  | 'dev'
  | 'utility'
  | 'converter'
  | 'generator'
  | 'calculators';

export type AdPosition = 'top' | 'inline' | 'bottom';

export interface AdConfig {
  enabled: boolean;
  positions: AdPosition[];
}

export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Tool {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: ToolCategory;
  tags: string[];
  icon: string;
  featured: boolean;
  popular: boolean;
  relatedTools: string[];
  seo: SeoMetadata;
  ads: AdConfig;
  faqs?: FaqItem[];
}
