import type { Tool, ToolCategory, FaqItem } from './types';

export { type Tool, type ToolCategory, type FaqItem } from './types';

export const TOOL_CATEGORIES = [
  'all',
  'text',
  'image',
  'dev',
  'utility',
  'converter',
  'generator',
] as const;

export type CategorySlug = (typeof TOOL_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  text: 'Text',
  image: 'Image',
  dev: 'Developer',
  utility: 'Utility',
  converter: 'Converter',
  generator: 'Generator',
};

export const CATEGORY_ICONS: Record<ToolCategory, string> = {
  text: 'type',
  image: 'image',
  dev: 'code',
  utility: 'wrench',
  converter: 'refresh',
  generator: 'zap',
};

export const tools: Tool[] = [
  {
    slug: 'uuid-generator',
    name: 'UUID Generator',
    shortDescription: 'Generate unique identifiers instantly',
    description:
      'Generate RFC 4122 compliant UUID v4, v1, and v7 identifiers for your applications. Free, fast, and client-side. No data sent to any server.',
    category: 'generator',
    tags: ['uuid', 'guid', 'unique id', 'generator', 'v4', 'v1', 'v7'],
    icon: 'hash',
    featured: true,
    popular: true,
    relatedTools: ['password-generator', 'slug-generator', 'hash-generator'],
    seo: {
      title: 'UUID Generator - Free Online UUID v4, v1, v7 Generator',
      description:
        'Generate RFC 4122 compliant UUID v4, v1, and v7 identifiers instantly. Free, secure, client-side UUID generator. No signup required.',
      keywords: [
        'uuid generator',
        'guid generator',
        'unique id generator',
        'uuid v4',
        'uuid v1',
        'uuid v7',
      ],
    },
    ads: {
      enabled: false,
      positions: [],
    },
    faqs: [
      {
        question: 'What UUID versions are supported?',
        answer: 'We support UUID v1 (timestamp-based), v4 (random), and v7 (Unix timestamp). Each has different use cases - v4 is most common for general identifiers.',
      },
      {
        question: 'Are these RFC 4122 compliant?',
        answer: 'Yes, all generated UUIDs follow the RFC 4122 specification for format and validity.',
      },
      {
        question: 'Is my data sent to any server?',
        answer: 'No. All UUID generation happens entirely in your browser using JavaScript. Nothing is transmitted to our servers.',
      },
    ],
  },
  {
    slug: 'base64-encode',
    name: 'Base64 Encoder',
    shortDescription: 'Encode and decode Base64 instantly',
    description:
      'Encode text to Base64 and decode Base64 back to text. Secure client-side processing, no data sent to servers. Toggle between encode and decode modes.',
    category: 'converter',
    tags: ['base64', 'encode', 'decode', 'encoder', 'decoder'],
    icon: 'lock',
    featured: true,
    popular: true,
    relatedTools: ['url-slug-generator', 'hash-generator', 'json-formatter'],
    seo: {
      title: 'Base64 Encoder - Free Online Base64 Encode/Decode Tool',
      description:
        'Encode text to Base64 and decode Base64 back to text instantly. Free, secure, client-side Base64 encoder and decoder.',
      keywords: ['base64 encoder', 'base64 decoder', 'encode base64', 'decode base64'],
    },
    ads: {
      enabled: false,
      positions: [],
    },
    faqs: [
      {
        question: 'What encoding types are supported?',
        answer: 'We support standard Base64 encoding and decoding. The tool automatically detects if your input is valid Base64 and decodes it, or encodes plain text.',
      },
      {
        question: 'Is my data processed on servers?',
        answer: 'No. All encoding and decoding happens in your browser. Your text never leaves your device.',
      },
      {
        question: 'Can I use this for URL-safe Base64?',
        answer: 'Standard Base64 uses +, /, and = characters. For URL-safe Base64, use our URL Slug Generator tool instead.',
      },
    ],
  },
  {
    slug: 'password-generator',
    name: 'Password Generator',
    shortDescription: 'Generate secure passwords',
    description:
      'Generate cryptographically secure passwords with customizable length and character sets. Client-side only, no data transmitted.',
    category: 'generator',
    tags: ['password', 'generator', 'secure', 'random', 'password generator'],
    icon: 'shield',
    featured: true,
    popular: true,
    relatedTools: ['uuid-generator', 'hash-generator'],
    seo: {
      title: 'Password Generator - Free Secure Password Generator',
      description:
        'Generate cryptographically secure passwords instantly. Free password generator with customizable options.',
      keywords: ['password generator', 'secure password', 'random password'],
    },
    ads: {
      enabled: false,
      positions: [],
    },
    faqs: [
      {
        question: 'How secure are the generated passwords?',
        answer: 'We use cryptographically secure random number generation (crypto.getRandomValues) for maximum security. Each character position is truly random.',
      },
      {
        question: 'Can I customize the password length?',
        answer: 'Yes. You can generate passwords from 8 to 64 characters long, with full control over which character types to include.',
      },
      {
        question: 'Are passwords stored or transmitted?',
        answer: 'Never. Passwords are generated client-side and never sent to any server. Always copy immediately after generation.',
      },
    ],
  },
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    shortDescription: 'Format, validate and beautify JSON',
    description:
      'Format, validate, and beautify JSON data. Minify for production or pretty-print for readability. Instant client-side processing with syntax highlighting.',
    category: 'dev',
    tags: ['json', 'formatter', 'validator', 'beautify', 'minify', 'prettify'],
    icon: 'code',
    featured: true,
    popular: true,
    relatedTools: ['base64-encode', 'slug-generator', 'hash-generator'],
    seo: {
      title: 'JSON Formatter - Free Online JSON Validator & Beautifier',
      description:
        'Format, validate, and beautify JSON instantly. Free online JSON formatter with minify, validate, and syntax highlighting.',
      keywords: [
        'json formatter',
        'json validator',
        'json beautifier',
        'format json',
        'minify json',
        'prettify json',
      ],
    },
    ads: {
      enabled: false,
      positions: [],
    },
    faqs: [
      {
        question: 'Does this validate JSON syntax?',
        answer: 'Yes. The Validate mode checks if your JSON is syntactically correct and reports any parsing errors with line and column information.',
      },
      {
        question: 'Is my JSON sent to a server?',
        answer: 'No. All parsing, formatting, and validation happens entirely in your browser. Your data never leaves your device.',
      },
      {
        question: 'What formatting options are available?',
        answer: 'Beautify outputs pretty-printed JSON with 2-space indentation. Minify compresses JSON to a single line. Validate checks syntax without outputting.',
      },
    ],
  },
  {
    slug: 'slug-generator',
    name: 'URL Slug Generator',
    shortDescription: 'Create SEO-friendly URLs',
    description:
      'Convert any text into URL-friendly slugs. Perfect for blog posts, product pages, and SEO optimization. Handles special characters and unicode.',
    category: 'utility',
    tags: ['slug', 'url', 'seo', 'permalink', 'clean url', 'url friendly'],
    icon: 'link',
    featured: false,
    popular: true,
    relatedTools: ['password-generator', 'uuid-generator'],
    seo: {
      title: 'URL Slug Generator - Free SEO-Friendly Slug Creator',
      description:
        'Generate URL-friendly slugs from any text. Free online slug generator for SEO, blog posts, and clean URLs.',
      keywords: ['url slug', 'slug generator', 'seo url', 'permalink generator'],
    },
    ads: {
      enabled: false,
      positions: [],
    },
    faqs: [
      {
        question: 'What characters are allowed in slugs?',
        answer: 'URL slugs use lowercase letters, numbers, and hyphens. Special characters, spaces, and unicode are converted or removed for maximum compatibility.',
      },
      {
        question: 'How are special characters handled?',
        answer: 'Non-ASCII characters are converted to ASCII equivalents where possible. Symbols and special characters are removed or replaced with hyphens.',
      },
      {
        question: 'Can I use this for SEO?',
        answer: 'Yes. Clean, descriptive slugs are a best practice for SEO as they help search engines understand your page content.',
      },
    ],
  },
  {
    slug: 'hash-generator',
    name: 'Hash Generator',
    shortDescription: 'Generate MD5, SHA-1, SHA-256 hashes',
    description:
      'Generate cryptographic hashes from any text. Support for MD5, SHA-1, SHA-256, SHA-512, and more. All processing happens client-side.',
    category: 'dev',
    tags: ['hash', 'md5', 'sha', 'sha256', 'sha512', 'crypto', 'checksum'],
    icon: 'shield',
    featured: false,
    popular: false,
    relatedTools: ['base64-encode', 'password-generator'],
    seo: {
      title: 'Hash Generator - Free MD5, SHA-1, SHA-256, SHA-512 Generator',
      description:
        'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text. Free online hash generator with instant results.',
      keywords: ['hash generator', 'md5', 'sha-256', 'sha-512', 'checksum generator'],
    },
    ads: {
      enabled: false,
      positions: [],
    },
    faqs: [
      {
        question: 'What hash algorithms are supported?',
        answer: 'We support MD5, SHA-1, SHA-256, and SHA-512. SHA-256 is recommended for most security purposes.',
      },
      {
        question: 'Is hashing done client-side?',
        answer: 'Yes. All hash computation happens in your browser using the Web Crypto API. Your input is never sent to any server.',
      },
      {
        question: 'What is the difference between these algorithms?',
        answer: 'Each algorithm produces a different hash length: MD5 (128-bit), SHA-1 (160-bit), SHA-256 (256-bit), SHA-512 (512-bit). Longer hashes are more collision-resistant.',
      },
    ],
  },
  {
    slug: 'color-converter',
    name: 'Color Converter',
    shortDescription: 'Convert between HEX, RGB, HSL',
    description:
      'Convert colors between HEX, RGB, HSL, HSV, and CMYK formats. Visual color picker and palette generator. Free and instant.',
    category: 'converter',
    tags: ['color', 'hex', 'rgb', 'hsl', 'hsv', 'cmyk', 'converter', 'picker', 'color picker'],
    icon: 'palette',
    featured: false,
    popular: true,
    relatedTools: ['slug-generator'],
    seo: {
      title: 'Color Converter - Free HEX, RGB, HSL Color Picker & Converter',
      description:
        'Convert colors between HEX, RGB, HSL, HSV, and CMYK formats. Free online color converter with visual picker and palette generator.',
      keywords: [
        'color converter',
        'hex to rgb',
        'color picker',
        'hsl to hex',
        'color format',
      ],
    },
    ads: {
      enabled: false,
      positions: [],
    },
    faqs: [
      {
        question: 'What color formats are supported?',
        answer: 'We support HEX (3 and 6 digit), RGB, RGBA, HSL, HSLA, HSV, and CMYK. All conversions are instantaneous.',
      },
      {
        question: 'Is there a color picker?',
        answer: 'Yes. Click the color preview to open an interactive color picker. You can also paste or type any format directly.',
      },
      {
        question: 'How accurate are the conversions?',
        answer: 'Conversions are mathematically precise. Note that CMYK is an approximate color space for print, so some RGB-to-CMYK conversions may vary slightly.',
      },
    ],
  },
  {
    slug: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    shortDescription: 'Generate placeholder text',
    description:
      'Generate Lorem Ipsum placeholder text for designs and prototypes. Choose paragraph count, sentence length, or word count.',
    category: 'generator',
    tags: ['lorem ipsum', 'placeholder', 'dummy text', 'generator', 'filler'],
    icon: 'type',
    featured: false,
    popular: false,
    relatedTools: ['slug-generator', 'uuid-generator'],
    seo: {
      title: 'Lorem Ipsum Generator - Free Placeholder Text Generator',
      description:
        'Generate Lorem Ipsum placeholder text instantly. Free online Lorem Ipsum generator for designs, mockups, and prototyping.',
      keywords: ['lorem ipsum', 'placeholder text', 'dummy text generator'],
    },
    ads: {
      enabled: false,
      positions: [],
    },
    faqs: [
      {
        question: 'How much text can I generate?',
        answer: 'You can generate up to 100 paragraphs of Lorem Ipsum text. Each paragraph contains 4-6 sentences of classic Latin placeholder text.',
      },
      {
        question: 'Can I control the output format?',
        answer: 'Yes. Choose to output by paragraph count, sentence count, or word count based on your design or prototyping needs.',
      },
      {
        question: 'Is this suitable for SEO content?',
        answer: 'No. Lorem Ipsum is Latin placeholder text and contains no actual content. It should only be used for design mockups and prototypes.',
      },
    ],
  },
  {
    slug: 'word-counter',
    name: 'Word Counter',
    shortDescription: 'Count words, characters, and reading time',
    description:
      'Count words, characters, sentences, paragraphs, and estimated reading time. Useful for essays, articles, and social media posts. Free and instant.',
    category: 'text',
    tags: ['word counter', 'character counter', 'count words', 'reading time', 'text analysis'],
    icon: 'type',
    featured: false,
    popular: true,
    relatedTools: ['character-counter', 'case-converter'],
    seo: {
      title: 'Word Counter - Free Online Word & Character Counter',
      description:
        'Count words, characters, sentences, paragraphs, and reading time instantly. Free online word counter tool for writers and students.',
      keywords: ['word counter', 'character counter', 'count words', 'reading time', 'text analysis'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'Does it count spaces?', answer: 'Yes. We show both character counts: with spaces and without spaces.' },
      { question: 'How is reading time calculated?', answer: 'Reading time is estimated at 200 words per minute, a standard reading speed.' },
      { question: 'Is my text sent anywhere?', answer: 'No. All processing happens in your browser. Your text never leaves your device.' },
    ],
  },
  {
    slug: 'character-counter',
    name: 'Character Counter',
    shortDescription: 'Count characters, words, and lines',
    description:
      'Count characters with and without spaces, words, and lines. Useful for Twitter, social media limits, and code. Free and instant.',
    category: 'text',
    tags: ['character counter', 'letter counter', 'count characters', 'twitter character count', 'text length'],
    icon: 'hash',
    featured: false,
    popular: false,
    relatedTools: ['word-counter', 'case-converter'],
    seo: {
      title: 'Character Counter - Free Online Character & Word Counter',
      description:
        'Count characters, words, and lines instantly. Free character counter tool for Twitter, captions, and code.',
      keywords: ['character counter', 'letter counter', 'count characters', 'twitter character count'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'Does it count spaces?', answer: 'Yes, both with and without spaces.' },
      { question: 'Can I use it for Twitter/X limits?', answer: 'Yes. Character count is useful for social media posts with character limits.' },
      { question: 'Is my text stored?', answer: 'No. Everything is processed locally in your browser.' },
    ],
  },
  {
    slug: 'case-converter',
    name: 'Case Converter',
    shortDescription: 'Convert text case instantly',
    description:
      'Convert text to lowercase, UPPERCASE, Title Case, Sentence case, camelCase, kebab-case, and snake_case. Free and instant.',
    category: 'text',
    tags: ['case converter', 'lowercase', 'uppercase', 'title case', 'camelcase', ' kebab-case', 'snake_case'],
    icon: 'type',
    featured: false,
    popular: true,
    relatedTools: ['word-counter', 'character-counter', 'slug-generator'],
    seo: {
      title: 'Case Converter - Free Online Text Case Converter',
      description:
        'Convert text to lowercase, UPPERCASE, Title Case, camelCase, kebab-case, and snake_case instantly. Free and client-side.',
      keywords: ['case converter', 'lowercase', 'uppercase', 'title case', 'camelcase', 'kebab-case'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What case formats are supported?', answer: 'lowercase, UPPERCASE, Title Case, Sentence case, camelCase, kebab-case, and snake_case.' },
      { question: 'Can I copy the result?', answer: 'Yes. Click the copy button to copy the result to your clipboard.' },
      { question: 'Is this case conversion accurate for all languages?', answer: 'It works best with standard Latin characters. Complex Unicode may not convert correctly.' },
    ],
  },
  {
    slug: 'url-encoder-decoder',
    name: 'URL Encoder / Decoder',
    shortDescription: 'Encode and decode URLs instantly',
    description:
      'Encode URLs for safe transmission or decode encoded URLs back to readable text. Essential for web development and API work. Free and instant.',
    category: 'dev',
    tags: ['url encode', 'url decode', 'encode url', 'decode url', 'percent encoding', 'url encoding'],
    icon: 'link',
    featured: false,
    popular: true,
    relatedTools: ['html-entity-encoder-decoder', 'base64-encode'],
    seo: {
      title: 'URL Encoder / Decoder - Free Online URL Encoding and Decoding',
      description:
        'Encode and decode URLs instantly. Free online URL encoder/decoder tool for web developers.',
      keywords: ['url encode', 'url decode', 'encode url', 'decode url', 'percent encoding'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'Why encode URLs?', answer: 'Special characters in URLs must be encoded to ensure they transmit correctly over the internet.' },
      { question: 'Is my data sent to servers?', answer: 'No. All encoding and decoding happens in your browser.' },
      { question: 'What characters are encoded?', answer: 'Characters like spaces, &, #, %, and non-ASCII characters are encoded as %XX hex values.' },
    ],
  },
  {
    slug: 'html-entity-encoder-decoder',
    name: 'HTML Entity Encoder / Decoder',
    shortDescription: 'Encode and decode HTML entities',
    description:
      'Convert special characters to HTML entities and decode HTML entities back to readable text. Essential for web development. Free and instant.',
    category: 'dev',
    tags: ['html entities', 'encode html', 'decode html', 'entity encoder', 'special characters html'],
    icon: 'code',
    featured: false,
    popular: false,
    relatedTools: ['url-encoder-decoder', 'base64-encode'],
    seo: {
      title: 'HTML Entity Encoder / Decoder - Free Online HTML Encoding',
      description:
        'Encode and decode HTML entities instantly. Convert special characters to &amp; and &lt; HTML entity format.',
      keywords: ['html entities', 'encode html', 'decode html', 'entity encoder'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What are HTML entities?', answer: 'HTML entities are codes like &amp;, &lt;, and &gt; used to represent special characters in HTML.' },
      { question: 'Why encode HTML entities?', answer: 'Encoding is necessary when you want to display special characters in HTML without them being interpreted as HTML code.' },
      { question: 'Is this client-side?', answer: 'Yes. All processing happens entirely in your browser.' },
    ],
  },
  {
    slug: 'timestamp-converter',
    name: 'Timestamp Converter',
    shortDescription: 'Convert Unix timestamps to dates',
    description:
      'Convert Unix timestamps to human-readable dates and vice versa. Supports both seconds and milliseconds. Shows local time and UTC. Free and instant.',
    category: 'dev',
    tags: ['timestamp', 'unix timestamp', 'epoch', 'convert timestamp', 'date converter'],
    icon: 'clock',
    featured: false,
    popular: true,
    relatedTools: ['json-formatter', 'word-counter'],
    seo: {
      title: 'Timestamp Converter - Free Online Unix Timestamp Converter',
      description:
        'Convert Unix timestamps to dates and dates to timestamps. Supports seconds and milliseconds. Shows local and UTC time.',
      keywords: ['timestamp converter', 'unix timestamp', 'epoch converter', 'date to timestamp'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What is a Unix timestamp?', answer: 'A Unix timestamp is the number of seconds (or milliseconds) since January 1, 1970 UTC. It is used to represent dates in computing.' },
      { question: 'Seconds or milliseconds?', answer: 'Our tool supports both. Toggle between seconds and milliseconds using the button above the input field.' },
      { question: 'What time zones are shown?', answer: 'Both your local time and UTC (Coordinated Universal Time) are displayed.' },
    ],
  },
  {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    shortDescription: 'Calculate percentages instantly',
    description:
      'Calculate X% of Y, what percentage X is of Y, and percentage change. Simple, fast, and free. No signup required.',
    category: 'utility',
    tags: ['percentage calculator', 'percent', 'calculate percentage', 'percentage change'],
    icon: 'percent',
    featured: false,
    popular: false,
    relatedTools: ['word-counter', 'character-counter'],
    seo: {
      title: 'Percentage Calculator - Free Online Percentage Calculator',
      description:
        'Calculate percentages instantly: find X% of Y, what percentage X is of Y, and percentage change. Free and simple.',
      keywords: ['percentage calculator', 'percent calculator', 'calculate percentage', 'percentage change'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How do I calculate X% of Y?', answer: 'Select "X% of Y" mode, enter the percentage (X) and the total (Y), then click Calculate.' },
      { question: 'How do I find what percentage X is of Y?', answer: 'Select "X is what % of Y" mode, enter the part (X) and the total (Y).' },
      { question: 'How is percentage change calculated?', answer: 'Percentage change = ((new - old) / old) × 100%. Select "Change %" mode to calculate.' },
    ],
  },
  {
    slug: 'text-diff-checker',
    name: 'Text Diff Checker',
    shortDescription: 'Compare two texts and find differences',
    description:
      'Compare two texts side by side and see the differences highlighted. Line-by-line comparison with add and remove indicators. Free and instant.',
    category: 'dev',
    tags: ['text diff', 'compare text', 'diff checker', 'text comparison', 'find differences'],
    icon: 'diff',
    featured: false,
    popular: false,
    relatedTools: ['word-counter', 'json-formatter'],
    seo: {
      title: 'Text Diff Checker - Free Online Text Comparison Tool',
      description:
        'Compare two texts and find differences instantly. Line-by-line diff checker for developers and writers.',
      keywords: ['text diff', 'compare text', 'diff checker', 'text comparison'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How does it work?', answer: 'Paste your original text in the left box and the modified text in the right box, then click Compare.' },
      { question: 'What does highlighting mean?', answer: 'Green lines are additions, red lines are deletions, and white lines are unchanged.' },
      { question: 'Is my text stored?', answer: 'No. All processing happens in your browser. Your texts are never sent to any server.' },
    ],
  },
  {
    slug: 'markdown-previewer',
    name: 'Markdown Previewer',
    shortDescription: 'Preview and format Markdown',
    description:
      'Write Markdown and see a live preview. Supports headings, bold, italic, lists, links, and code. Free and instant.',
    category: 'text',
    tags: ['markdown', 'markdown preview', 'preview markdown', 'markdown editor', 'readme generator'],
    icon: 'file-text',
    featured: false,
    popular: true,
    relatedTools: ['word-counter', 'case-converter', 'text-diff-checker'],
    seo: {
      title: 'Markdown Previewer - Free Online Markdown Editor',
      description:
        'Write Markdown and see a live preview. Supports headings, bold, italic, lists, links, and code blocks.',
      keywords: ['markdown previewer', 'markdown editor', 'preview markdown', 'readme generator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What Markdown syntax is supported?', answer: 'Headings (# ## ###), bold (**text**), italic (*text*), lists (- item), links [text](url), and inline code (`code`).' },
      { question: 'Is my Markdown saved?', answer: 'No. Your Markdown is processed locally and is not saved anywhere.' },
      { question: 'Can I copy the HTML output?', answer: 'Yes. Click the "Copy HTML" button to copy the rendered HTML to your clipboard.' },
    ],
  },
  {
    slug: 'json-to-csv',
    name: 'JSON to CSV Converter',
    shortDescription: 'Convert JSON arrays to CSV',
    description:
      'Convert JSON arrays to CSV format for use in spreadsheets. Handles nested objects and arrays. Free and instant with download option.',
    category: 'dev',
    tags: ['json to csv', 'convert json', 'csv converter', 'json converter', 'data conversion'],
    icon: 'file-spreadsheet',
    featured: false,
    popular: true,
    relatedTools: ['json-formatter', 'base64-encode'],
    seo: {
      title: 'JSON to CSV Converter - Free Online JSON to CSV Tool',
      description:
        'Convert JSON arrays to CSV format instantly. Download as CSV file or copy to clipboard. Free and client-side.',
      keywords: ['json to csv', 'convert json csv', 'csv converter', 'json converter'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What JSON format is supported?', answer: 'We support arrays of objects like [{"name": "John", "age": 30}]. The objects should have consistent keys.' },
      { question: 'Can I download the CSV?', answer: 'Yes. Click the "Download CSV" button to download the converted file.' },
      { question: 'What happens with nested objects?', answer: 'Nested objects are converted to dot notation in the CSV headers (e.g., "address.city").' },
    ],
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  if (category === 'all') return tools;
  return tools.filter((tool) => tool.category === category);
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((tool) => tool.featured);
}

export function getPopularTools(): Tool[] {
  return tools.filter((tool) => tool.popular);
}

export function getRelatedTools(slug: string): Tool[] {
  const tool = getToolBySlug(slug);
  if (!tool) return [];
  return tool.relatedTools
    .map((s) => getToolBySlug(s))
    .filter((t): t is Tool => t !== undefined)
    .slice(0, 3);
}

export function getAllCategories(): typeof TOOL_CATEGORIES {
  return TOOL_CATEGORIES;
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase().trim();
  if (!q) return tools;

  return tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(q) ||
      tool.shortDescription.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.tags.some((tag) => tag.includes(q))
  );
}

export function getNewestTools(count: number = 4): Tool[] {
  return [...tools].slice(0, count);
}
