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
  'calculators',
] as const;

export type CategorySlug = (typeof TOOL_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  text: 'Text',
  image: 'Image',
  dev: 'Developer',
  utility: 'Utility',
  converter: 'Converter',
  generator: 'Generator',
  calculators: 'Calculators',
};

export const CATEGORY_ICONS: Record<ToolCategory, string> = {
  text: 'type',
  image: 'image',
  dev: 'code',
  utility: 'wrench',
  converter: 'refresh',
  generator: 'zap',
  calculators: 'calculator',
};

export const CATEGORY_INFO: Record<ToolCategory, {
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  faqs: Array<{ question: string; answer: string }>;
  relatedCategories: ToolCategory[];
}> = {
  dev: {
    title: 'Developer Tools',
    description: 'Utilidades for JSON, URL, JWT, Base64, Regex, HTML, CSS y formatos técnicos.',
    seoTitle: 'Developer Tools - Free Online Utilities for JSON, URL, JWT and More',
    seoDescription: 'Free browser-based developer tools for formatting JSON, decoding JWTs, encoding URLs, testing regex patterns and working with common web formats.',
    faqs: [
      {
        question: 'Are these tools really free to use?',
        answer: 'Yes, all developer tools on Click & Build Labs are completely free to use with no signup or installation required.',
      },
      {
        question: 'Is my code sent to any server?',
        answer: 'No. All processing happens entirely in your browser. Your code and data never leave your device.',
      },
      {
        question: 'What formats are supported?',
        answer: 'We support JSON, URL, Base64, JWT, HTML, CSS, XML, YAML and many other common development formats.',
      },
    ],
    relatedCategories: ['generator', 'converter', 'utility'],
  },
  converter: {
    title: 'Converter Tools',
    description: 'Conversores online para longitud, peso, temperatura, datos, velocidad, volumen, área y más.',
    seoTitle: 'Converter Tools - Free Online Unit Conversion Calculators',
    seoDescription: 'Free browser-based unit converter tools for length, weight, temperature, data, speed, volume, area and more. No signup required.',
    faqs: [
      {
        question: 'What unit conversions are available?',
        answer: 'We offer converters for length, weight, temperature, data storage, speed, volume, area, time, and more.',
      },
      {
        question: 'Are the conversions accurate?',
        answer: 'Yes, our converters use standard conversion factors and are precise for everyday use cases.',
      },
    ],
    relatedCategories: ['calculators', 'dev', 'utility'],
  },
  calculators: {
    title: 'Calculator Tools',
    description: 'Calculadoras online para descuentos, IVA, edad, fechas, préstamos, propinas y porcentajes.',
    seoTitle: 'Calculator Tools - Free Online Discount, VAT, Loan and Tip Calculators',
    seoDescription: 'Free browser-based calculators for discounts, VAT, age, dates, loans, tips, percentages and more. No signup required.',
    faqs: [
      {
        question: 'What calculations can I perform?',
        answer: 'We offer discount calculators, VAT calculators, age calculators, date calculators, loan calculators, tip calculators and percentage calculators.',
      },
      {
        question: 'Is my financial data safe?',
        answer: 'Yes, all calculations happen locally in your browser. No data is transmitted or stored anywhere.',
      },
    ],
    relatedCategories: ['converter', 'utility', 'generator'],
  },
  text: {
    title: 'Text Tools',
    description: 'Herramientas para contar, limpiar, transformar, comparar y convertir texto.',
    seoTitle: 'Text Tools - Free Online String Manipulation and Text Formatting',
    seoDescription: 'Free browser-based text tools for counting characters, cleaning whitespace, transforming text, comparing strings and more.',
    faqs: [
      {
        question: 'What text operations are available?',
        answer: 'We offer tools for counting characters and words, removing duplicates, sorting lines, finding and replacing text, and text case conversion.',
      },
    ],
    relatedCategories: ['dev', 'generator', 'utility'],
  },
  generator: {
    title: 'Generator Tools',
    description: 'Generadores para UUID, passwords, slugs, lorem ipsum y otros valores útiles.',
    seoTitle: 'Generator Tools - Free Online UUID, Password and Slug Generators',
    seoDescription: 'Free browser-based generators for UUIDs, passwords, slugs, Lorem Ipsum, hashes and other useful values. No signup required.',
    faqs: [
      {
        question: 'How are passwords and UUIDs generated?',
        answer: 'We use the Web Crypto API for cryptographically secure random generation of UUIDs and passwords.',
      },
    ],
    relatedCategories: ['dev', 'utility', 'text'],
  },
  utility: {
    title: 'Utility Tools',
    description: 'Herramientas prácticas variadas que no encajan claramente en otra categoría.',
    seoTitle: 'Utility Tools - Free Online Miscellaneous Web Utilities',
    seoDescription: 'Free browser-based utility tools for various practical tasks that do not fit into other categories. No signup required.',
    faqs: [
      {
        question: 'What utilities are available?',
        answer: 'We offer color converters, QR code generators, timezone converters and other practical utilities.',
      },
    ],
    relatedCategories: ['dev', 'converter', 'calculators'],
  },
  image: {
    title: 'Image Tools',
    description: 'Herramientas para imágenes.',
    seoTitle: 'Image Tools - Free Online Image Utilities',
    seoDescription: 'Free browser-based image tools for common image operations.',
    faqs: [],
    relatedCategories: ['utility', 'generator'],
  },
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
  {
    slug: 'json-validator',
    name: 'JSON Validator',
    shortDescription: 'Validate JSON syntax instantly',
    description:
      'Validate JSON syntax and get detailed error messages with line and column information. Free, fast, and 100% client-side.',
    category: 'dev',
    tags: ['json', 'validator', 'json validator', 'validate json', 'json syntax'],
    icon: 'check-circle',
    featured: false,
    popular: true,
    relatedTools: ['json-formatter', 'json-minifier'],
    seo: {
      title: 'JSON Validator - Free Online JSON Syntax Validator',
      description:
        'Validate JSON syntax instantly with detailed error messages. Free online JSON validator with line and column info.',
      keywords: ['json validator', 'validate json', 'json syntax checker', 'json error'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'Does this show error locations?', answer: 'Yes. When JSON is invalid, we show the exact line and column where the error occurred.' },
      { question: 'Is my JSON sent to a server?', answer: 'No. All validation happens entirely in your browser. Your data never leaves your device.' },
      { question: 'Can I format valid JSON?', answer: 'Yes. Use our JSON Formatter tool to beautify or minify your JSON.' },
    ],
  },
  {
    slug: 'json-minifier',
    name: 'JSON Minifier',
    shortDescription: 'Minify JSON for production',
    description:
      'Minify JSON by removing whitespace and newlines for production use. Free, fast, and 100% client-side.',
    category: 'dev',
    tags: ['json', 'minifier', 'minify json', 'compress json', 'json optimizer'],
    icon: 'minimize-2',
    featured: false,
    popular: false,
    relatedTools: ['json-formatter', 'json-validator'],
    seo: {
      title: 'JSON Minifier - Free Online JSON Minification Tool',
      description:
        'Minify JSON by removing whitespace for production. Free online JSON minifier. No server processing.',
      keywords: ['json minifier', 'minify json', 'compress json', 'json optimizer'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What whitespace is removed?', answer: 'All unnecessary spaces, tabs, newlines, and indentation are removed.' },
      { question: 'Will this change my data?', answer: 'No. Minification only removes formatting whitespace, not actual JSON content.' },
      { question: 'Is this reversible?', answer: 'Yes. Use our JSON Formatter to beautify the minified JSON back to readable format.' },
    ],
  },
  {
    slug: 'csv-to-json',
    name: 'CSV to JSON Converter',
    shortDescription: 'Convert CSV data to JSON',
    description:
      'Convert CSV data to JSON format for use in web applications and APIs. Handles headers and complex CSVs. Free and instant.',
    category: 'converter',
    tags: ['csv', 'csv to json', 'convert csv', 'json converter', 'data conversion'],
    icon: 'file-spreadsheet',
    featured: false,
    popular: true,
    relatedTools: ['json-to-csv', 'json-formatter'],
    seo: {
      title: 'CSV to JSON Converter - Free Online CSV to JSON Tool',
      description:
        'Convert CSV data to JSON format instantly. Free online CSV to JSON converter with header detection.',
      keywords: ['csv to json', 'convert csv json', 'csv converter', 'json converter'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How does header detection work?', answer: 'The first row of your CSV is used as JSON keys. Each subsequent row becomes an object.' },
      { question: 'What if my CSV has quotes?', answer: 'Our parser handles quoted fields and escaped quotes within quoted content.' },
      { question: 'Can I paste multi-line values?', answer: 'Yes. Quoted fields can contain newlines and will be handled correctly.' },
    ],
  },
  {
    slug: 'url-parser',
    name: 'URL Parser',
    shortDescription: 'Parse URL components instantly',
    description:
      'Parse any URL into its components: protocol, host, port, path, query, and fragment. See exactly what each part of a URL means.',
    category: 'dev',
    tags: ['url', 'parser', 'url parser', 'parse url', 'url components', 'url analysis'],
    icon: 'link',
    featured: false,
    popular: false,
    relatedTools: ['url-encoder-decoder', 'slug-generator'],
    seo: {
      title: 'URL Parser - Free Online URL Component Parser',
      description:
        'Parse URLs into protocol, host, port, path, query, and fragment. Free online URL parser tool.',
      keywords: ['url parser', 'parse url', 'url components', 'url analysis'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What URL parts are shown?', answer: 'Protocol, host, port, pathname, search (query), hash (fragment), username, and password.' },
      { question: 'Can I edit the URL and see changes?', answer: 'Yes. Edit any component and see the reconstructed URL update in real-time.' },
      { question: 'Is my URL sent anywhere?', answer: 'No. All parsing happens locally in your browser.' },
    ],
  },
  {
    slug: 'jwt-decoder',
    name: 'JWT Decoder',
    shortDescription: 'Decode JWT tokens client-side',
    description:
      'Decode JWT tokens to view the header, payload, and signature. Perfect for debugging and inspecting tokens. Does NOT verify signatures.',
    category: 'dev',
    tags: ['jwt', 'decoder', 'jwt decoder', 'decode jwt', 'json web token', 'jwt viewer'],
    icon: 'key',
    featured: false,
    popular: true,
    relatedTools: ['hash-generator', 'base64-encode'],
    seo: {
      title: 'JWT Decoder - Free Online JWT Token Decoder',
      description:
        'Decode JWT tokens to view header and payload. Free online JWT decoder. Does NOT verify signatures.',
      keywords: ['jwt decoder', 'decode jwt', 'jwt viewer', 'json web token decoder'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'Does this verify JWT signatures?', answer: 'No. This tool only DECODES the token for inspection. It does NOT verify the signature. Do not use for security purposes.' },
      { question: 'What parts of a JWT are shown?', answer: 'The header (algorithm), payload (claims), and signature (Base64 encoded).' },
      { question: 'Is my JWT stored?', answer: 'No. All decoding happens locally in your browser. Your token is never transmitted.' },
    ],
  },
  {
    slug: 'regex-tester',
    name: 'Regex Tester',
    shortDescription: 'Test regular expressions instantly',
    description:
      'Test regular expressions against sample text with real-time matching. Supports JavaScript regex syntax with flags.',
    category: 'dev',
    tags: ['regex', 'regex tester', 'regular expression', 'pattern matching', 'test regex'],
    icon: 'regex',
    featured: false,
    popular: true,
    relatedTools: ['html-entity-encoder-decoder', 'text-diff-checker'],
    seo: {
      title: 'Regex Tester - Free Online Regular Expression Tester',
      description:
        'Test regular expressions against sample text with real-time matching. Free online regex tester.',
      keywords: ['regex tester', 'regular expression tester', 'test regex', 'regex pattern'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What regex flags are supported?', answer: 'We support g (global), i (case insensitive), and m (multiline) flags.' },
      { question: 'Can I see match groups?', answer: 'Yes. Parenthesized groups are captured and displayed separately.' },
      { question: 'Is this compatible with JavaScript regex?', answer: 'Yes. We use JavaScript regex engine, so the syntax is compatible with JS regex patterns.' },
    ],
  },
  {
    slug: 'html-minifier',
    name: 'HTML Minifier',
    shortDescription: 'Minify HTML for production',
    description:
      'Minify HTML by removing unnecessary whitespace, comments, and optional tags. Reduce file size for faster page loads.',
    category: 'dev',
    tags: ['html', 'minifier', 'minify html', 'compress html', 'html optimizer'],
    icon: 'minimize-2',
    featured: false,
    popular: false,
    relatedTools: ['css-minifier', 'javascript-minifier'],
    seo: {
      title: 'HTML Minifier - Free Online HTML Minification Tool',
      description:
        'Minify HTML for production by removing whitespace and comments. Free online HTML minifier.',
      keywords: ['html minifier', 'minify html', 'compress html', 'html optimizer'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What is removed during minification?', answer: 'Whitespace between tags, unnecessary newlines, and HTML comments are removed.' },
      { question: 'Will minification break my page?', answer: 'Our minifier preserves structural whitespace and does not remove content that affects rendering.' },
      { question: 'Is this suitable for production?', answer: 'Yes. Minified HTML loads faster. Note: for complex sites, consider using a proper build tool.' },
    ],
  },
  {
    slug: 'css-minifier',
    name: 'CSS Minifier',
    shortDescription: 'Minify CSS for production',
    description:
      'Minify CSS by removing whitespace, comments, and redundant rules. Reduce CSS file size for faster page loads.',
    category: 'dev',
    tags: ['css', 'minifier', 'minify css', 'compress css', 'css optimizer'],
    icon: 'minimize-2',
    featured: false,
    popular: false,
    relatedTools: ['html-minifier', 'javascript-minifier'],
    seo: {
      title: 'CSS Minifier - Free Online CSS Minification Tool',
      description:
        'Minify CSS for production by removing whitespace and comments. Free online CSS minifier.',
      keywords: ['css minifier', 'minify css', 'compress css', 'css optimizer'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What is removed during minification?', answer: 'Whitespace, comments, and redundant semicolons are removed.' },
      { question: 'Will this break my styles?', answer: 'No. Our minifier only removes non-functional whitespace and comments.' },
      { question: 'Does it merge duplicate rules?', answer: 'Basic duplicate merging is performed. For complex optimization, use a proper build tool.' },
    ],
  },
  {
    slug: 'javascript-minifier',
    name: 'JavaScript Minifier',
    shortDescription: 'Minify JavaScript for production',
    description:
      'Minify JavaScript by removing whitespace, comments, and unnecessary characters. Reduce JS file size for faster page loads.',
    category: 'dev',
    tags: ['javascript', 'minifier', 'minify js', 'compress javascript', 'js optimizer'],
    icon: 'minimize-2',
    featured: false,
    popular: false,
    relatedTools: ['html-minifier', 'css-minifier'],
    seo: {
      title: 'JavaScript Minifier - Free Online JS Minification Tool',
      description:
        'Minify JavaScript for production by removing whitespace. Free online JS minifier.',
      keywords: ['javascript minifier', 'minify js', 'compress javascript', 'js optimizer'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What is removed during minification?', answer: 'Whitespace, newlines, and comments between statements are removed.' },
      { question: 'Does it rename variables?', answer: 'No. Variable renaming (obfuscation) requires a proper build tool like Terser or UglifyJS.' },
      { question: 'Is minified JS safe for production?', answer: 'Yes. Our basic minification is safe. For production sites, use bundlers like webpack or esbuild for full optimization.' },
    ],
  },
  {
    slug: 'query-string-builder',
    name: 'Query String Builder',
    shortDescription: 'Build URL query strings easily',
    description:
      'Build URL query strings by adding key-value pairs. See the resulting URL and copy it for use in your applications.',
    category: 'utility',
    tags: ['query string', 'url params', 'build url', 'query builder', 'url builder'],
    icon: 'plus-square',
    featured: false,
    popular: false,
    relatedTools: ['url-parser', 'url-encoder-decoder'],
    seo: {
      title: 'Query String Builder - Free URL Query String Builder',
      description:
        'Build URL query strings by adding key-value pairs. Free online query string builder tool.',
      keywords: ['query string builder', 'url params', 'build url query', 'query builder'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How do I add parameters?', answer: 'Click "Add Parameter" to add a key-value pair. The query string updates automatically.' },
      { question: 'Can I remove parameters?', answer: 'Yes. Click the X button next to any parameter to remove it.' },
      { question: 'How are special characters handled?', answer: 'Values are automatically URL-encoded to ensure they are safe in URLs.' },
    ],
  },
  {
    slug: 'length-converter',
    name: 'Length Converter',
    shortDescription: 'Convert between meters, feet, inches, and more',
    description:
      'Convert length units instantly: meters, centimeters, millimeters, kilometers, inches, feet, yards, and miles. Free, fast, and 100% client-side.',
    category: 'converter',
    tags: ['length converter', 'meters to feet', 'convert length', 'unit converter', 'distance converter'],
    icon: 'ruler',
    featured: false,
    popular: true,
    relatedTools: ['weight-converter', 'temperature-converter', 'volume-converter'],
    seo: {
      title: 'Length Converter - Free Online Length Unit Converter',
      description:
        'Convert between meters, feet, inches, yards, miles and more instantly. Free online length converter. No signup required.',
      keywords: ['length converter', 'meters to feet', 'inches to cm', 'unit converter', 'distance converter'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What units are supported?', answer: 'Meters, centimeters, millimeters, kilometers, inches, feet, yards, and miles.' },
      { question: 'Is the conversion accurate?', answer: 'Yes. Conversions use standard conversion factors and are mathematically precise.' },
      { question: 'Is my data sent to servers?', answer: 'No. All conversions happen locally in your browser.' },
    ],
  },
  {
    slug: 'weight-converter',
    name: 'Weight Converter',
    shortDescription: 'Convert between grams, pounds, ounces, and more',
    description:
      'Convert weight units instantly: grams, kilograms, metric tons, ounces, pounds, and stones. Free, fast, and 100% client-side.',
    category: 'converter',
    tags: ['weight converter', 'kg to lbs', 'convert weight', 'grams to ounces', 'unit converter'],
    icon: 'scale',
    featured: false,
    popular: true,
    relatedTools: ['length-converter', 'temperature-converter', 'volume-converter'],
    seo: {
      title: 'Weight Converter - Free Online Weight Unit Converter',
      description:
        'Convert between grams, kilograms, pounds, ounces, and stones instantly. Free online weight converter.',
      keywords: ['weight converter', 'kg to lbs', 'grams to ounces', 'convert weight', 'unit converter'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What units are supported?', answer: 'Grams, kilograms, metric tons, ounces, pounds, and stones.' },
      { question: 'Can I convert between metric and imperial?', answer: 'Yes. All conversions work seamlessly between metric and imperial units.' },
      { question: 'Is my data sent to servers?', answer: 'No. All conversions happen locally in your browser.' },
    ],
  },
  {
    slug: 'temperature-converter',
    name: 'Temperature Converter',
    shortDescription: 'Convert between Celsius, Fahrenheit, and Kelvin',
    description:
      'Convert temperature units instantly: Celsius, Fahrenheit, and Kelvin. Handle negative values and get precise results.',
    category: 'converter',
    tags: ['temperature converter', 'celsius to fahrenheit', 'convert temperature', 'kelvin converter'],
    icon: 'thermometer',
    featured: false,
    popular: true,
    relatedTools: ['weight-converter', 'length-converter', 'area-converter'],
    seo: {
      title: 'Temperature Converter - Free Celsius, Fahrenheit, Kelvin Converter',
      description:
        'Convert between Celsius, Fahrenheit, and Kelvin instantly. Free online temperature converter.',
      keywords: ['temperature converter', 'celsius to fahrenheit', 'kelvin converter', 'convert temperature'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What temperature units are supported?', answer: 'Celsius (°C), Fahrenheit (°F), and Kelvin (K).' },
      { question: 'Can I enter negative values?', answer: 'Yes. All temperature units support negative values.' },
      { question: 'Is my data sent to servers?', answer: 'No. All conversions happen locally in your browser.' },
    ],
  },
  {
    slug: 'area-converter',
    name: 'Area Converter',
    shortDescription: 'Convert between m², ft², acres, hectares, and more',
    description:
      'Convert area units instantly: square meters, square centimeters, square kilometers, square feet, square yards, acres, and hectares.',
    category: 'converter',
    tags: ['area converter', 'm2 to ft2', 'acres to hectares', 'convert area', 'square converter'],
    icon: 'maximize-2',
    featured: false,
    popular: false,
    relatedTools: ['length-converter', 'volume-converter', 'speed-converter'],
    seo: {
      title: 'Area Converter - Free Square Meters, Acres, Hectares Converter',
      description:
        'Convert between m², ft², acres, hectares and more instantly. Free online area converter.',
      keywords: ['area converter', 'm2 to ft2', 'acres to hectares', 'convert area', 'square converter'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What area units are supported?', answer: 'Square meters, square centimeters, square kilometers, square feet, square yards, acres, and hectares.' },
      { question: 'Is the conversion accurate?', answer: 'Yes. Conversions use standard conversion factors.' },
      { question: 'Is my data sent to servers?', answer: 'No. All conversions happen locally in your browser.' },
    ],
  },
  {
    slug: 'volume-converter',
    name: 'Volume Converter',
    shortDescription: 'Convert between liters, gallons, pints, cups, and more',
    description:
      'Convert volume units instantly: liters, milliliters, cubic meters, US gallons, US pints, and US cups.',
    category: 'converter',
    tags: ['volume converter', 'liters to gallons', 'convert volume', 'ml to cups', 'fluid converter'],
    icon: 'droplet',
    featured: false,
    popular: true,
    relatedTools: ['weight-converter', 'length-converter', 'area-converter'],
    seo: {
      title: 'Volume Converter - Free Liters, Gallons, Cups Converter',
      description:
        'Convert between liters, gallons, pints, cups and more instantly. Free online volume converter.',
      keywords: ['volume converter', 'liters to gallons', 'ml to cups', 'convert volume', 'fluid converter'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What volume units are supported?', answer: 'Liters, milliliters, cubic meters, US gallons, US pints, and US cups.' },
      { question: 'Which gallon system is used?', answer: 'We use US gallons (not UK/imperial gallons).' },
      { question: 'Is my data sent to servers?', answer: 'No. All conversions happen locally in your browser.' },
    ],
  },
  {
    slug: 'speed-converter',
    name: 'Speed Converter',
    shortDescription: 'Convert between km/h, mph, m/s, and knots',
    description:
      'Convert speed units instantly: kilometers per hour, miles per hour, meters per second, and knots.',
    category: 'converter',
    tags: ['speed converter', 'km/h to mph', 'convert speed', 'm/s to knots', 'velocity converter'],
    icon: 'zap',
    featured: false,
    popular: true,
    relatedTools: ['length-converter', 'time-converter', 'fuel-consumption-converter'],
    seo: {
      title: 'Speed Converter - Free km/h, mph, m/s, Knots Converter',
      description:
        'Convert between km/h, mph, m/s, and knots instantly. Free online speed converter.',
      keywords: ['speed converter', 'km/h to mph', 'convert speed', 'm/s to knots', 'velocity converter'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What speed units are supported?', answer: 'Kilometers per hour (km/h), miles per hour (mph), meters per second (m/s), and knots.' },
      { question: 'Is the conversion accurate?', answer: 'Yes. Conversions use standard conversion factors.' },
      { question: 'Is my data sent to servers?', answer: 'No. All conversions happen locally in your browser.' },
    ],
  },
  {
    slug: 'time-converter',
    name: 'Time Converter',
    shortDescription: 'Convert between seconds, minutes, hours, days, and weeks',
    description:
      'Convert time units instantly: seconds, minutes, hours, days, and weeks. Different from timestamp converter.',
    category: 'converter',
    tags: ['time converter', 'hours to minutes', 'convert time', 'seconds to hours', 'duration converter'],
    icon: 'clock',
    featured: false,
    popular: true,
    relatedTools: ['speed-converter', 'length-converter', 'percentage-calculator'],
    seo: {
      title: 'Time Converter - Free Seconds, Minutes, Hours, Days Converter',
      description:
        'Convert between seconds, minutes, hours, days, and weeks instantly. Free online time converter.',
      keywords: ['time converter', 'hours to minutes', 'convert time', 'seconds to hours', 'duration converter'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What time units are supported?', answer: 'Seconds, minutes, hours, days, and weeks.' },
      { question: 'How is this different from timestamp converter?', answer: 'Timestamp converter handles Unix epoch timestamps. This converter handles duration units like hours to minutes.' },
      { question: 'Is my data sent to servers?', answer: 'No. All conversions happen locally in your browser.' },
    ],
  },
  {
    slug: 'data-storage-converter',
    name: 'Data Storage Converter',
    shortDescription: 'Convert between bytes, KB, MB, GB, and binary units (KiB, MiB)',
    description:
      'Convert data storage units: bytes, KB, MB, GB, TB (decimal) and KiB, MiB, GiB, TiB (binary). Note the difference.',
    category: 'converter',
    tags: ['data storage converter', 'bytes to mb', 'convert data', 'kb to mb', 'gb to tb'],
    icon: 'hard-drive',
    featured: false,
    popular: true,
    relatedTools: ['length-converter', 'time-converter', 'speed-converter'],
    seo: {
      title: 'Data Storage Converter - Free Bytes, KB, MB, GB, TB Converter',
      description:
        'Convert between bytes, KB, MB, GB, TB and KiB, MiB, GiB, TiB. Free online data storage converter.',
      keywords: ['data storage converter', 'bytes to mb', 'convert data', 'kb to mb', 'gb to tb'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What units are supported?', answer: 'Bytes, KB, MB, GB, TB (decimal, 1000-based) and KiB, MiB, GiB, TiB (binary, 1024-based).' },
      { question: 'What is the difference between decimal and binary?', answer: 'Decimal (KB) uses 1000 as base. Binary (KiB) uses 1024 as base. 1 KiB = 1024 bytes, 1 KB = 1000 bytes.' },
      { question: 'Is my data sent to servers?', answer: 'No. All conversions happen locally in your browser.' },
    ],
  },
  {
    slug: 'angle-converter',
    name: 'Angle Converter',
    shortDescription: 'Convert between degrees, radians, and gradians',
    description:
      'Convert angle units instantly: degrees, radians, and gradians. Useful for math, engineering, and navigation.',
    category: 'converter',
    tags: ['angle converter', 'degrees to radians', 'convert angle', 'gradians converter', 'trigonometry'],
    icon: 'triangle',
    featured: false,
    popular: false,
    relatedTools: ['length-converter', 'speed-converter', 'time-converter'],
    seo: {
      title: 'Angle Converter - Free Degrees, Radians, Gradians Converter',
      description:
        'Convert between degrees, radians, and gradians instantly. Free online angle converter.',
      keywords: ['angle converter', 'degrees to radians', 'convert angle', 'gradians converter', 'trigonometry'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What angle units are supported?', answer: 'Degrees (°), radians (rad), and gradians (grad).' },
      { question: 'When would I use gradians?', answer: 'Gradians are used in some engineering contexts and angle measurements. 400 gradians = 360 degrees.' },
      { question: 'Is my data sent to servers?', answer: 'No. All conversions happen locally in your browser.' },
    ],
  },
  {
    slug: 'fuel-consumption-converter',
    name: 'Fuel Consumption Converter',
    shortDescription: 'Convert between L/100km, km/L, MPG US, and MPG UK',
    description:
      'Convert fuel consumption units: L/100km, km/L, MPG US, and MPG UK. See note about consumption vs efficiency.',
    category: 'converter',
    tags: ['fuel consumption converter', 'l/100km to mpg', 'convert fuel', 'km/l to mpg', 'gas converter'],
    icon: 'zap',
    featured: false,
    popular: false,
    relatedTools: ['speed-converter', 'length-converter', 'time-converter'],
    seo: {
      title: 'Fuel Consumption Converter - Free L/100km, MPG Converter',
      description:
        'Convert between L/100km, km/L, MPG US, and MPG UK instantly. Free online fuel consumption converter.',
      keywords: ['fuel consumption converter', 'l/100km to mpg', 'convert fuel', 'km/l to mpg', 'gas converter'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What units are supported?', answer: 'Liters per 100km (L/100km), kilometers per liter (km/L), MPG US, and MPG UK.' },
      { question: 'Which is better, lower or higher values?', answer: 'For L/100km, lower is better (less fuel used). For km/L and MPG, higher is better (more efficient).' },
      { question: 'Is my data sent to servers?', answer: 'No. All conversions happen locally in your browser.' },
    ],
  },
  {
    slug: 'discount-calculator',
    name: 'Discount Calculator',
    shortDescription: 'Calculate final price after discount',
    description:
      'Calculate the final price after applying a discount percentage. See how much you save instantly.',
    category: 'calculators',
    tags: ['discount calculator', 'calculate discount', 'price discount', 'sale calculator'],
    icon: 'percent',
    featured: false,
    popular: true,
    relatedTools: ['vat-calculator', 'profit-margin-calculator', 'percentage-calculator'],
    seo: {
      title: 'Discount Calculator - Free Online Discount Calculator',
      description: 'Calculate the final price after a discount and how much you save. Free online discount calculator.',
      keywords: ['discount calculator', 'calculate discount', 'price discount', 'sale calculator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How is the discount calculated?', answer: 'Final price = Original Price × (1 - Discount %). The savings = Original Price × Discount %.' },
      { question: 'Can I enter decimal discounts?', answer: 'Yes. For example, enter 12.5 for a 12.5% discount.' },
      { question: 'Is my data sent to servers?', answer: 'No. All calculations happen locally in your browser.' },
    ],
  },
  {
    slug: 'vat-calculator',
    name: 'VAT Calculator',
    shortDescription: 'Add or extract VAT from prices',
    description:
      'Calculate VAT amount and final price. Add VAT to a net price or extract VAT from a gross price. Configurable tax rate.',
    category: 'calculators',
    tags: ['vat calculator', 'tax calculator', 'add vat', 'extract vat', 'iva calculator'],
    icon: 'calculator',
    featured: false,
    popular: true,
    relatedTools: ['discount-calculator', 'profit-margin-calculator', 'percentage-calculator'],
    seo: {
      title: 'VAT Calculator - Free Online VAT Calculator',
      description: 'Add or extract VAT from any price. Configurable tax rate. Free online VAT calculator.',
      keywords: ['vat calculator', 'tax calculator', 'add vat', 'extract vat', 'iva calculator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How does the VAT calculation work?', answer: 'Add mode: Net Price + VAT = Gross Price. Extract mode: Gross Price / (1 + VAT%) = Net Price.' },
      { question: 'Can I use different VAT rates?', answer: 'Yes. Change the percentage to match your local VAT rate.' },
      { question: 'Is my data sent to servers?', answer: 'No. All calculations happen locally in your browser.' },
    ],
  },
  {
    slug: 'profit-margin-calculator',
    name: 'Profit Margin Calculator',
    shortDescription: 'Calculate profit, margin, and markup',
    description:
      'Calculate profit, profit margin percentage, and markup percentage from cost and sell price.',
    category: 'calculators',
    tags: ['profit calculator', 'margin calculator', 'markup calculator', 'profit margin'],
    icon: 'trending-up',
    featured: false,
    popular: false,
    relatedTools: ['vat-calculator', 'discount-calculator', 'percentage-calculator'],
    seo: {
      title: 'Profit Margin Calculator - Free Online Profit Margin Calculator',
      description: 'Calculate profit, margin, and markup from cost and sell price. Free online calculator.',
      keywords: ['profit calculator', 'margin calculator', 'markup calculator', 'profit margin'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What is the difference between margin and markup?', answer: 'Margin is profit / selling price. Markup is profit / cost. They are different ways to express the same profit.' },
      { question: 'What happens if sell price is less than cost?', answer: 'An error message is shown as this would mean selling at a loss.' },
      { question: 'Is my data sent to servers?', answer: 'No. All calculations happen locally in your browser.' },
    ],
  },
  {
    slug: 'rule-of-three-calculator',
    name: 'Rule of Three Calculator',
    shortDescription: 'Solve proportional relationships',
    description:
      'Solve proportional relationships using the rule of three. A is to B as C is to X.',
    category: 'calculators',
    tags: ['rule of three', 'proportion calculator', 'ratio calculator', 'direct proportion'],
    icon: 'scale',
    featured: false,
    popular: false,
    relatedTools: ['percentage-calculator', 'average-calculator', 'profit-margin-calculator'],
    seo: {
      title: 'Rule of Three Calculator - Free Online Proportion Calculator',
      description: 'Solve proportional relationships using the rule of three. A is to B as C is to X.',
      keywords: ['rule of three', 'proportion calculator', 'ratio calculator', 'direct proportion'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How does the rule of three work?', answer: 'If A/B = C/X, then X = (B × C) / A. This tool calculates X for you.' },
      { question: 'Can I use it for any proportional relationship?', answer: 'Yes, for direct proportions where A/B = C/X.' },
      { question: 'Is my data sent to servers?', answer: 'No. All calculations happen locally in your browser.' },
    ],
  },
  {
    slug: 'average-calculator',
    name: 'Average Calculator',
    shortDescription: 'Calculate mean, sum, min, max',
    description:
      'Calculate the average (mean), sum, count, minimum, and maximum of a set of numbers.',
    category: 'calculators',
    tags: ['average calculator', 'mean calculator', 'calculate average', 'statistics'],
    icon: 'bar-chart',
    featured: false,
    popular: false,
    relatedTools: ['rule-of-three-calculator', 'percentage-calculator', 'word-counter'],
    seo: {
      title: 'Average Calculator - Free Online Mean Calculator',
      description: 'Calculate average (mean), sum, count, min, and max of numbers. Free online calculator.',
      keywords: ['average calculator', 'mean calculator', 'calculate average', 'statistics'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How should I enter numbers?', answer: 'Separate numbers by commas, spaces, or new lines. Invalid entries will be ignored.' },
      { question: 'Does it handle decimal numbers?', answer: 'Yes. Enter numbers like 10.5, 20.25, 30.75.' },
      { question: 'Is my data sent to servers?', answer: 'No. All calculations happen locally in your browser.' },
    ],
  },
  {
    slug: 'age-calculator',
    name: 'Age Calculator',
    shortDescription: 'Calculate age from birth date',
    description:
      'Calculate your exact age in years, months, and days. See days until your next birthday.',
    category: 'calculators',
    tags: ['age calculator', 'calculate age', 'birthday calculator', 'age finder'],
    icon: 'calendar',
    featured: false,
    popular: true,
    relatedTools: ['date-difference-calculator', 'timestamp-converter', 'percentage-calculator'],
    seo: {
      title: 'Age Calculator - Free Online Age Calculator',
      description: 'Calculate your exact age from birth date. See years, months, days and days until birthday.',
      keywords: ['age calculator', 'calculate age', 'birthday calculator', 'age finder'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'Is my birth date stored?', answer: 'No. All calculations happen locally in your browser. Nothing is stored.' },
      { question: 'Can I use future dates?', answer: 'No. Future birth dates are not allowed and will show an error.' },
      { question: 'Is the calculation accurate?', answer: 'Yes. It accounts for leap years and varying month lengths.' },
    ],
  },
  {
    slug: 'date-difference-calculator',
    name: 'Date Difference Calculator',
    shortDescription: 'Calculate days between two dates',
    description:
      'Calculate the difference between two dates in days, weeks, months, and years.',
    category: 'calculators',
    tags: ['date calculator', 'days between dates', 'date difference', 'weeks to date'],
    icon: 'calendar',
    featured: false,
    popular: true,
    relatedTools: ['age-calculator', 'timestamp-converter', 'percentage-calculator'],
    seo: {
      title: 'Date Difference Calculator - Free Days Between Dates Calculator',
      description: 'Calculate the difference between two dates in days, weeks, months, and years.',
      keywords: ['date calculator', 'days between dates', 'date difference', 'weeks to date'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'Does it show absolute difference?', answer: 'Yes. The difference is always shown as a positive number regardless of date order.' },
      { question: 'Are the month and year calculations exact?', answer: 'Months are approximate (30.44 days avg). Years are approximate (365.25 days avg). For exact days, use the days value.' },
      { question: 'Is my data sent to servers?', answer: 'No. All calculations happen locally in your browser.' },
    ],
  },
  {
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    shortDescription: 'Calculate Body Mass Index',
    description:
      'Calculate your Body Mass Index (BMI) from height and weight. See your BMI category.',
    category: 'calculators',
    tags: ['bmi calculator', 'body mass index', 'calculate bmi', 'weight calculator'],
    icon: 'activity',
    featured: false,
    popular: true,
    relatedTools: ['weight-converter', 'percentage-calculator', 'age-calculator'],
    seo: {
      title: 'BMI Calculator - Free Body Mass Index Calculator',
      description: 'Calculate your Body Mass Index (BMI) from height and weight. Get your BMI category.',
      keywords: ['bmi calculator', 'body mass index', 'calculate bmi', 'weight calculator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What units does this calculator use?', answer: 'This calculator uses metric units: centimeters for height and kilograms for weight.' },
      { question: 'What do the BMI categories mean?', answer: 'Underweight (<18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (30+).' },
      { question: 'Is this medical advice?', answer: 'No. BMI is a general indicator and not medical advice. Consult a healthcare professional for personalized guidance.' },
    ],
  },
  {
    slug: 'loan-calculator',
    name: 'Loan Calculator',
    shortDescription: 'Calculate monthly loan payments',
    description:
      'Calculate monthly loan payments, total amount paid, and total interest. Simple loan amortization.',
    category: 'calculators',
    tags: ['loan calculator', 'mortgage calculator', 'loan payment', 'amortization calculator'],
    icon: 'credit-card',
    featured: false,
    popular: true,
    relatedTools: ['profit-margin-calculator', 'vat-calculator', 'percentage-calculator'],
    seo: {
      title: 'Loan Calculator - Free Online Loan Payment Calculator',
      description: 'Calculate monthly loan payments, total paid, and interest. Free online loan calculator.',
      keywords: ['loan calculator', 'mortgage calculator', 'loan payment', 'amortization calculator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How is the monthly payment calculated?', answer: 'Uses the standard amortization formula: M = P × (r(1+r)^n) / ((1+r)^n - 1), where P is principal, r is monthly rate, n is number of payments.' },
      { question: 'Is the interest rate annual?', answer: 'Yes. The annual interest rate is divided by 12 to get the monthly rate.' },
      { question: 'Is this financial advice?', answer: 'No. These are estimates for informational purposes only. Consult a financial advisor for personalized advice.' },
    ],
  },
  {
    slug: 'tip-calculator',
    name: 'Tip Calculator',
    shortDescription: 'Calculate tip and split bills',
    description:
      'Calculate tip amount, total with tip, and split the bill between multiple people.',
    category: 'calculators',
    tags: ['tip calculator', 'calculate tip', 'split bill', 'restaurant calculator'],
    icon: 'dollar-sign',
    featured: false,
    popular: true,
    relatedTools: ['percentage-calculator', 'vat-calculator', 'discount-calculator'],
    seo: {
      title: 'Tip Calculator - Free Online Tip Calculator',
      description: 'Calculate tip amount, total with tip, and split the bill between people. Free tip calculator.',
      keywords: ['tip calculator', 'calculate tip', 'split bill', 'restaurant calculator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How is the tip calculated?', answer: 'Tip = Bill Amount × (Tip % / 100). Total = Bill Amount + Tip.' },
      { question: 'Can I split the bill?', answer: 'Yes. Enter the number of people and the total is divided accordingly.' },
      { question: 'Is my data sent to servers?', answer: 'No. All calculations happen locally in your browser.' },
    ],
  },
  {
    slug: 'date-calculator',
    name: 'Date Calculator',
    shortDescription: 'Add or subtract days, weeks, months, or years',
    description:
      'Calculate a new date by adding or subtracting days, weeks, months, or years from a starting date. Free, fast, and client-side.',
    category: 'calculators',
    tags: ['date calculator', 'add days', 'subtract dates', 'date math', 'days calculator'],
    icon: 'calendar',
    featured: false,
    popular: false,
    relatedTools: ['days-until-calculator', 'week-number-calculator', 'date-difference-calculator'],
    seo: {
      title: 'Date Calculator - Free Online Add/Subtract Days Calculator',
      description:
        'Calculate a new date by adding or subtracting days, weeks, months, or years. Free online date calculator.',
      keywords: ['date calculator', 'add days', 'subtract dates', 'date math', 'days calculator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What units can I add or subtract?', answer: 'You can add or subtract days, weeks, months, or years from any date.' },
      { question: 'Does it handle month boundaries correctly?', answer: 'Yes. When adding months, the day is adjusted if that month has fewer days.' },
      { question: 'Is my date sent to servers?', answer: 'No. All calculations happen locally in your browser.' },
    ],
  },
  {
    slug: 'business-days-calculator',
    name: 'Business Days Calculator',
    shortDescription: 'Calculate working days between two dates',
    description:
      'Calculate the number of business days (Monday to Friday) between two dates. Excludes weekends. Free and client-side.',
    category: 'calculators',
    tags: ['business days', 'working days', 'weekdays', 'business days calculator', 'working days calculator'],
    icon: 'briefcase',
    featured: false,
    popular: false,
    relatedTools: ['date-calculator', 'days-until-calculator', 'date-difference-calculator'],
    seo: {
      title: 'Business Days Calculator - Free Online Working Days Calculator',
      description:
        'Calculate the number of business days (Monday to Friday) between two dates. Free online business days calculator.',
      keywords: ['business days calculator', 'working days calculator', 'weekdays calculator', 'business days'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'Are weekends excluded?', answer: 'Yes. Only Monday through Friday are counted as business days.' },
      { question: 'Are holidays excluded?', answer: 'No. This tool does not use external APIs for holidays. Only weekends are excluded.' },
      { question: 'Is my data sent to servers?', answer: 'No. All calculations happen locally in your browser.' },
    ],
  },
  {
    slug: 'days-until-calculator',
    name: 'Days Until Calculator',
    shortDescription: 'Count days until a future date',
    description:
      'See how many days, weeks, and months remain until a target date. Free, fast, and client-side.',
    category: 'calculators',
    tags: ['days until', 'countdown', 'days remaining', 'future date', 'days calculator'],
    icon: 'calendar',
    featured: false,
    popular: false,
    relatedTools: ['date-calculator', 'countdown-calculator', 'week-number-calculator'],
    seo: {
      title: 'Days Until Calculator - Free Online Countdown to Date',
      description:
        'See how many days, weeks, and months remain until any future date. Free online days until calculator.',
      keywords: ['days until calculator', 'days countdown', 'days remaining', 'future date countdown'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What happens if the date has passed?', answer: 'The tool will indicate that the date has already passed.' },
      { question: 'Can I see weeks and months too?', answer: 'Yes. The tool shows approximate weeks and months as well as exact days.' },
      { question: 'Is my data sent to servers?', answer: 'No. All calculations happen locally in your browser.' },
    ],
  },
  {
    slug: 'week-number-calculator',
    name: 'Week Number Calculator',
    shortDescription: 'Find ISO week number for any date',
    description:
      'Find the ISO week number and year for any date. Shows the day of the week and explains the ISO week system. Free and client-side.',
    category: 'calculators',
    tags: ['week number', 'iso week', 'week of year', 'calendar week', 'week calculator'],
    icon: 'calendar',
    featured: false,
    popular: false,
    relatedTools: ['date-calculator', 'calendar-week-calculator', 'days-until-calculator'],
    seo: {
      title: 'Week Number Calculator - Free Online ISO Week Calculator',
      description:
        'Find the ISO week number and year for any date. Free online week number calculator.',
      keywords: ['week number calculator', 'iso week', 'week of year', 'calendar week'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What is an ISO week?', answer: 'ISO weeks start on Monday. The first week of the year is the week containing the first Thursday.' },
      { question: 'Can the week number differ from the calendar year?', answer: 'Yes. Some dates at the start or end of a year may belong to a different ISO year than the calendar year.' },
      { question: 'Is my data sent to servers?', answer: 'No. All calculations happen locally in your browser.' },
    ],
  },
  {
    slug: 'time-duration-calculator',
    name: 'Time Duration Calculator',
    shortDescription: 'Calculate duration between two times',
    description:
      'Calculate the duration between a start time and end time. Handles crossing midnight. Shows hours, minutes, and total minutes. Free and client-side.',
    category: 'calculators',
    tags: ['time duration', 'duration calculator', 'hours calculator', 'time difference', 'elapsed time'],
    icon: 'clock',
    featured: false,
    popular: false,
    relatedTools: ['add-subtract-time-calculator', 'time-zone-converter', 'unix-time-now'],
    seo: {
      title: 'Time Duration Calculator - Free Online Hours and Minutes Calculator',
      description:
        'Calculate the duration between two times. Handles crossing midnight. Shows hours, minutes, and total minutes.',
      keywords: ['time duration calculator', 'hours calculator', 'time difference', 'elapsed time calculator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What time formats are supported?', answer: 'Times must be entered in 24-hour format (HH:MM).' },
      { question: 'Does it handle crossing midnight?', answer: 'Yes. If the end time is earlier than the start time, the tool assumes the end time is on the next day.' },
      { question: 'Is my data sent to servers?', answer: 'No. All calculations happen locally in your browser.' },
    ],
  },
  {
    slug: 'add-subtract-time-calculator',
    name: 'Add/Subtract Time Calculator',
    shortDescription: 'Add or subtract hours and minutes',
    description:
      'Add or subtract hours and minutes from a starting time. Shows the result in 24-hour format. Free and client-side.',
    category: 'calculators',
    tags: ['add time', 'subtract time', 'time calculator', 'hours and minutes', 'time math'],
    icon: 'clock',
    featured: false,
    popular: false,
    relatedTools: ['time-duration-calculator', 'time-zone-converter', 'unix-time-now'],
    seo: {
      title: 'Add/Subtract Time Calculator - Free Online Time Calculator',
      description:
        'Add or subtract hours and minutes from a starting time. Free online add/subtract time calculator.',
      keywords: ['add time calculator', 'subtract time', 'time calculator', 'hours and minutes'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What format should I use?', answer: 'Enter times in 24-hour format (HH:MM).' },
      { question: 'What happens if the result goes past midnight?', answer: 'The time wraps around correctly, showing the time on the next day.' },
      { question: 'Is my data sent to servers?', answer: 'No. All calculations happen locally in your browser.' },
    ],
  },
  {
    slug: 'countdown-calculator',
    name: 'Countdown Calculator',
    shortDescription: 'Live countdown to a target date and time',
    description:
      'Show a live countdown to any future date and time. Displays days, hours, minutes, and seconds. Updates every second. Free and client-side.',
    category: 'calculators',
    tags: ['countdown', 'countdown timer', 'days countdown', 'time remaining', 'event countdown'],
    icon: 'timer',
    featured: false,
    popular: false,
    relatedTools: ['days-until-calculator', 'date-calculator', 'unix-time-now'],
    seo: {
      title: 'Countdown Calculator - Free Online Live Countdown Timer',
      description:
        'Show a live countdown to any future date and time. Displays days, hours, minutes, and seconds. Free online countdown calculator.',
      keywords: ['countdown calculator', 'countdown timer', 'days countdown', 'time remaining'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'Does it update in real-time?', answer: 'Yes. The countdown updates every second automatically.' },
      { question: 'What happens when the countdown reaches zero?', answer: 'The tool will indicate that the target date and time have passed.' },
      { question: 'Is the countdown persistent?', answer: 'No. Refreshing the page resets the countdown. This is a client-side calculation only.' },
    ],
  },
  {
    slug: 'unix-time-now',
    name: 'Unix Time Now',
    shortDescription: 'Show current Unix timestamp instantly',
    description:
      'Display the current Unix timestamp in seconds and milliseconds, plus local and UTC time. Click to refresh. Free and client-side.',
    category: 'calculators',
    tags: ['unix timestamp', 'epoch', 'current time', 'unix time now', 'timestamp now'],
    icon: 'clock',
    featured: false,
    popular: false,
    relatedTools: ['timestamp-converter', 'time-zone-converter', 'unix-time-now'],
    seo: {
      title: 'Unix Time Now - Free Current Unix Timestamp Display',
      description:
        'Display the current Unix timestamp in seconds and milliseconds. Shows local time and UTC. Free and instant.',
      keywords: ['unix timestamp now', 'current timestamp', 'epoch now', 'unix time'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What is a Unix timestamp?', answer: 'A Unix timestamp is the number of seconds (or milliseconds) since January 1, 1970 UTC.' },
      { question: 'What is the difference between seconds and milliseconds?', answer: 'Unix timestamps are typically in seconds, but many systems use milliseconds for more precision.' },
      { question: 'Is my data sent to servers?', answer: 'No. All timestamps are generated locally in your browser.' },
    ],
  },
  {
    slug: 'time-zone-converter',
    name: 'Time Zone Converter',
    shortDescription: 'Convert time between different time zones',
    description:
      'Convert time from one time zone to another. Supports UTC, Europe, America, Asia, and Australia. Uses browser APIs. Free and client-side.',
    category: 'calculators',
    tags: ['time zone converter', 'timezone conversion', 'convert time', 'utc converter', 'world clock'],
    icon: 'globe',
    featured: false,
    popular: false,
    relatedTools: ['add-subtract-time-calculator', 'time-duration-calculator', 'unix-time-now'],
    seo: {
      title: 'Time Zone Converter - Free Online Time Zone Conversion',
      description:
        'Convert time from one time zone to another. Supports UTC, Europe, America, Asia, and Australia time zones.',
      keywords: ['time zone converter', 'timezone conversion', 'utc converter', 'world clock converter'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What time zones are supported?', answer: 'UTC, Europe/Madrid, Europe/London, America/New_York, America/Los_Angeles, Asia/Tokyo, and Australia/Sydney.' },
      { question: 'Does it handle daylight saving time?', answer: 'Yes. The browser handles DST transitions automatically.' },
      { question: 'Is my data sent to servers?', answer: 'No. Time zone conversions use the browser built-in Intl API.' },
    ],
  },
  {
    slug: 'calendar-week-calculator',
    name: 'Calendar Week Calculator',
    shortDescription: 'Find start and end date of an ISO week',
    description:
      'Enter a year and ISO week number to see the Monday and Sunday dates of that week. Free and client-side.',
    category: 'calculators',
    tags: ['calendar week', 'iso week', 'week date', 'week calculator', 'week finder'],
    icon: 'calendar',
    featured: false,
    popular: false,
    relatedTools: ['week-number-calculator', 'date-calculator', 'days-until-calculator'],
    seo: {
      title: 'Calendar Week Calculator - Free ISO Week Date Finder',
      description:
        'Find the Monday and Sunday dates for any ISO week number. Enter year and week to see the date range.',
      keywords: ['calendar week calculator', 'iso week dates', 'week finder', 'week start end'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What is an ISO week?', answer: 'ISO weeks start on Monday. Week 1 is the week containing the first Thursday of the year.' },
      { question: 'What format is the output?', answer: 'The output shows the Monday date and Sunday date of the selected week.' },
      { question: 'Is my data sent to servers?', answer: 'No. All calculations happen locally in your browser.' },
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
