import type { Tool, ToolCategory } from './types';

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
    description: 'Utilities for JSON, URL, JWT, Base64, Regex, HTML, CSS, and technical formats.',
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
    description: 'Online converters for length, weight, temperature, data, speed, volume, area, and more.',
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
    description: 'Online calculators for discounts, VAT, age, dates, loans, tips, and percentages.',
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
    description: 'Tools for counting, cleaning, transforming, comparing, and converting text.',
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
    description: 'Generators for UUIDs, passwords, slugs, Lorem Ipsum, and other useful values.',
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
    description: 'Miscellaneous practical tools that do not clearly fit another category.',
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
    description: 'Browser-based tools for common image tasks.',
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
      'Generate UUID v4, v1, and v7 formatted identifiers for your applications. Free, fast, and client-side. No data sent to any server.',
    quickAnswer:
      'A UUID generator creates unique-looking identifier strings for apps, databases, files, and test data. ClickBuildLabs can generate UUID v4, v1, and v7 values directly in your browser, so generated IDs are not uploaded or stored by this page.',
    category: 'generator',
    tags: ['uuid', 'guid', 'unique id', 'generator', 'v4', 'v1', 'v7'],
    icon: 'hash',
    featured: true,
    popular: true,
    relatedTools: ['password-generator', 'slug-generator', 'hash-generator'],
    seo: {
      title: 'UUID Generator - Free Online UUID v4, v1, v7 Generator',
      description:
        'Generate UUID v4, v1, and v7 formatted identifiers instantly. Free client-side UUID generator. No signup required.',
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
    content: {
      intro:
        'Use this UUID generator to create identifier strings for records, test data, application objects, and other places where a stable ID format is useful.',
      howToUse: [
        'Choose the UUID version you want to generate.',
        'Click the generate button to create a new identifier.',
        'Copy the UUID and use it in your database, code, test fixture, or document.',
      ],
      example: {
        title: 'Creating an ID for a test record',
        body:
          'When you need a placeholder ID for a user or order in a test dataset, generate a UUID and paste it into the record as a unique-looking identifier.',
      },
      logic: {
        title: 'How UUIDs are generated',
        body:
          'The tool creates strings in UUID format using the selected version. UUIDs are designed to make collisions unlikely for common use cases, but no client-side generator should be treated as a formal guarantee of global uniqueness in every system.',
      },
    },
    faqs: [
      {
        question: 'What can I use a UUID for?',
        answer: 'UUIDs are commonly used as identifiers for database records, files, events, API objects, and test data.',
      },
      {
        question: 'Which UUID version should I choose?',
        answer: 'UUID v4 is a common choice for random identifiers. Other versions may be useful when timestamp ordering or a specific format is needed.',
      },
      {
        question: 'Are generated UUIDs stored?',
        answer: 'No. UUIDs are generated in your browser and are not saved by this page.',
      },
      {
        question: 'Can I generate multiple UUIDs for test data?',
        answer: 'Yes. Generate as many identifiers as you need, then copy them into your code, database seed data, or test fixtures.',
      },
    ],
  },
  {
    slug: 'base64-encode',
    name: 'Base64 Encoder',
    shortDescription: 'Encode and decode Base64 instantly',
    description:
      'Encode text to Base64 and decode Base64 back to text. Client-side processing, no data sent to servers. Toggle between encode and decode modes.',
    quickAnswer:
      'A Base64 encoder converts readable text into Base64 and can decode Base64 back to text. ClickBuildLabs handles encoding and decoding in your browser, making it useful for debugging payloads, data strings, and simple web development tasks without uploading the text.',
    category: 'converter',
    tags: ['base64', 'encode', 'decode', 'encoder', 'decoder'],
    icon: 'lock',
    featured: true,
    popular: true,
    relatedTools: ['slug-generator', 'hash-generator', 'json-formatter'],
    seo: {
      title: 'Base64 Encoder - Free Online Base64 Encode/Decode Tool',
      description:
        'Encode text to Base64 and decode Base64 back to text instantly. Free client-side Base64 encoder and decoder.',
      keywords: ['base64 encoder', 'base64 decoder', 'encode base64', 'decode base64'],
    },
    ads: {
      enabled: false,
      positions: [],
    },
    content: {
      intro:
        'Use this Base64 tool to encode plain text into Base64 or decode Base64 back into readable text. It is useful for data URLs, simple payloads, and debugging encoded strings.',
      howToUse: [
        'Choose whether you want to encode text or decode Base64.',
        'Paste your text or Base64 string into the input area.',
        'Review the output and copy it when it matches what you need.',
      ],
      example: {
        title: 'Encoding a short text value',
        body:
          'The text hello becomes aGVsbG8= when encoded as Base64. Decoding aGVsbG8= returns hello.',
      },
      logic: {
        title: 'What Base64 does',
        body:
          'Base64 represents text or binary data using a limited set of safe characters. It is an encoding format, not encryption, so it should not be used to hide secrets or protect sensitive data.',
      },
    },
    faqs: [
      {
        question: 'Is Base64 encryption?',
        answer: 'No. Base64 is only an encoding method. Anyone can decode it back to the original text if they have the encoded value.',
      },
      {
        question: 'What kind of input can I encode?',
        answer: 'This tool is intended for text input. For image files, use the Image to Base64 tool instead.',
      },
      {
        question: 'Does Base64 encoding happen in my browser?',
        answer: 'Yes. Encoding and decoding run in your browser, so the text is not uploaded by this page.',
      },
      {
        question: 'Why does Base64 output sometimes end with equals signs?',
        answer: 'Equals signs are padding characters. They help the encoded value fit the Base64 format and are normal at the end of many Base64 strings.',
      },
    ],
  },
  {
    slug: 'password-generator',
    name: 'Password Generator',
    shortDescription: 'Generate secure passwords',
    description:
      'Generate cryptographically secure passwords with customizable length and character sets. Client-side only, no data transmitted.',
    quickAnswer:
      'A password generator creates random passwords using the length and character types you choose. ClickBuildLabs generates passwords client-side in your browser, so the generated password is not transmitted or stored by this page.',
    category: 'generator',
    tags: ['password', 'generator', 'secure', 'random', 'password generator'],
    icon: 'shield',
    featured: true,
    popular: true,
    relatedTools: ['uuid-generator', 'hash-generator'],
    seo: {
      title: 'Password Generator - Free Random Secure Passwords',
      description:
        'Generate cryptographically secure passwords instantly. Free password generator with customizable options.',
      keywords: ['password generator', 'secure password', 'random password'],
    },
    ads: {
      enabled: false,
      positions: [],
    },
    content: {
      intro:
        'Use this password generator to create random passwords with the length and character types you choose. It runs in your browser and is useful when you need a fresh password for an account, test user, or temporary credential.',
      howToUse: [
        'Choose the password length that fits the account or system requirements.',
        'Select whether to include uppercase letters, lowercase letters, numbers, and symbols.',
        'Generate a password, review it, then copy it when you are ready to use it.',
      ],
      example: {
        title: 'Creating a stronger account password',
        body:
          'If a site asks for at least 16 characters with numbers and symbols, set the length to 16 or more and enable all character groups before generating a new password.',
      },
      logic: {
        title: 'How characters are selected',
        body:
          'The generator builds a pool from the character groups you enable, then picks random characters until it reaches the selected length. More length and more character variety can make guessing harder, but no generator can guarantee absolute security for every situation.',
      },
    },
    faqs: [
      {
        question: 'How should I choose a password length?',
        answer: 'Longer passwords are generally harder to guess. A length of 16 characters or more is a practical starting point when the service allows it.',
      },
      {
        question: 'Should I include symbols?',
        answer: 'Include symbols when the account supports them. Symbols add variety, but length and uniqueness are also important.',
      },
      {
        question: 'Are generated passwords stored?',
        answer: 'No. The password is generated in your browser and is not saved by this page. Copy it to your password manager or another safe place.',
      },
      {
        question: 'Should I reuse a generated password?',
        answer: 'No. Use a unique password for each account, preferably stored in a trusted password manager.',
      },
    ],
  },
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    shortDescription: 'Format, validate and beautify JSON',
    description:
      'Format, validate, and beautify JSON data. Minify for production or pretty-print for readability. Instant client-side processing with syntax highlighting.',
    quickAnswer:
      'A JSON formatter turns minified or messy JSON into readable, indented JSON. ClickBuildLabs formats, validates, and minifies JSON directly in your browser, so your JSON is not uploaded or stored by this page.',
    category: 'dev',
    tags: ['json', 'formatter', 'validator', 'beautify', 'minify', 'prettify'],
    icon: 'code',
    featured: true,
    popular: true,
    relatedTools: ['json-validator', 'json-minifier', 'json-to-csv'],
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
    content: {
      intro:
        'Use this JSON formatter to make valid JSON easier to read, inspect, and share. Paste JSON into the tool to format it with indentation, minify it, or check for basic syntax errors.',
      howToUse: [
        'Paste your JSON object, array, or value into the input area.',
        'Choose whether you want to beautify, minify, or validate the JSON.',
        'Review the formatted output or error message, then copy the result if needed.',
      ],
      example: {
        title: 'Formatting a compact API response',
        body:
          'A compact string like {"name":"Alex","active":true} can be expanded into readable, indented JSON so keys and values are easier to scan.',
      },
      logic: {
        title: 'What the formatter checks',
        body:
          'The tool parses the input as JSON. If parsing succeeds, it can output an indented version or a minified version. If parsing fails, it reports a basic syntax error from the browser JSON parser.',
      },
    },
    faqs: [
      {
        question: 'What counts as valid JSON?',
        answer: 'Valid JSON must use double quotes for strings, proper commas between items, and supported values such as objects, arrays, strings, numbers, booleans, and null.',
      },
      {
        question: 'Can this fix invalid JSON automatically?',
        answer: 'No. It can show that parsing failed, but you still need to correct the invalid syntax in the input.',
      },
      {
        question: 'Is formatted JSON sent anywhere?',
        answer: 'No. Formatting, minifying, and basic validation happen in your browser.',
      },
      {
        question: 'Can I minify JSON with this tool?',
        answer: 'Yes. Use the minify option to remove unnecessary whitespace and produce compact JSON for copying or production use.',
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
    shortDescription: 'Generate SHA-1, SHA-256, and SHA-512 hashes',
    description:
      'Generate SHA-1, SHA-256, and SHA-512 hashes from text. All processing happens client-side.',
    category: 'dev',
    tags: ['hash', 'md5', 'sha', 'sha256', 'sha512', 'crypto', 'checksum'],
    icon: 'shield',
    featured: false,
    popular: false,
    relatedTools: ['base64-encode', 'password-generator'],
    seo: {
      title: 'Hash Generator - Free SHA-1, SHA-256 and SHA-512 Generator',
      description:
        'Generate SHA-1, SHA-256, and SHA-512 hashes from any text. Free online hash generator with instant results.',
      keywords: ['hash generator', 'md5', 'sha-256', 'sha-512', 'checksum generator'],
    },
    ads: {
      enabled: false,
      positions: [],
    },
    faqs: [
      {
        question: 'What hash algorithms are supported?',
        answer: 'We support SHA-1, SHA-256, and SHA-512. SHA-256 is recommended for most general checksum use cases.',
      },
      {
        question: 'Is hashing done client-side?',
        answer: 'Yes. All hash computation happens in your browser using the Web Crypto API. Your input is never sent to any server.',
      },
      {
        question: 'What is the difference between these algorithms?',
        answer: 'Each algorithm produces a different hash length: SHA-1 (160-bit), SHA-256 (256-bit), and SHA-512 (512-bit). Longer hashes are more collision-resistant.',
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
    quickAnswer:
      'The Word Counter measures words, characters, sentences, paragraphs, and estimated reading time directly in your browser. Paste your text to get live writing stats for drafts, essays, articles, captions, and other content without uploading it.',
    category: 'text',
    tags: ['word counter', 'character counter', 'count words', 'reading time', 'text analysis'],
    icon: 'type',
    featured: false,
    popular: true,
    relatedTools: ['character-counter', 'case-converter', 'reading-speed-calculator'],
    seo: {
      title: 'Word Counter - Free Online Word & Character Counter',
      description:
        'Count words, characters, sentences, paragraphs, and reading time instantly. Free online word counter tool for writers and students.',
      keywords: ['word counter', 'character counter', 'count words', 'reading time', 'text analysis'],
    },
    ads: { enabled: false, positions: [] },
    content: {
      intro:
        'Use this word counter to measure the length of drafts, posts, essays, notes, and other text. It shows useful writing stats such as word count, character count, sentence count, paragraph count, and estimated reading time.',
      howToUse: [
        'Paste or type your text into the input area.',
        'Review the live counts for words, characters, sentences, paragraphs, and reading time.',
        'Edit the text and watch the numbers update as the content changes.',
      ],
      example: {
        title: 'Checking a short article draft',
        body:
          'If your draft has 800 words, the reading time estimate is about 4 minutes using the default 200 words per minute reading speed.',
      },
      logic: {
        title: 'How counts are estimated',
        body:
          'Words are counted from text separated by whitespace, characters can be shown with or without spaces, and reading time is estimated from the word count using an approximate reading speed of 200 words per minute.',
      },
    },
    faqs: [
      { question: 'Does the character count include spaces?', answer: 'The tool shows character counts with spaces and without spaces so you can use the number that matches your requirement.' },
      { question: 'How is reading time estimated?', answer: 'Reading time is calculated from the word count using an approximate speed of 200 words per minute.' },
      { question: 'How does punctuation affect the word count?', answer: 'Words are counted by splitting the text on whitespace. Punctuation attached to a word does not usually create a separate word.' },
      { question: 'Is the text processed locally?', answer: 'Yes. The counts are calculated in your browser, and the text is not sent to a server by this page.' },
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
    content: {
      intro:
        'Use this character counter to measure text length for posts, captions, titles, snippets, forms, and other writing with length limits.',
      howToUse: [
        'Paste or type your text into the input area.',
        'Check the live totals for characters, words, and lines.',
        'Edit the text until the counts fit your target length or platform limit.',
      ],
      example: {
        title: 'Checking a social caption',
        body:
          'If a caption needs to stay under a character limit, paste it into the counter and trim the text while watching the character total update.',
      },
      logic: {
        title: 'How text length is counted',
        body:
          'The tool counts characters in the full text, can distinguish counts with and without spaces, and also estimates words and lines based on whitespace and line breaks.',
      },
    },
    faqs: [
      { question: 'Does the counter include spaces?', answer: 'Yes. The tool can show character totals with spaces and without spaces.' },
      { question: 'How are lines counted?', answer: 'Lines are based on line breaks in the text, so each new line in the input adds to the line count.' },
      { question: 'Is my text stored anywhere?', answer: 'No. The text is processed in your browser and is not stored by this page.' },
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
    quickAnswer:
      'A URL encoder and decoder converts special characters into safe percent-encoded URL text and converts encoded URLs back to readable form. ClickBuildLabs runs the conversion in your browser for quick web, API, and query string debugging.',
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
      { question: 'Can I decode query strings with this tool?', answer: 'Yes. Paste an encoded URL or query string to convert percent-encoded characters back into readable text.' },
    ],
  },
  {
    slug: 'html-entity-encoder-decoder',
    name: 'HTML Entity Encoder / Decoder',
    shortDescription: 'Encode and decode HTML entities',
    description:
      'Convert special characters to HTML entities and decode HTML entities back to readable text. Essential for web development. Free and instant.',
    quickAnswer:
      'An HTML entity encoder converts reserved HTML characters like &, <, >, quotes, and spaces into entity text, then decodes common entities back into readable characters. ClickBuildLabs runs the conversion in your browser for everyday HTML, CMS, and debugging tasks.',
    category: 'dev',
    tags: ['html entities', 'encode html', 'decode html', 'entity encoder', 'special characters html'],
    icon: 'code',
    featured: false,
    popular: false,
    relatedTools: ['url-encoder-decoder', 'base64-encode', 'html-minifier'],
    seo: {
      title: 'HTML Entity Encoder / Decoder - Free Online HTML Encoding',
      description:
        'Encode and decode HTML entities instantly. Convert special characters to &amp; and &lt; HTML entity format.',
      keywords: ['html entities', 'encode html', 'decode html', 'entity encoder'],
    },
    ads: { enabled: false, positions: [] },
    content: {
      intro:
        'Use this HTML entity encoder and decoder to convert reserved HTML characters into safe entity text, or turn common entities back into readable characters when reviewing copied HTML, CMS content, snippets, or escaped text.',
      howToUse: [
        'Choose encode when you want characters such as &, <, >, quotes, or spaces represented as HTML entities.',
        'Choose decode when you want common HTML entities converted back into readable characters.',
        'Paste the text, review the converted result, and copy it when it matches what you need.',
      ],
      example: {
        title: 'Encoding text for an HTML snippet',
        body:
          'If you need to show <strong>Example</strong> as visible text instead of markup, encoding the angle brackets helps the browser display the characters rather than interpret them as HTML.',
      },
      logic: {
        title: 'Common entity conversion',
        body:
          'The tool maps common reserved characters to their HTML entity forms and reverses those mappings when decoding. It is useful for developers, content editors, CMS users, and debugging copied HTML or escaped text.',
      },
    },
    faqs: [
      { question: 'What are HTML entities?', answer: 'HTML entities are text codes such as &amp;, &lt;, and &gt; that represent reserved or special characters in HTML.' },
      { question: 'When should I encode HTML entities?', answer: 'Encode entities when you want to display characters like < or > as text instead of letting the browser treat them as HTML markup.' },
      { question: 'When should I decode HTML entities?', answer: 'Decode entities when copied HTML, CMS content, or escaped text contains entity codes and you want to read the original characters.' },
      { question: 'Is this a full HTML sanitizer?', answer: 'No. This tool is intended for common HTML entities and everyday encoding or decoding tasks. It is not a full HTML sanitizer or security tool.' },
      { question: 'Is my text sent to a server?', answer: 'No. The encoding and decoding run locally in your browser, so this page does not upload your text.' },
    ],
  },
  {
    slug: 'timestamp-converter',
    name: 'Timestamp Converter',
    shortDescription: 'Convert Unix timestamps to dates',
    description:
      'Convert Unix timestamps to human-readable dates and vice versa. Supports both seconds and milliseconds. Shows local time and UTC. Free and instant.',
    quickAnswer:
      'A timestamp converter changes Unix timestamps into readable dates and can convert dates back into timestamps. ClickBuildLabs supports seconds and milliseconds and shows both local time and UTC for debugging logs, APIs, and database values.',
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
      { question: 'Why does the same timestamp show different local times?', answer: 'The timestamp represents one UTC moment, but the local display changes based on your device time zone.' },
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
    relatedTools: ['discount-calculator', 'tip-calculator', 'vat-calculator'],
    seo: {
      title: 'Percentage Calculator - Calculate Percentages Online',
      description:
        'Calculate percentages instantly: find X% of Y, what percentage X is of Y, and percentage change. Free and simple.',
      keywords: ['percentage calculator', 'percent calculator', 'calculate percentage', 'percentage change'],
    },
    ads: { enabled: false, positions: [] },
    content: {
      intro:
        'Use this percentage calculator to find common percentage values quickly, such as a percent of a number, what percent one number is of another, or a simple percentage change.',
      howToUse: [
        'Choose the percentage calculation mode you need.',
        'Enter the numbers requested by that mode.',
        'Review the result and adjust the inputs if you want to compare another value.',
      ],
      example: {
        title: 'Finding 15% of a price',
        body:
          'If an item costs 80 and you want to find 15% of it, enter 15 as the percentage and 80 as the total. The result is 12.',
      },
      logic: {
        title: 'Basic percentage formulas',
        body:
          'For a percent of a number, the formula is X% of Y = Y x X / 100. To find what percent a part is of a whole, use Percentage = part / whole x 100.',
      },
    },
    faqs: [
      { question: 'How do I calculate X% of Y?', answer: 'Select the percent-of mode, enter the percentage as X and the total as Y, then calculate the result.' },
      { question: 'How do I find what percentage one number is of another?', answer: 'Use the part and whole values. The calculator divides the part by the whole and multiplies by 100.' },
      { question: 'Can this calculate percentage change?', answer: 'Yes. Use the percentage change mode when you want to compare an old value with a new value.' },
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
      'Validate JSON syntax and get parser error messages for invalid input. Free, fast, and 100% client-side.',
    category: 'dev',
    tags: ['json', 'validator', 'json validator', 'validate json', 'json syntax'],
    icon: 'check-circle',
    featured: false,
    popular: true,
    relatedTools: ['json-formatter', 'json-minifier'],
    seo: {
      title: 'JSON Validator - Free Online JSON Syntax Validator',
      description:
        'Validate JSON syntax instantly with parser error messages. Free online JSON validator for basic syntax checks.',
      keywords: ['json validator', 'validate json', 'json syntax checker', 'json error'],
    },
    ads: { enabled: false, positions: [] },
    content: {
      intro:
        'Use this JSON validator to check whether a JSON string can be parsed successfully. It helps catch common syntax mistakes before you paste JSON into code, configs, or API tools.',
      howToUse: [
        'Paste your JSON into the input area.',
        'Run validation to check whether the JSON can be parsed.',
        'If an error appears, review the message and fix the syntax in your input.',
      ],
      example: {
        title: 'Finding a missing comma',
        body:
          'If an object has two properties without a comma between them, validation fails and the error message helps you locate the part of the JSON that needs attention.',
      },
      logic: {
        title: 'What validation means here',
        body:
          'The validator checks whether the input can be parsed as JSON and reports basic syntax errors. It does not validate the data against a custom schema or business rules.',
      },
    },
    faqs: [
      { question: 'Does this validate against a JSON schema?', answer: 'No. This tool checks JSON syntax only and does not compare the data to a schema.' },
      { question: 'What errors can it catch?', answer: 'It can catch parse errors such as missing commas, unquoted keys, invalid strings, and extra trailing characters.' },
      { question: 'Does validation upload JSON data?', answer: 'No. Validation runs in your browser and does not upload JSON data from this page.' },
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
    quickAnswer:
      'A JWT decoder lets you inspect a JSON Web Token by showing its header, payload, and signature sections. ClickBuildLabs decodes JWTs in your browser for debugging, but it does not verify signatures or prove that a token is trustworthy.',
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
      { question: 'Can I use this with production tokens?', answer: 'Avoid pasting sensitive production tokens into any tool unless you understand the risk. This page decodes locally, but tokens can still contain private claims.' },
    ],
  },
  {
    slug: 'regex-tester',
    name: 'Regex Tester',
    shortDescription: 'Test regular expressions instantly',
    description:
      'Test regular expressions against sample text with real-time matching. Supports JavaScript regex syntax with flags.',
    quickAnswer:
      'A regex tester checks a regular expression against sample text and highlights matches. ClickBuildLabs uses JavaScript regular expression syntax, so it is useful for testing patterns, flags, and capture groups before using them in web code.',
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
      { question: 'Is my sample text uploaded?', answer: 'No. Pattern testing happens in your browser and the sample text is not uploaded by this page.' },
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
      'Calculate your age in years, months, and days from a birth date. See days until your next birthday.',
    category: 'calculators',
    tags: ['age calculator', 'calculate age', 'birthday calculator', 'age finder'],
    icon: 'calendar',
    featured: false,
    popular: true,
    relatedTools: ['date-difference-calculator', 'timestamp-converter', 'percentage-calculator'],
    seo: {
      title: 'Age Calculator - Calculate Age in Years, Months and Days',
      description: 'Calculate your age from a birth date. See years, months, days and days until your next birthday.',
      keywords: ['age calculator', 'calculate age', 'birthday calculator', 'age finder'],
    },
    ads: { enabled: false, positions: [] },
    content: {
      intro:
        'Use this age calculator to calculate age from a birth date and compare it with today.',
      howToUse: [
        'Enter the birth date you want to calculate from.',
        'Review the calculated age based on today.',
        'Read the age result in years, months, and days.',
      ],
      example: {
        title: 'Checking an age from a birthday',
        body:
          'If someone was born on May 10, 1995, enter that birth date to see their current age in years, months, and days.',
      },
      logic: {
        title: 'How age is calculated',
        body:
          'The calculator compares the birth date with today and works through calendar years, months, and days based on the dates entered. It is a practical date calculation, not legal, medical, or administrative advice.',
      },
    },
    faqs: [
      { question: 'Can I calculate age from any birth date?', answer: 'Yes. Enter a past birth date to calculate age from that date to today.' },
      { question: 'Does the calculator include months and days?', answer: 'Yes. The result shows years, months, and days based on the dates you enter.' },
      { question: 'Is my birth date stored?', answer: 'No. The calculation happens in your browser and the date is not stored by this page.' },
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
    content: {
      intro:
        'Use this loan calculator to estimate monthly payments, total repayment, and interest based on a loan amount, interest rate, and repayment term.',
      howToUse: [
        'Enter the loan amount, annual interest rate, and loan term.',
        'Run the calculation to estimate the monthly payment.',
        'Review the total paid and estimated interest to compare different scenarios.',
      ],
      example: {
        title: 'Estimating a monthly payment',
        body:
          'For a 10,000 loan over 5 years at a fixed annual rate, enter the amount, rate, and term to estimate the monthly payment and total interest.',
      },
      logic: {
        title: 'How loan payments are estimated',
        body:
          'The calculator uses a standard amortization approach where the annual rate is converted to a monthly rate and spread across the number of payments. Results are estimates for planning and are not financial advice or a promise of real bank terms.',
      },
    },
    faqs: [
      { question: 'How is the monthly payment estimated?', answer: 'It uses the loan amount, monthly interest rate, and number of payments to estimate a fixed monthly payment.' },
      { question: 'Is the interest rate annual?', answer: 'Yes. Enter the annual interest rate; the calculator converts it into a monthly rate for the payment estimate.' },
      { question: 'Is this financial advice?', answer: 'No. The results are estimates for informational purposes only and are not financial advice or a bank offer.' },
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
    relatedTools: ['timestamp-converter', 'time-zone-converter', 'time-duration-calculator'],
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
  {
    slug: 'percentage-change-calculator',
    name: 'Percentage Change Calculator',
    shortDescription: 'Calculate percentage change between two values',
    description:
      'Calculate the percentage change and absolute difference between an initial and final value. Shows whether it is an increase or decrease.',
    category: 'calculators',
    tags: ['percentage change', 'increase decrease', 'change calculator', 'percent change'],
    icon: 'percent',
    featured: false,
    popular: false,
    relatedTools: ['percentage-calculator', 'ratio-calculator', 'unit-rate-calculator'],
    seo: {
      title: 'Percentage Change Calculator - Free Online Percent Change Tool',
      description:
        'Calculate the percentage change and absolute difference between two values. Free online percentage change calculator.',
      keywords: ['percentage change calculator', 'percent change', 'increase decrease calculator', 'percentage difference'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How is percentage change calculated?', answer: 'Percentage change = ((final - initial) / initial) × 100%' },
      { question: 'What does a positive result mean?', answer: 'A positive result indicates an increase from the initial value.' },
      { question: 'Is my data sent to servers?', answer: 'No. All calculations happen locally in your browser.' },
    ],
  },
  {
    slug: 'ratio-calculator',
    name: 'Ratio Calculator',
    shortDescription: 'Simplify and calculate ratios',
    description:
      'Simplify ratios and calculate decimal equivalents. Enter two values to find the simplified ratio form.',
    category: 'calculators',
    tags: ['ratio calculator', 'simplify ratio', 'ratio finder', 'proportion calculator'],
    icon: 'divide',
    featured: false,
    popular: false,
    relatedTools: ['percentage-change-calculator', 'unit-rate-calculator', 'rule-of-three-calculator'],
    seo: {
      title: 'Ratio Calculator - Free Online Simplify Ratios Tool',
      description:
        'Simplify ratios and calculate decimal equivalents. Free online ratio calculator for math and proportions.',
      keywords: ['ratio calculator', 'simplify ratio', 'ratio finder', 'proportion calculator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How do you simplify a ratio?', answer: 'Divide both numbers by their greatest common divisor (GCD) to get the simplest form.' },
      { question: 'Can I use decimals?', answer: 'Yes. The calculator converts decimals to integers for simplification, then shows the decimal value.' },
      { question: 'Is my data sent to servers?', answer: 'No. All calculations happen locally in your browser.' },
    ],
  },
  {
    slug: 'price-per-unit-calculator',
    name: 'Price Per Unit Calculator',
    shortDescription: 'Calculate price per single unit',
    description:
      'Calculate the price per individual unit from a total price and quantity. Useful for comparing product prices.',
    category: 'calculators',
    tags: ['price per unit', 'unit price', 'per unit calculator', 'unit cost calculator'],
    icon: 'dollar-sign',
    featured: false,
    popular: false,
    relatedTools: ['split-bill-calculator', 'unit-rate-calculator', 'ratio-calculator'],
    seo: {
      title: 'Price Per Unit Calculator - Free Online Unit Price Calculator',
      description:
        'Calculate the price per individual unit from total price and quantity. Free online unit price calculator.',
      keywords: ['price per unit calculator', 'unit price', 'per unit calculator', 'unit cost'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'Why calculate price per unit?', answer: 'It helps compare products of different sizes to find the best value.' },
      { question: 'Can I use a custom unit?', answer: 'Yes. Enter any unit label like kg, oz, pcs, or liters.' },
      { question: 'Is my data sent to servers?', answer: 'No. All calculations happen locally in your browser.' },
    ],
  },
  {
    slug: 'split-bill-calculator',
    name: 'Split Bill Calculator',
    shortDescription: 'Divide a bill among multiple people',
    description:
      'Calculate how much each person pays when splitting a bill. Includes optional tip and tax calculations.',
    category: 'calculators',
    tags: ['split bill', 'divide bill', 'bill splitter', 'split check', 'per person'],
    icon: 'users',
    featured: false,
    popular: false,
    relatedTools: ['tip-calculator', 'price-per-unit-calculator', 'percentage-calculator'],
    seo: {
      title: 'Split Bill Calculator - Free Online Bill Splitter Tool',
      description:
        'Calculate how much each person pays when splitting a bill. Includes tip and tax options. Free bill splitter.',
      keywords: ['split bill calculator', 'bill splitter', 'divide bill', 'per person calculator', 'split check'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'Can I add tip percentage?', answer: 'Yes. Enter the tip percentage to include it in the total calculation.' },
      { question: 'What about tax?', answer: 'You can add a tax percentage as well. Both tip and tax are calculated on the original bill total.' },
      { question: 'Is my data sent to servers?', answer: 'No. All calculations happen locally in your browser.' },
    ],
  },
  {
    slug: 'simple-interest-calculator',
    name: 'Simple Interest Calculator',
    shortDescription: 'Calculate simple interest on a loan or investment',
    description:
      'Calculate simple interest earned or charged on a principal amount over a specified time period.',
    category: 'calculators',
    tags: ['simple interest', 'interest calculator', 'loan interest', 'investment interest'],
    icon: 'calculator',
    featured: false,
    popular: false,
    relatedTools: ['compound-interest-calculator', 'savings-goal-calculator', 'loan-calculator'],
    seo: {
      title: 'Simple Interest Calculator - Free Online Simple Interest Tool',
      description:
        'Calculate simple interest on a principal amount over time. Free online simple interest calculator.',
      keywords: ['simple interest calculator', 'interest calculator', 'loan interest', 'simple interest formula'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What is simple interest?', answer: 'Simple interest = Principal × Rate × Time. Interest is calculated only on the original amount.' },
      { question: 'What is the formula?', answer: 'Interest = P × r × t where P is principal, r is annual rate, t is time in years.' },
      { question: 'Is this financial advice?', answer: 'No. These calculations are estimates for informational purposes only.' },
    ],
  },
  {
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    shortDescription: 'Calculate compound interest with contributions',
    description:
      'Calculate compound interest with optional monthly contributions. Shows total value and interest earned over time.',
    category: 'calculators',
    tags: ['compound interest', 'compound savings', 'investment calculator', 'compound growth'],
    icon: 'trending-up',
    featured: false,
    popular: false,
    relatedTools: ['simple-interest-calculator', 'savings-goal-calculator', 'hourly-to-salary-calculator'],
    seo: {
      title: 'Compound Interest Calculator - Free Online Compound Interest Tool',
      description:
        'Calculate compound interest with optional monthly contributions. See future value and total interest earned.',
      keywords: ['compound interest calculator', 'compound savings', 'investment calculator', 'compound growth'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What is compound interest?', answer: 'Compound interest is interest on interest. Your money grows as interest is added to the principal.' },
      { question: 'How often is interest compounded?', answer: 'You can choose yearly or monthly compounding frequency.' },
      { question: 'Are results accurate?', answer: 'Results are estimates for informational purposes only and not financial advice.' },
    ],
  },
  {
    slug: 'savings-goal-calculator',
    name: 'Savings Goal Calculator',
    shortDescription: 'Calculate time to reach a savings goal',
    description:
      'Calculate how long it will take to reach your savings goal with an initial amount and monthly contributions.',
    category: 'calculators',
    tags: ['savings goal', 'savings calculator', 'financial goal', 'savings timeline'],
    icon: 'target',
    featured: false,
    popular: false,
    relatedTools: ['compound-interest-calculator', 'simple-interest-calculator', 'loan-calculator'],
    seo: {
      title: 'Savings Goal Calculator - Free Online Savings Timeline Calculator',
      description:
        'Calculate how long it will take to reach your savings goal. Enter target, initial savings, and monthly contribution.',
      keywords: ['savings goal calculator', 'savings timeline', 'financial goal', 'savings calculator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What if my monthly contribution is 0?', answer: 'The monthly contribution must be greater than 0 to reach a savings goal.' },
      { question: 'Is my initial savings considered?', answer: 'Yes. Any initial savings you have reduces the amount you need to save.' },
      { question: 'Is this financial advice?', answer: 'No. These calculations are estimates for informational purposes only.' },
    ],
  },
  {
    slug: 'hourly-to-salary-calculator',
    name: 'Hourly to Salary Calculator',
    shortDescription: 'Convert hourly rate to annual salary',
    description:
      'Convert an hourly wage to weekly, monthly, and annual salary estimates. Enter hourly rate, hours per week, and weeks per year.',
    category: 'calculators',
    tags: ['hourly to salary', 'salary calculator', 'wage calculator', 'annual salary', 'hourly wage'],
    icon: 'clock',
    featured: false,
    popular: false,
    relatedTools: ['salary-to-hourly-calculator', 'tip-calculator', 'percentage-calculator'],
    seo: {
      title: 'Hourly to Salary Calculator - Free Hourly to Annual Salary Converter',
      description:
        'Convert an hourly wage to weekly, monthly, and annual salary estimates. Free hourly to salary calculator.',
      keywords: ['hourly to salary calculator', 'wage to salary', 'annual salary calculator', 'hourly wage converter'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'Is this my actual take-home pay?', answer: 'No. These are gross estimates before taxes and deductions.' },
      { question: 'What defaults are used?', answer: 'Default is 40 hours per week and 52 weeks per year. You can adjust these.' },
      { question: 'Are results accurate?', answer: 'Results are estimates for informational purposes only.' },
    ],
  },
  {
    slug: 'salary-to-hourly-calculator',
    name: 'Salary to Hourly Calculator',
    shortDescription: 'Convert annual salary to hourly rate',
    description:
      'Convert an annual salary to an equivalent hourly rate. Enter salary, hours per week, and weeks per year.',
    category: 'calculators',
    tags: ['salary to hourly', 'hourly rate', 'salary calculator', 'wage calculator', 'annual salary'],
    icon: 'dollar-sign',
    featured: false,
    popular: false,
    relatedTools: ['hourly-to-salary-calculator', 'tip-calculator', 'percentage-calculator'],
    seo: {
      title: 'Salary to Hourly Calculator - Free Annual Salary to Hourly Rate Converter',
      description:
        'Convert an annual salary to an equivalent hourly rate. Free salary to hourly calculator.',
      keywords: ['salary to hourly calculator', 'hourly rate calculator', 'annual salary to hourly', 'wage converter'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'Is this my actual take-home rate?', answer: 'No. This is a gross estimate before taxes and deductions.' },
      { question: 'How is the hourly rate calculated?', answer: 'Hourly rate = Annual Salary / (Hours per Week × Weeks per Year)' },
      { question: 'Are results accurate?', answer: 'Results are estimates for informational purposes only.' },
    ],
  },
  {
    slug: 'unit-rate-calculator',
    name: 'Unit Rate Calculator',
    shortDescription: 'Calculate rate per single unit',
    description:
      'Calculate the rate per one unit from two quantities. Useful for prices, speeds, productivity, and more.',
    category: 'calculators',
    tags: ['unit rate', 'rate calculator', 'per unit', 'price per', 'rate per'],
    icon: 'hash',
    featured: false,
    popular: false,
    relatedTools: ['price-per-unit-calculator', 'ratio-calculator', 'percentage-change-calculator'],
    seo: {
      title: 'Unit Rate Calculator - Free Online Rate Per Unit Calculator',
      description:
        'Calculate the rate per one unit from two quantities. Free unit rate calculator for prices, speeds, and productivity.',
      keywords: ['unit rate calculator', 'rate per unit', 'per unit calculator', 'price per', 'rate calculator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What is a unit rate?', answer: 'A unit rate shows how much of something per one unit of something else (e.g., price per kg, speed per hour).' },
      { question: 'What can I use this for?', answer: 'Compare prices, speeds, productivity, calories, and any other per-unit measurements.' },
      { question: 'Is my data sent to servers?', answer: 'No. All calculations happen locally in your browser.' },
    ],
  },
  {
    slug: 'gpa-calculator',
    name: 'GPA Calculator',
    shortDescription: 'Calculate Grade Point Average',
    description:
      'Calculate your GPA from course grades and credit hours. Supports both 4.0 and 4.3 scales. Free, fast, and client-side.',
    category: 'calculators',
    tags: ['gpa calculator', 'grade point average', 'calculate gpa', 'gpa', 'academic calculator'],
    icon: 'graduation-cap',
    featured: false,
    popular: true,
    relatedTools: ['grade-calculator', 'percentage-calculator', 'average-calculator'],
    seo: {
      title: 'GPA Calculator - Free Online Grade Point Average Calculator',
      description:
        'Calculate your GPA from grades and credit hours. Supports 4.0 and 4.3 scales. Free online GPA calculator.',
      keywords: ['gpa calculator', 'grade point average', 'calculate gpa', 'academic gpa', 'college gpa'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What GPA scales are supported?', answer: 'We support both the standard 4.0 scale and the 4.3 scale (where A+ = 4.3).' },
      { question: 'How is GPA calculated?', answer: 'GPA = Sum of (Grade Points × Credit Hours) / Total Credit Hours.' },
      { question: 'Is this calculation official?', answer: 'No. This tool provides estimates only. Your institution official GPA may differ.' },
    ],
  },
  {
    slug: 'grade-calculator',
    name: 'Grade Calculator',
    shortDescription: 'Calculate weighted grades and needed scores',
    description:
      'Calculate your current grade from weighted assessments and see what score you need on remaining work to reach a target grade.',
    category: 'calculators',
    tags: ['grade calculator', 'weighted grade', 'grade average', 'final grade', 'academic calculator'],
    icon: 'file-text',
    featured: false,
    popular: false,
    relatedTools: ['gpa-calculator', 'percentage-calculator', 'average-calculator'],
    seo: {
      title: 'Grade Calculator - Free Online Weighted Grade Calculator',
      description:
        'Calculate your current weighted grade and see what you need on remaining assessments to reach your target grade.',
      keywords: ['grade calculator', 'weighted grade', 'final grade calculator', 'academic calculator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How are weighted grades calculated?', answer: 'Each assessment contributes proportionally to your final grade based on its weight percentage.' },
      { question: 'Can I see what I need on remaining work?', answer: 'Yes. Enter your target grade and the calculator will show the average needed on remaining assessments.' },
      { question: 'Is this for any grading system?', answer: 'Yes. Enter your scores as percentages and weights as percentages of your total grade.' },
    ],
  },
  {
    slug: 'scientific-calculator',
    name: 'Scientific Calculator',
    shortDescription: 'Advanced calculator with trigonometry and functions',
    description:
      'A full-featured scientific calculator with trigonometric functions, logarithms, exponents, memory, and parentheses. Free and client-side.',
    category: 'calculators',
    tags: ['scientific calculator', 'trigonometry', 'logarithm', 'exponent', 'math calculator'],
    icon: 'calculator',
    featured: false,
    popular: true,
    relatedTools: ['fraction-calculator', 'equation-solver', 'percentage-calculator'],
    seo: {
      title: 'Scientific Calculator - Free Online Trigonometry and Logarithm Calculator',
      description:
        'Advanced scientific calculator with sin, cos, tan, log, ln, sqrt, exponents, and more. Free online calculator.',
      keywords: ['scientific calculator', 'trigonometry calculator', 'logarithm calculator', 'math calculator', 'online calculator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What functions are available?', answer: 'Trigonometric (sin, cos, tan), logarithms (log, ln), roots (sqrt), exponents (x²), absolute value (abs), and exponential (exp).' },
      { question: 'Does it use degrees or radians?', answer: 'Trigonometric functions use degrees by default.' },
      { question: 'Can I use memory?', answer: 'Yes. MC, MR, M+, and M- buttons let you store and recall numbers.' },
    ],
  },
  {
    slug: 'fraction-calculator',
    name: 'Fraction Calculator',
    shortDescription: 'Add, subtract, multiply, and divide fractions',
    description:
      'Perform arithmetic operations on fractions with automatic simplification. Add, subtract, multiply, divide, and convert to decimals.',
    category: 'calculators',
    tags: ['fraction calculator', 'add fractions', 'subtract fractions', 'multiply fractions', 'divide fractions'],
    icon: 'divide',
    featured: false,
    popular: false,
    relatedTools: ['scientific-calculator', 'percentage-calculator', 'equation-solver'],
    seo: {
      title: 'Fraction Calculator - Free Online Add Subtract Multiply Divide Fractions',
      description:
        'Add, subtract, multiply, and divide fractions instantly with automatic simplification. Free online fraction calculator.',
      keywords: ['fraction calculator', 'add fractions', 'subtract fractions', 'multiply fractions', 'divide fractions'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What operations are supported?', answer: 'Addition, subtraction, multiplication, and division of two fractions.' },
      { question: 'Are results simplified?', answer: 'Yes. Results are automatically simplified to their simplest form.' },
      { question: 'Can I see the decimal equivalent?', answer: 'Yes. The decimal equivalent is shown along with the fraction result.' },
    ],
  },
  {
    slug: 'number-base-converter',
    name: 'Number Base Converter',
    shortDescription: 'Convert between binary, octal, decimal, and hexadecimal',
    description:
      'Convert numbers between binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16). Shows decimal equivalent.',
    category: 'calculators',
    tags: ['number base converter', 'binary converter', 'hexadecimal converter', 'base converter', 'binary to decimal'],
    icon: 'hash',
    featured: false,
    popular: false,
    relatedTools: ['scientific-calculator', 'equation-solver', 'percentage-calculator'],
    seo: {
      title: 'Number Base Converter - Free Binary Octal Decimal Hexadecimal Converter',
      description:
        'Convert between binary, octal, decimal, and hexadecimal number systems. Free online base converter.',
      keywords: ['number base converter', 'binary converter', 'hexadecimal converter', 'base conversion', 'decimal to binary'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What bases are supported?', answer: 'Binary (2), Octal (8), Decimal (10), and Hexadecimal (16).' },
      { question: 'What characters does hexadecimal use?', answer: 'Hexadecimal uses 0-9 and A-F (e.g., A = 10, F = 15).' },
      { question: 'Is my data sent to servers?', answer: 'No. All conversions happen locally in your browser.' },
    ],
  },
  {
    slug: 'equation-solver',
    name: 'Equation Solver',
    shortDescription: 'Solve linear and quadratic equations',
    description:
      'Solve linear equations (ax + b = c) and quadratic equations (ax² + bx + c = 0). Shows step-by-step solution.',
    category: 'calculators',
    tags: ['equation solver', 'solve equation', 'linear equation', 'quadratic equation', 'algebra solver'],
    icon: 'x-circle',
    featured: false,
    popular: false,
    relatedTools: ['scientific-calculator', 'fraction-calculator', 'percentage-calculator'],
    seo: {
      title: 'Equation Solver - Free Online Linear and Quadratic Equation Solver',
      description:
        'Solve linear and quadratic equations instantly with step-by-step solutions. Free online equation solver.',
      keywords: ['equation solver', 'solve equation', 'linear equation solver', 'quadratic equation solver', 'algebra calculator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What equations can it solve?', answer: 'Linear equations (ax + b = c) and quadratic equations (ax² + bx + c = 0).' },
      { question: 'Does it show steps?', answer: 'Yes. The solution shows step-by-step breakdown of how to solve the equation.' },
      { question: 'What if there are no real solutions?', answer: 'For quadratics with negative discriminant, complex solutions are shown (e.g., 2 + 3i).' },
    ],
  },
  {
    slug: 'final-grade-calculator',
    name: 'Final Grade Calculator',
    shortDescription: 'Calculate what you need on your final exam',
    description:
      'Calculate the score you need on your final exam to achieve your desired overall grade. Enter current grade, target grade, and final exam weight.',
    category: 'calculators',
    tags: ['final grade calculator', 'final exam score', 'what do I need', 'target grade', 'final exam calculator'],
    icon: 'target',
    featured: false,
    popular: true,
    relatedTools: ['grade-calculator', 'percentage-grade-calculator', 'gpa-calculator'],
    seo: {
      title: 'Final Grade Calculator - Free Online What Do I Need on My Final Calculator',
      description:
        'Calculate what score you need on your final exam to achieve your target grade. Free online final grade calculator.',
      keywords: ['final grade calculator', 'what do I need on my final', 'final exam score calculator', 'target grade calculator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How is the needed final score calculated?', answer: 'The formula is: Needed = (Target - Current×(1-Weight)) / Weight.' },
      { question: 'What if I need more than 100%?', answer: 'If you need over 100%, the target grade is not achievable with a perfect final exam score.' },
      { question: 'Is this official academic advice?', answer: 'No. This is an estimation tool for planning purposes only.' },
    ],
  },
  {
    slug: 'percentage-grade-calculator',
    name: 'Percentage Grade Calculator',
    shortDescription: 'Convert points to percentage and letter grade',
    description:
      'Calculate your percentage score from points earned versus points total. Shows percentage and estimated letter grade.',
    category: 'calculators',
    tags: ['percentage grade', 'points to percentage', 'grade calculator', 'score percentage', 'letter grade'],
    icon: 'percent',
    featured: false,
    popular: false,
    relatedTools: ['grade-calculator', 'final-grade-calculator', 'average-calculator'],
    seo: {
      title: 'Percentage Grade Calculator - Free Points to Percentage Converter',
      description:
        'Convert points earned and total points to percentage score with letter grade. Free online percentage grade calculator.',
      keywords: ['percentage grade calculator', 'points to percentage', 'grade calculator', 'score percentage'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How is the percentage calculated?', answer: 'Percentage = (Points Earned / Points Total) × 100.' },
      { question: 'What letter grade scale is used?', answer: 'Standard A-F scale where A+ is 97%+, A is 93-96%, A- is 90-92%, and so on.' },
      { question: 'Can I use decimals?', answer: 'Yes. Both points earned and total can be decimal numbers.' },
    ],
  },
  {
    slug: 'study-time-calculator',
    name: 'Study Time Calculator',
    shortDescription: 'Plan your study schedule',
    description:
      'Plan how many hours per day you need to study based on total hours needed and days available. Helps with study planning.',
    quickAnswer:
      'A study time calculator helps estimate how much study time you need and break it into a practical daily plan. Enter your total study goal and either the days available or hours per day to see a simple study estimate you can adjust around your pace, breaks, and deadline.',
    category: 'calculators',
    tags: ['study time calculator', 'study planning', 'hours per day', 'study schedule', 'learning planner'],
    icon: 'clock',
    featured: false,
    popular: false,
    relatedTools: ['reading-speed-calculator', 'gpa-calculator', 'days-until-calculator'],
    seo: {
      title: 'Study Time Calculator - Free Online Study Planning Calculator',
      description:
        'Calculate how many hours per day you need to study. Free online study time planning calculator.',
      keywords: ['study time calculator', 'study planning', 'hours per day', 'study schedule planner'],
    },
    ads: { enabled: false, positions: [] },
    content: {
      intro:
        'Use this study time calculator to turn a total study goal into a simple daily plan for an exam, course, deadline, or project.',
      howToUse: [
        'Enter the total number of study hours you think the work will take.',
        'Add the number of days available to calculate hours per day, or enter hours per day to estimate how many days you need.',
        'Review the result and adjust it for topic difficulty, breaks, revision time, and your personal pace.',
      ],
      example: {
        title: 'Planning before an exam',
        body:
          'If you estimate that exam preparation needs 30 hours and you have 10 days left, the calculator gives a simple daily target so you can spread the work instead of guessing each day.',
      },
      logic: {
        title: 'How the estimate is calculated',
        body:
          'The calculator divides total study hours by days available, or divides total hours by your preferred daily study time. The result is a planning estimate, not a guarantee, so it should be adjusted for harder material, rest, and review sessions.',
      },
    },
    faqs: [
      { question: 'How is the calculation done?', answer: 'If you enter days available, it calculates hours/day = Total Hours / Days.' },
      { question: 'Can I set a specific hours per day?', answer: 'Yes. Enter hours per day to see how many days you need.' },
      { question: 'Is this for any subject?', answer: 'Yes. Enter your total study hours goal regardless of subject.' },
      { question: 'Are the study hours exact?', answer: 'No. The result is an estimate for planning. You may need more or less time depending on the subject difficulty, your pace, breaks, and how much review you need.' },
      { question: 'Should I include breaks in my study plan?', answer: 'Yes. If you want a realistic schedule, include break time, review time, and buffer time when choosing your total study hours or daily study target.' },
    ],
  },
  {
    slug: 'reading-speed-calculator',
    name: 'Reading Speed Calculator',
    shortDescription: 'Calculate words per minute and reading time',
    description:
      'Calculate your reading speed in words per minute (WPM) and estimate how long it will take to read any text.',
    category: 'calculators',
    tags: ['reading speed calculator', 'words per minute', 'wpm', 'reading time', 'reading speed test'],
    icon: 'book-open',
    featured: false,
    popular: false,
    relatedTools: ['essay-word-count-planner', 'study-time-calculator', 'word-counter'],
    seo: {
      title: 'Reading Speed Calculator - Free Words Per Minute (WPM) Calculator',
      description:
        'Calculate your reading speed in WPM and estimate reading time for any text. Free online reading speed calculator.',
      keywords: ['reading speed calculator', 'words per minute', 'wpm calculator', 'reading time calculator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How is WPM calculated?', answer: 'WPM = Words Read / Minutes spent reading.' },
      { question: 'What is a good reading speed?', answer: 'Average adult reading speed is 200-250 WPM. Fast readers reach 300+ WPM.' },
      { question: 'Can I estimate time for a specific book?', answer: 'Yes. Enter the word count of any text to estimate reading time based on your speed.' },
    ],
  },
  {
    slug: 'essay-word-count-planner',
    name: 'Essay Word Count Planner',
    shortDescription: 'Plan word count distribution for essays',
    description:
      'Plan how to distribute your target word count across essay sections like introduction, body paragraphs, and conclusion.',
    category: 'calculators',
    tags: ['essay word count', 'word count planner', 'essay planning', 'word count distribution', 'essay structure'],
    icon: 'file-text',
    featured: false,
    popular: false,
    relatedTools: ['reading-speed-calculator', 'word-counter', 'study-time-calculator'],
    seo: {
      title: 'Essay Word Count Planner - Free Word Count Distribution Calculator',
      description:
        'Plan your essay word count distribution across sections. Free online word count planner for essays.',
      keywords: ['essay word count planner', 'word count distribution', 'essay planning', 'word count calculator', 'essay structure'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'Can I customize section distribution?', answer: 'Yes. Switch to custom mode to enter different word counts for each section.' },
      { question: 'What sections are included?', answer: 'Introduction, 3 Body Paragraphs, and Conclusion by default.' },
      { question: 'Can I add more sections?', answer: 'The equal distribution splits evenly. For custom sections, enter your own values.' },
    ],
  },
  {
    slug: 'multiplication-table-generator',
    name: 'Multiplication Table Generator',
    shortDescription: 'Generate multiplication tables',
    description:
      'Generate multiplication tables for any number from 1 to any range. Useful for learning and practicing multiplication.',
    category: 'calculators',
    tags: ['multiplication table', 'times table', 'multiply', 'math tables', 'multiplication practice'],
    icon: 'grid',
    featured: false,
    popular: true,
    relatedTools: ['prime-number-checker', 'equation-solver', 'scientific-calculator'],
    seo: {
      title: 'Multiplication Table Generator - Free Online Times Table Generator',
      description:
        'Generate multiplication tables for any number. Free online times table generator for learning.',
      keywords: ['multiplication table generator', 'times table', 'multiply table', 'multiplication practice', 'math tables'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What numbers can I generate tables for?', answer: 'Any positive integer. For very large numbers, the table may be long.' },
      { question: 'What range can I set?', answer: 'Set any range from 1 to 100 or more. Default is 1 to 10.' },
      { question: 'Can I copy the table?', answer: 'Yes. Click the Copy button to copy the entire table to clipboard.' },
    ],
  },
  {
    slug: 'prime-number-checker',
    name: 'Prime Number Checker',
    shortDescription: 'Check if a number is prime',
    description:
      'Check if any number is prime or composite. Shows divisors if not prime. Handles 0, 1, and negative numbers correctly.',
    category: 'calculators',
    tags: ['prime number', 'prime checker', 'is prime', 'prime factorization', 'composite number'],
    icon: 'hash',
    featured: false,
    popular: true,
    relatedTools: ['multiplication-table-generator', 'equation-solver', 'scientific-calculator'],
    seo: {
      title: 'Prime Number Checker - Free Online Is Prime Calculator',
      description:
        'Check if a number is prime or composite. Shows divisors for composite numbers. Free online prime checker.',
      keywords: ['prime number checker', 'is prime', 'prime number calculator', 'prime factorization'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What is a prime number?', answer: 'A prime number is greater than 1 with no divisors other than 1 and itself.' },
      { question: 'Does it handle 0 and 1?', answer: 'Yes. 0 and 1 are correctly identified as not prime by definition.' },
      { question: 'Does it show all divisors?', answer: 'It shows sample divisors up to half the number, not the complete factorization.' },
    ],
  },
  {
    slug: 'roman-numeral-converter',
    name: 'Roman Numeral Converter',
    shortDescription: 'Convert between Roman and Arabic numerals',
    description:
      'Convert Roman numerals to Arabic numbers and vice versa. Supports numbers from 1 to 3999 with validation.',
    category: 'calculators',
    tags: ['roman numerals', 'roman numeral converter', 'arabic to roman', 'roman numbers', 'roman converter'],
    icon: 'type',
    featured: false,
    popular: false,
    relatedTools: ['number-base-converter', 'percentage-grade-calculator', 'equation-solver'],
    seo: {
      title: 'Roman Numeral Converter - Free Online Roman to Arabic Converter',
      description:
        'Convert between Roman numerals (I, V, X, L, C, D, M) and Arabic numbers. Free online Roman numeral converter.',
      keywords: ['roman numeral converter', 'roman to arabic', 'arabic to roman', 'roman numbers converter'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What range of numbers is supported?', answer: 'Roman numerals from 1 (I) to 3999 (MMMCMXCIX).' },
      { question: 'Can I convert in both directions?', answer: 'Yes. Select Number to Roman or Roman to Number mode.' },
      { question: 'What if I enter an invalid Roman numeral?', answer: 'The tool shows an error message for invalid Roman numeral format.' },
    ],
  },
  {
    slug: 'percentage-error-calculator',
    name: 'Percentage Error Calculator',
    shortDescription: 'Calculate experimental error percentage',
    description:
      'Calculate absolute error and percentage error between experimental and theoretical values. Used in science experiments.',
    category: 'calculators',
    tags: ['percentage error', 'absolute error', 'experimental error', 'measurement error', 'science calculator'],
    icon: 'alert-triangle',
    featured: false,
    popular: false,
    relatedTools: ['percentage-calculator', 'percentage-grade-calculator', 'scientific-calculator'],
    seo: {
      title: 'Percentage Error Calculator - Free Online Experimental Error Calculator',
      description:
        'Calculate absolute error and percentage error between measured and theoretical values. Free online percentage error calculator.',
      keywords: ['percentage error calculator', 'absolute error', 'experimental error', 'measurement error', 'science calculator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How is percentage error calculated?', answer: 'Percent Error = |Experimental - Theoretical| / |Theoretical| × 100%.' },
      { question: 'What is absolute error?', answer: 'Absolute error is the absolute difference between experimental and theoretical values.' },
      { question: 'When is this used?', answer: 'Commonly used in physics and chemistry to compare measured results to accepted values.' },
    ],
  },
  {
    slug: 'unit-circle-helper',
    name: 'Unit Circle Helper',
    shortDescription: 'Find sin, cos, tan for common angles',
    description:
      'Select common angles on the unit circle to see exact values for sin, cos, and tan. Shows radians and clarifies undefined values.',
    category: 'calculators',
    tags: ['unit circle', 'trigonometry', 'sin cos tan', 'unit circle calculator', 'radians'],
    icon: 'circle',
    featured: false,
    popular: false,
    relatedTools: ['scientific-calculator', 'percentage-calculator', 'equation-solver'],
    seo: {
      title: 'Unit Circle Helper - Free Online Trigonometry Values Calculator',
      description:
        'Get exact sin, cos, tan values for common angles on the unit circle. Shows radians and undefined values.',
      keywords: ['unit circle helper', 'trigonometry calculator', 'sin cos tan table', 'unit circle values', 'radians to degrees'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What angles are included?', answer: '0°, 30°, 45°, 60°, 90°, 120°, 135°, 150°, 180°, 210°, 225°, 240°, 270°, 300°, 315°, 330°, 360°.' },
      { question: 'Why is tan sometimes undefined?', answer: 'Tangent is sin/cos. When cos is 0 (at 90° and 270°), tan is undefined (division by zero).' },
      { question: 'Are the values exact?', answer: 'Yes. For common angles, values are shown in exact form like √3/2 or 1/2.' },
    ],
  },
  {
    slug: 'remove-duplicate-lines',
    name: 'Remove Duplicate Lines',
    shortDescription: 'Remove duplicate lines from text',
    description:
      'Remove duplicate lines from text. Keep first or last occurrence, optional case-sensitive matching. Shows count of removed duplicates.',
    category: 'text',
    tags: ['remove duplicate lines', 'dedupe', 'unique lines', 'text cleanup', 'duplicate remover'],
    icon: 'file-text',
    featured: false,
    popular: true,
    relatedTools: ['sort-lines', 'remove-empty-lines', 'word-counter'],
    seo: {
      title: 'Remove Duplicate Lines - Free Online Duplicate Line Remover',
      description:
        'Remove duplicate lines from any text instantly. Keep first occurrence, case-sensitive option. Free online tool.',
      keywords: ['remove duplicate lines', 'dedupe text', 'unique lines', 'remove duplicates', 'text cleaner'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How does it work?', answer: 'Each line is compared with others. Duplicates are removed while keeping the first occurrence.' },
      { question: 'Is the order preserved?', answer: 'Yes. The first occurrence of each line is kept in its original position.' },
      { question: 'Can I make it case-insensitive?', answer: 'Yes. Check the case-sensitive option to treat "Hello" and "HELLO" as different lines.' },
    ],
  },
  {
    slug: 'sort-lines',
    name: 'Sort Lines',
    shortDescription: 'Sort lines alphabetically or reverse',
    description:
      'Sort lines in alphabetical order A-Z or reverse Z-A. Optional case-insensitive sorting. Quick and easy.',
    category: 'text',
    tags: ['sort lines', 'alphabetize', 'sort text', 'order lines', 'sort alphabetically'],
    icon: 'arrow-up-down',
    featured: false,
    popular: true,
    relatedTools: ['remove-duplicate-lines', 'reverse-text', 'case-converter'],
    seo: {
      title: 'Sort Lines - Free Online Line Sorter A-Z Z-A',
      description:
        'Sort lines alphabetically A-Z or reverse Z-A. Case-insensitive option available. Free online text sorter.',
      keywords: ['sort lines', 'alphabetize lines', 'sort text', 'order lines', 'sort alphabetically'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'Can I sort in reverse order?', answer: 'Yes. Click Z-A button to sort in reverse alphabetical order.' },
      { question: 'What happens to empty lines?', answer: 'Empty lines are filtered out before sorting.' },
      { question: 'Is it case-sensitive?', answer: 'By default it ignores case. Check the option if you need case-sensitive sorting.' },
    ],
  },
  {
    slug: 'reverse-text',
    name: 'Reverse Text',
    shortDescription: 'Reverse text characters or line order',
    description:
      'Reverse text characters, line order, or both. Three modes: reverse all characters, reverse line order, or both combined.',
    category: 'text',
    tags: ['reverse text', 'flip text', 'mirror text', 'text reversal', 'backwards text'],
    icon: 'arrow-left-right',
    featured: false,
    popular: false,
    relatedTools: ['sort-lines', 'case-converter', 'remove-duplicate-lines'],
    seo: {
      title: 'Reverse Text - Free Online Text Reverser Tool',
      description:
        'Reverse text characters or line order. Three modes available. Free online text reverser.',
      keywords: ['reverse text', 'flip text', 'mirror text', 'backwards text', 'text reverser'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What does "reverse all" do?', answer: 'It reverses every character. "Hello" becomes "olleH".' },
      { question: 'What does "reverse line order" do?', answer: 'It reverses which line comes first. Line 1 becomes last, last becomes first.' },
      { question: 'What does "reverse both" do?', answer: 'Each line\'s characters are reversed, AND the lines are reversed in order.' },
    ],
  },
  {
    slug: 'remove-empty-lines',
    name: 'Remove Empty Lines',
    shortDescription: 'Remove blank and empty lines',
    description:
      'Remove empty lines and blank lines from text. Optional whitespace trimming on remaining lines.',
    category: 'text',
    tags: ['remove empty lines', 'remove blank lines', 'cleanup text', 'remove newlines', 'text cleanup'],
    icon: 'trash',
    featured: false,
    popular: false,
    relatedTools: ['trim-lines', 'remove-duplicate-lines', 'sort-lines'],
    seo: {
      title: 'Remove Empty Lines - Free Online Blank Line Remover',
      description:
        'Remove empty and blank lines from text. Optional whitespace trimming. Free online tool.',
      keywords: ['remove empty lines', 'remove blank lines', 'text cleanup', 'delete empty lines'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'Does it remove lines with only spaces?', answer: 'Yes. If you check the trim option, lines with only whitespace are treated as empty.' },
      { question: 'Can I keep the trim option off?', answer: 'Yes. By default, only truly empty lines are removed.' },
      { question: 'Does it modify the original text otherwise?', answer: 'No. All non-empty lines remain unchanged except for optional trimming.' },
    ],
  },
  {
    slug: 'trim-lines',
    name: 'Trim Lines',
    shortDescription: 'Remove leading and trailing whitespace',
    description:
      'Remove leading and trailing whitespace from each line. Optional collapse of multiple internal spaces.',
    category: 'text',
    tags: ['trim lines', 'remove whitespace', 'clean text', 'strip spaces', 'text cleanup'],
    icon: 'scissors',
    featured: false,
    popular: false,
    relatedTools: ['remove-empty-lines', 'case-converter', 'remove-duplicate-lines'],
    seo: {
      title: 'Trim Lines - Free Online Whitespace Remover',
      description:
        'Remove leading and trailing spaces from each line. Optional multiple space collapsing. Free online tool.',
      keywords: ['trim lines', 'remove whitespace', 'clean text', 'strip spaces', 'text trimmer'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What does trimming do?', answer: 'It removes spaces and tabs from the beginning and end of each line.' },
      { question: 'What is space collapsing?', answer: 'Checking this option replaces multiple spaces between words with a single space.' },
      { question: 'Does it affect internal single spaces?', answer: 'No. Only the collapse option modifies internal spaces.' },
    ],
  },
  {
    slug: 'text-repeater',
    name: 'Text Repeater',
    shortDescription: 'Repeat text multiple times',
    description:
      'Repeat any text a specified number of times with optional separator between repetitions.',
    category: 'text',
    tags: ['text repeater', 'repeat text', 'duplicate text', 'text generator', 'repeat characters'],
    icon: 'copy',
    featured: false,
    popular: false,
    relatedTools: ['remove-duplicate-lines', 'prefix-suffix-lines', 'lorem-ipsum'],
    seo: {
      title: 'Text Repeater - Free Online Text Repetition Generator',
      description:
        'Repeat text multiple times with optional separator. Free online text repeater tool.',
      keywords: ['text repeater', 'repeat text', 'duplicate text', 'text generator', 'repeat characters'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How many repetitions are allowed?', answer: 'Maximum 1000 repetitions to prevent browser overload.' },
      { question: 'What is the separator for?', answer: 'A separator is added between each repetition. Use a newline to stack text vertically.' },
      { question: 'Can I repeat multiple lines?', answer: 'Yes. The entire input text is treated as one unit for repetition.' },
    ],
  },
  {
    slug: 'prefix-suffix-lines',
    name: 'Prefix Suffix Lines',
    shortDescription: 'Add prefix or suffix to each line',
    description:
      'Add a prefix, suffix, or both to every line in your text. Useful for code comments, bullet points, and list formatting.',
    category: 'text',
    tags: ['prefix suffix', 'add prefix', 'add suffix', 'line prefix', 'line suffix', 'format lines'],
    icon: 'plus',
    featured: false,
    popular: false,
    relatedTools: ['trim-lines', 'remove-empty-lines', 'text-repeater'],
    seo: {
      title: 'Prefix Suffix Lines - Free Online Add Prefix Suffix Tool',
      description:
        'Add prefix and suffix to each line. Useful for bullet points, code comments, and list formatting. Free online tool.',
      keywords: ['prefix suffix lines', 'add prefix', 'add suffix', 'line prefix', 'format lines', 'bullet points'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'Can I add both prefix and suffix?', answer: 'Yes. Enter values in both fields to add prefix and suffix simultaneously.' },
      { question: 'What are some common uses?', answer: 'Adding "- " for bullet points, "// " for code comments, or ", " for CSV formatting.' },
      { question: 'Can I skip empty lines?', answer: 'Yes. Check the "Skip empty lines" option to leave blank lines unchanged.' },
    ],
  },
  {
    slug: 'extract-emails',
    name: 'Extract Emails',
    shortDescription: 'Extract email addresses from text',
    description:
      'Find and extract all email addresses from any text. Automatically removes duplicates and shows count.',
    category: 'text',
    tags: ['extract emails', 'find emails', 'email extractor', 'email scraper', 'parse emails'],
    icon: 'mail',
    featured: false,
    popular: true,
    relatedTools: ['extract-urls', 'remove-duplicate-lines', 'word-counter'],
    seo: {
      title: 'Extract Emails - Free Online Email Address Extractor',
      description:
        'Extract all email addresses from text. Shows unique emails only with duplicate removal. Free online tool.',
      keywords: ['extract emails', 'find emails', 'email extractor', 'email parser', 'find email addresses'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'Does it find partial emails?', answer: 'No. Only properly formatted email addresses matching standard format are extracted.' },
      { question: 'Are duplicates removed?', answer: 'Yes. If the same email appears multiple times, it is shown only once.' },
      { question: 'Can I copy the results?', answer: 'Yes. Click the Copy button to copy all emails as a newline-separated list.' },
    ],
  },
  {
    slug: 'extract-urls',
    name: 'Extract URLs',
    shortDescription: 'Extract URLs from text',
    description:
      'Find and extract all HTTP and HTTPS URLs from any text. Automatically removes duplicate URLs.',
    category: 'text',
    tags: ['extract urls', 'find urls', 'url extractor', 'link finder', 'parse urls'],
    icon: 'link',
    featured: false,
    popular: true,
    relatedTools: ['extract-emails', 'remove-duplicate-lines', 'word-counter'],
    seo: {
      title: 'Extract URLs - Free Online URL Extractor',
      description:
        'Extract all HTTP and HTTPS URLs from any text. Removes duplicates automatically. Free online tool.',
      keywords: ['extract urls', 'find urls', 'url extractor', 'link finder', 'parse urls'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What URL formats are supported?', answer: 'HTTP and HTTPS URLs starting with http:// or https:// are extracted.' },
      { question: 'Are duplicate URLs removed?', answer: 'Yes. Each URL is shown only once even if it appears multiple times in the text.' },
      { question: 'Can I copy the results?', answer: 'Yes. Click Copy to get all URLs as a newline-separated list.' },
    ],
  },
  {
    slug: 'word-frequency-counter',
    name: 'Word Frequency Counter',
    shortDescription: 'Count word occurrences in text',
    description:
      'Analyze text to count how many times each word appears. Shows frequency table sorted by count. Case-insensitive.',
    category: 'text',
    tags: ['word frequency', 'word count', 'frequency counter', 'word occurrence', 'text analysis'],
    icon: 'bar-chart',
    featured: false,
    popular: false,
    relatedTools: ['word-counter', 'character-counter', 'remove-duplicate-lines'],
    seo: {
      title: 'Word Frequency Counter - Free Online Word Occurrence Counter',
      description:
        'Count how many times each word appears in your text. Shows frequency table sorted by occurrence. Free online tool.',
      keywords: ['word frequency counter', 'word occurrence', 'word count', 'text analysis', 'frequency analysis'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'Is it case-sensitive?', answer: 'No. "Hello" and "hello" are counted as the same word.' },
      { question: 'What counts as a word?', answer: 'Sequences of alphabetic characters (a-z) are counted as words.' },
      { question: 'How are results sorted?', answer: 'Results are sorted by frequency (most common first) by default.' },
    ],
  },
  {
    slug: 'hex-to-rgb',
    name: 'HEX to RGB Converter',
    shortDescription: 'Convert HEX colors to RGB and RGBA',
    description:
      'Convert HEX color codes to RGB and RGBA format. Supports 3 and 6 digit hex colors. Shows color preview.',
    category: 'converter',
    tags: ['hex to rgb', 'color converter', 'hex color', 'color picker', 'rgba converter'],
    icon: 'palette',
    featured: false,
    popular: true,
    relatedTools: ['rgb-to-hex', 'hsl-converter', 'color-palette-generator'],
    seo: {
      title: 'HEX to RGB Converter - Free Online HEX Color to RGB/RGBA Converter',
      description:
        'Convert HEX color codes to RGB and RGBA. Supports short and long hex formats with color preview.',
      keywords: ['hex to rgb converter', 'hex color to rgb', 'color converter', 'rgba converter'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What hex formats are supported?', answer: 'Both 3-digit (#FFF) and 6-digit (#FFFFFF) HEX formats are supported.' },
      { question: 'Can I add alpha/transparency?', answer: 'Yes. Enter a value between 0 and 1 in the alpha field.' },
      { question: 'Is my data sent to servers?', answer: 'No. All conversions happen locally in your browser.' },
    ],
  },
  {
    slug: 'rgb-to-hex',
    name: 'RGB to HEX Converter',
    shortDescription: 'Convert RGB values to HEX color',
    description:
      'Convert RGB color values (0-255) to HEX color codes. Shows color preview and validates input range.',
    category: 'converter',
    tags: ['rgb to hex', 'color converter', 'hex color', 'rgb to hex', 'color picker'],
    icon: 'palette',
    featured: false,
    popular: true,
    relatedTools: ['hex-to-rgb', 'hsl-converter', 'contrast-checker'],
    seo: {
      title: 'RGB to HEX Converter - Free Online RGB to HEX Color Converter',
      description:
        'Convert RGB color values to HEX format. Enter R, G, B (0-255) and get HEX code with preview.',
      keywords: ['rgb to hex converter', 'rgb color to hex', 'color converter', 'hex color generator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What RGB values are valid?', answer: 'Values must be between 0 and 255 for each channel.' },
      { question: 'Is the result uppercase?', answer: 'Yes. HEX output uses uppercase letters for consistency.' },
      { question: 'Is my data sent to servers?', answer: 'No. All conversions happen locally in your browser.' },
    ],
  },
  {
    slug: 'hsl-converter',
    name: 'HSL Converter',
    shortDescription: 'Convert between HEX, RGB, and HSL',
    description:
      'Convert colors between HEX, RGB, and HSL formats. Three modes: HEX to HSL, RGB to HSL, and HSL to HEX.',
    category: 'converter',
    tags: ['hsl converter', 'hsl to rgb', 'rgb to hsl', 'color converter', 'hex hsl converter'],
    icon: 'palette',
    featured: false,
    popular: false,
    relatedTools: ['hex-to-rgb', 'rgb-to-hex', 'color-palette-generator'],
    seo: {
      title: 'HSL Converter - Free HEX RGB HSL Color Converter',
      description:
        'Convert colors between HEX, RGB, and HSL formats. Three conversion modes in one tool.',
      keywords: ['hsl converter', 'hsl to rgb', 'rgb to hsl', 'color converter', 'hex hsl converter'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What conversions are possible?', answer: 'HEX to HSL, RGB to HSL, and HSL to HEX are all supported.' },
      { question: 'Are HSL values standard?', answer: 'Yes. H uses degrees (0-360), S and L use percentage (0-100).' },
      { question: 'Is my data sent to servers?', answer: 'No. All conversions happen locally in your browser.' },
    ],
  },
  {
    slug: 'color-palette-generator',
    name: 'Color Palette Generator',
    shortDescription: 'Generate color palettes from a base color',
    description:
      'Generate color palettes including shades, tints, complementary, and analogous colors from a base HEX color.',
    category: 'generator',
    tags: ['color palette', 'palette generator', 'shades', 'tints', 'color scheme'],
    icon: 'palette',
    featured: false,
    popular: true,
    relatedTools: ['hex-to-rgb', 'random-color-generator', 'gradient-generator'],
    seo: {
      title: 'Color Palette Generator - Free Shades and Tints Generator',
      description:
        'Generate color palettes with shades, tints, complementary, and analogous colors from any base color.',
      keywords: ['color palette generator', 'shades and tints', 'color scheme generator', 'complementary colors'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What colors are generated?', answer: 'Shades (darker), tints (lighter), complementary (opposite), and analogous (neighbors).' },
      { question: 'How many colors per palette?', answer: 'Typically 10-12 colors are generated including shades, tints, and color relationships.' },
      { question: 'Can I copy individual colors?', answer: 'Yes. Click any color swatch to copy its HEX code.' },
    ],
  },
  {
    slug: 'gradient-generator',
    name: 'CSS Gradient Generator',
    shortDescription: 'Generate CSS linear gradients',
    description:
      'Create linear gradients with custom colors and direction. Generate clean CSS code for web projects.',
    category: 'dev',
    tags: ['css gradient', 'linear gradient', 'gradient generator', 'css maker', 'gradient css'],
    icon: 'palette',
    featured: false,
    popular: true,
    relatedTools: ['color-palette-generator', 'css-box-shadow-generator', 'border-radius-generator'],
    seo: {
      title: 'CSS Gradient Generator - Free Online Linear Gradient Creator',
      description:
        'Create CSS linear gradients with custom colors and directions. Get ready-to-use CSS code.',
      keywords: ['css gradient generator', 'linear gradient', 'gradient css', 'css maker'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What directions are available?', answer: 'Left, right, top, bottom, and all diagonals (8 directions total).' },
      { question: 'What format is the CSS output?', answer: 'Standard CSS linear-gradient function ready to use in your stylesheet.' },
      { question: 'Can I use this for production?', answer: 'Yes. The generated CSS works in all modern browsers.' },
    ],
  },
  {
    slug: 'contrast-checker',
    name: 'Contrast Checker',
    shortDescription: 'Check text contrast ratio for accessibility',
    description:
      'Check contrast ratio between foreground and background colors. Shows WCAG AA and AAA compliance levels.',
    category: 'dev',
    tags: ['contrast checker', 'accessibility', 'wcag', 'color contrast', 'accessibility checker'],
    icon: 'eye',
    featured: false,
    popular: true,
    relatedTools: ['hex-to-rgb', 'rgb-to-hex', 'color-palette-generator'],
    seo: {
      title: 'Contrast Checker - Free WCAG AA AAA Accessibility Checker',
      description:
        'Check color contrast ratio for WCAG accessibility compliance. Shows AA and AAA pass/fail for normal and large text.',
      keywords: ['contrast checker', 'wcag contrast', 'accessibility checker', 'color contrast ratio'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What WCAG levels are checked?', answer: 'AA and AAA for both normal text (under 18pt) and large text (18pt+ or 14pt bold).' },
      { question: 'What is the minimum contrast for AA?', answer: '4.5:1 for normal text, 3:1 for large text.' },
      { question: 'Is this tool accurate?', answer: 'This is an approximation for planning. Test with actual fonts and content for official compliance.' },
    ],
  },
  {
    slug: 'random-color-generator',
    name: 'Random Color Generator',
    shortDescription: 'Generate random colors instantly',
    description:
      'Generate random colors with HEX and RGB values. Click to generate new colors. Perfect for design inspiration.',
    category: 'generator',
    tags: ['random color', 'color generator', 'random color picker', 'color inspiration'],
    icon: 'palette',
    featured: false,
    popular: true,
    relatedTools: ['color-palette-generator', 'hex-to-rgb', 'contrast-checker'],
    seo: {
      title: 'Random Color Generator - Free Instant Random Color Picker',
      description:
        'Generate random colors instantly with HEX and RGB values. Click to get new colors for design inspiration.',
      keywords: ['random color generator', 'random color picker', 'color generator', 'color inspiration'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How random are the colors?', answer: 'Uses JavaScript Math.random() for uniform distribution across the color space.' },
      { question: 'Can I copy the values?', answer: 'Yes. Copy HEX or RGB format with the copy buttons.' },
      { question: 'Is there a limit?', answer: 'No limit. Generate as many colors as you need.' },
    ],
  },
  {
    slug: 'css-box-shadow-generator',
    name: 'CSS Box Shadow Generator',
    shortDescription: 'Generate CSS box-shadow code',
    description:
      'Create CSS box-shadow with custom offset, blur, spread, and color. Get clean, production-ready CSS code.',
    category: 'dev',
    tags: ['css box shadow', 'box shadow generator', 'css maker', 'shadow css', 'box-shadow'],
    icon: 'square',
    featured: false,
    popular: false,
    relatedTools: ['gradient-generator', 'border-radius-generator', 'css-clamp-generator'],
    seo: {
      title: 'CSS Box Shadow Generator - Free Online Box Shadow Creator',
      description:
        'Generate CSS box-shadow with custom offset, blur, spread, and color. Get production-ready CSS code.',
      keywords: ['css box shadow generator', 'box shadow css', 'shadow generator', 'css maker'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What box-shadow properties are supported?', answer: 'Offset X, offset Y, blur radius, spread radius, color, and opacity.' },
      { question: 'Is the output production-ready?', answer: 'Yes. The generated CSS uses rgba for proper color with opacity.' },
      { question: 'Can I adjust shadow intensity?', answer: 'Yes. Use the opacity and spread controls to adjust shadow intensity.' },
    ],
  },
  {
    slug: 'border-radius-generator',
    name: 'Border Radius Generator',
    shortDescription: 'Generate CSS border-radius code',
    description:
      'Create CSS border-radius with uniform or individual corner values. Get clean CSS code for rounded corners.',
    category: 'dev',
    tags: ['border radius', 'border radius generator', 'css border-radius', 'rounded corners', 'css maker'],
    icon: 'square',
    featured: false,
    popular: false,
    relatedTools: ['css-box-shadow-generator', 'gradient-generator', 'css-clamp-generator'],
    seo: {
      title: 'Border Radius Generator - Free Online CSS Border Radius Creator',
      description:
        'Generate CSS border-radius code with uniform or individual corner values. Perfect for rounded corners.',
      keywords: ['border radius generator', 'css border radius', 'rounded corners', 'css maker'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'Can I set each corner separately?', answer: 'Yes. Check "Set each corner separately" to enter different values.' },
      { question: 'What units are used?', answer: 'Pixels are used for consistent output across browsers.' },
      { question: 'Is the output production-ready?', answer: 'Yes. Standard CSS that works in all modern browsers.' },
    ],
  },
  {
    slug: 'css-clamp-generator',
    name: 'CSS Clamp Generator',
    shortDescription: 'Generate CSS clamp() for fluid typography',
    description:
      'Create CSS clamp() values for fluid typography that scales responsively. Generate min, preferred, and max values.',
    category: 'dev',
    tags: ['css clamp', 'fluid typography', 'clamp generator', 'responsive font size', 'css maker'],
    icon: 'type',
    featured: false,
    popular: false,
    relatedTools: ['border-radius-generator', 'css-box-shadow-generator', 'gradient-generator'],
    seo: {
      title: 'CSS Clamp Generator - Free Fluid Typography Calculator',
      description:
        'Generate CSS clamp() values for responsive font sizing. Set min, preferred, and max values.',
      keywords: ['css clamp generator', 'fluid typography', 'responsive font size', 'clamp css'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What does clamp() do?', answer: 'Clamp lets you set a value that scales between a minimum and maximum based on a preferred value.' },
      { question: 'What is the preferred value for?', answer: 'Typically uses vw units (viewport width) for responsive scaling.' },
      { question: 'Is this for font-size only?', answer: 'No. clamp() works for any CSS property, but this tool focuses on typography use case.' },
    ],
  },
  {
    slug: 'image-resizer',
    name: 'Image Resizer',
    shortDescription: 'Resize images in browser',
    description:
      'Resize images locally in your browser. Set custom width and height, maintain aspect ratio. Download resized image.',
    category: 'image',
    tags: ['image resizer', 'resize image', 'image size', 'photo resize', 'image resize'],
    icon: 'image',
    featured: false,
    popular: true,
    relatedTools: ['image-compressor', 'aspect-ratio-resizer', 'image-metadata-viewer'],
    seo: {
      title: 'Image Resizer - Free Online Browser-Based Image Resizer',
      description:
        'Resize images directly in your browser. Set dimensions, maintain aspect ratio, and download. No upload required.',
      keywords: ['image resizer', 'resize image', 'photo resize', 'image size reducer'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'Is my image uploaded to a server?', answer: 'No. All processing happens locally in your browser. Your image never leaves your device.' },
      { question: 'Can I maintain the aspect ratio?', answer: 'Yes. Check the "Maintain aspect ratio" option to automatically adjust height when you change width.' },
      { question: 'What image formats are supported?', answer: 'Most common formats like PNG, JPEG, GIF, WebP are supported.' },
    ],
  },
  {
    slug: 'image-compressor',
    name: 'Image Compressor',
    shortDescription: 'Compress images in browser',
    description:
      'Compress images locally in your browser. Adjust quality level and reduce file size. Download compressed image.',
    quickAnswer:
      'An image compressor reduces image file size by re-encoding the image at a chosen quality level. ClickBuildLabs compresses images locally in your browser and outputs a downloadable JPEG, so the selected image is not uploaded by this page.',
    category: 'image',
    tags: ['image compressor', 'compress image', 'reduce image size', 'image optimizer'],
    icon: 'minimize-2',
    featured: false,
    popular: true,
    relatedTools: ['image-resizer', 'image-to-base64', 'placeholder-image-generator'],
    seo: {
      title: 'Image Compressor - Free Browser-Based Image Compression',
      description:
        'Compress images directly in your browser. Adjust quality and reduce file size. No upload required.',
      keywords: ['image compressor', 'compress image', 'reduce image size', 'image optimizer'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'Is compression done on a server?', answer: 'No. The compression uses browser Canvas API and happens entirely locally.' },
      { question: 'How much can I compress?', answer: 'Results vary based on original format and quality setting. JPEG images typically compress well.' },
      { question: 'What format is the output?', answer: 'Output is JPEG format with the quality level you select.' },
      { question: 'Will compression reduce image quality?', answer: 'Usually yes. Lower quality settings make smaller files but can introduce visible artifacts, especially around sharp edges and text.' },
    ],
  },
  {
    slug: 'image-to-base64',
    name: 'Image to Base64 Converter',
    shortDescription: 'Convert images to Base64 data URLs',
    description:
      'Convert any image to Base64 data URL format. Copy the result for use in CSS, HTML, or data URIs.',
    category: 'image',
    tags: ['image to base64', 'base64 image', 'data url', 'image encoder', 'base64 converter'],
    icon: 'image',
    featured: false,
    popular: false,
    relatedTools: ['base64-to-image', 'image-resizer', 'image-compressor'],
    seo: {
      title: 'Image to Base64 Converter - Free Online Base64 Image Encoder',
      description:
        'Convert images to Base64 data URLs in your browser. Copy and use in CSS or HTML.',
      keywords: ['image to base64', 'base64 image', 'data url converter', 'image encoder'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'Is this done in my browser?', answer: 'Yes. The conversion happens locally. No image data is sent to any server.' },
      { question: 'What can I use the Base64 for?', answer: 'Data URLs can be used directly in CSS background-image or img src attributes.' },
      { question: 'Is there a size limit?', answer: 'Large images produce very long Base64 strings. Consider using images under 5MB.' },
    ],
  },
  {
    slug: 'base64-to-image',
    name: 'Base64 to Image Converter',
    shortDescription: 'Convert Base64 back to image',
    description:
      'Decode Base64 data URLs back to images. Preview and download the restored image file.',
    category: 'image',
    tags: ['base64 to image', 'decode base64', 'data url decoder', 'image decoder'],
    icon: 'image',
    featured: false,
    popular: false,
    relatedTools: ['image-to-base64', 'image-resizer', 'favicon-generator'],
    seo: {
      title: 'Base64 to Image Converter - Free Online Base64 Image Decoder',
      description:
        'Decode Base64 data URLs back to image files. Preview and download the converted image.',
      keywords: ['base64 to image', 'decode base64', 'data url decoder', 'image converter'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How do I use this?', answer: 'Paste a complete Base64 data URL (starting with data:image/) and click Convert.' },
      { question: 'Is the conversion local?', answer: 'Yes. All processing happens in your browser.' },
      { question: 'What formats are supported?', answer: 'Standard browser-supported formats: PNG, JPEG, GIF, WebP, SVG.' },
    ],
  },
  {
    slug: 'image-metadata-viewer',
    name: 'Image Metadata Viewer',
    shortDescription: 'View image file information',
    description:
      'View basic metadata of any image: dimensions, file size, MIME type, aspect ratio. Shows info available through browser APIs.',
    category: 'image',
    tags: ['image metadata', 'image info', 'image dimensions', 'file size', 'metadata viewer'],
    icon: 'info',
    featured: false,
    popular: false,
    relatedTools: ['image-resizer', 'aspect-ratio-calculator', 'image-color-picker'],
    seo: {
      title: 'Image Metadata Viewer - Free Online Image Info Checker',
      description:
        'View image metadata including dimensions, file size, type, and aspect ratio. No upload required.',
      keywords: ['image metadata viewer', 'image info', 'image dimensions', 'file size checker'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What metadata is shown?', answer: 'Filename, file size, MIME type, width, height, and simplified aspect ratio.' },
      { question: 'Is EXIF data read?', answer: 'No. This tool shows only basic metadata available through browser file APIs.' },
      { question: 'Is my image uploaded?', answer: 'No. All processing happens locally in your browser.' },
    ],
  },
  {
    slug: 'aspect-ratio-calculator',
    name: 'Aspect Ratio Calculator',
    shortDescription: 'Calculate aspect ratio from dimensions',
    description:
      'Calculate the simplified aspect ratio from width and height values. Includes common preset ratios.',
    category: 'calculators',
    tags: ['aspect ratio calculator', 'ratio calculator', 'aspect ratio', 'image ratio', 'video ratio'],
    icon: 'maximize-2',
    featured: false,
    popular: true,
    relatedTools: ['aspect-ratio-resizer', 'image-resizer', 'placeholder-image-generator'],
    seo: {
      title: 'Aspect Ratio Calculator - Free Online Ratio Finder',
      description:
        'Calculate the simplified aspect ratio from dimensions. Common presets included.',
      keywords: ['aspect ratio calculator', 'ratio calculator', 'aspect ratio', 'image ratio'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How is the ratio simplified?', answer: 'The GCD (greatest common divisor) of width and height is used to simplify to lowest terms.' },
      { question: 'What presets are available?', answer: '16:9, 4:3, 1:1, 9:16, 3:2, and 21:9.' },
      { question: 'Can I copy the result?', answer: 'Yes. Click Copy to copy the simplified ratio like "16:9".' },
    ],
  },
  {
    slug: 'aspect-ratio-resizer',
    name: 'Aspect Ratio Resizer',
    shortDescription: 'Calculate dimensions for target aspect ratio',
    description:
      'Calculate missing dimension when resizing to a specific aspect ratio. Useful for thumbnails and social media.',
    category: 'image',
    tags: ['aspect ratio resizer', 'resize ratio', 'thumbnail calculator', 'aspect ratio', 'social media'],
    icon: 'maximize-2',
    featured: false,
    popular: false,
    relatedTools: ['aspect-ratio-calculator', 'image-resizer', 'placeholder-image-generator'],
    seo: {
      title: 'Aspect Ratio Resizer - Free Target Ratio Calculator',
      description:
        'Calculate dimensions to match a target aspect ratio. Enter one dimension to get the other.',
      keywords: ['aspect ratio resizer', 'thumbnail calculator', 'resize ratio', 'aspect ratio'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How does it work?', answer: 'Select a ratio preset and enter one dimension. The other dimension is calculated automatically.' },
      { question: 'What ratios are available?', answer: '16:9, 4:3, 1:1, 9:16, 3:2, and 21:9.' },
      { question: 'Is this useful for video thumbnails?', answer: 'Yes. 16:9 is common for YouTube, 9:16 for Instagram stories and TikTok.' },
    ],
  },
  {
    slug: 'favicon-generator',
    name: 'Favicon Generator',
    shortDescription: 'Generate PNG favicon from any image',
    description:
      'Generate simple PNG favicons (32x32 and 64x64) from any image. Download ready-to-use favicon PNG files.',
    category: 'image',
    tags: ['favicon generator', 'favicon maker', 'favicon png', 'website icon', 'favicon creator'],
    icon: 'image',
    featured: false,
    popular: false,
    relatedTools: ['image-resizer', 'placeholder-image-generator', 'image-metadata-viewer'],
    seo: {
      title: 'Favicon Generator - Free Online PNG Favicon Creator',
      description:
        'Generate PNG favicon files (32x32 and 64x64) from any image. Download and use as your website favicon.',
      keywords: ['favicon generator', 'favicon maker', 'favicon png', 'website icon maker'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What formats are generated?', answer: 'This tool generates PNG files at 32x32 and 64x64 pixels.' },
      { question: 'How do I use the favicon?', answer: 'Place the PNG file as favicon.ico or favicon.png in your website root.' },
      { question: 'Is the processing local?', answer: 'Yes. All processing happens in your browser. No image is uploaded.' },
    ],
  },
  {
    slug: 'placeholder-image-generator',
    name: 'Placeholder Image Generator',
    shortDescription: 'Generate placeholder images',
    description:
      'Generate placeholder images with custom dimensions, colors, and text. Useful for design mockups.',
    category: 'image',
    tags: ['placeholder image', 'placeholder generator', 'dummy image', 'mockup image', 'placeholder'],
    icon: 'image',
    featured: false,
    popular: true,
    relatedTools: ['image-resizer', 'aspect-ratio-resizer', 'favicon-generator'],
    seo: {
      title: 'Placeholder Image Generator - Free Online Dummy Image Creator',
      description:
        'Generate placeholder images with custom size, background color, text color, and optional label.',
      keywords: ['placeholder image generator', 'dummy image', 'mockup image', 'placeholder generator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What format is the output?', answer: 'PNG format, downloaded directly to your device.' },
      { question: 'Can I add custom text?', answer: 'Yes. Enter any text or leave empty to show dimensions automatically.' },
      { question: 'What are common uses?', answer: 'Design mockups, wireframes, documentation, and development placeholders.' },
    ],
  },
  {
    slug: 'image-color-picker',
    name: 'Image Color Picker',
    shortDescription: 'Pick colors from any image',
    description:
      'Click on any point of an image to pick and copy the color. Shows HEX and RGB values.',
    category: 'image',
    tags: ['color picker', 'image color picker', 'pick color', 'color from image', 'eyedropper'],
    icon: 'eye',
    featured: false,
    popular: true,
    relatedTools: ['image-metadata-viewer', 'hex-to-rgb', 'color-palette-generator'],
    seo: {
      title: 'Image Color Picker - Free Online Click-to-Copy Color Picker',
      description:
        'Pick colors from any image by clicking. Get HEX and RGB values. Copy with one click.',
      keywords: ['image color picker', 'color picker', 'pick color', 'color from image', 'eyedropper'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How do I pick a color?', answer: 'Click anywhere on the preview image. The color under your cursor is captured.' },
      { question: 'What formats are shown?', answer: 'Both HEX (#FF5500) and RGB (rgb(255, 85, 0)) formats are displayed.' },
      { question: 'Is this local processing?', answer: 'Yes. The image is processed entirely in your browser. No uploads.' },
    ],
  },
  {
    slug: 'power-current-voltage-calculator',
    name: 'Power Current Voltage Calculator',
    shortDescription: 'Estimate DC or AC power, current and voltage',
    description:
      'Estimate power, voltage, or current for DC, simple resistive loads, single-phase AC, or three-phase AC with optional power factor.',
    category: 'calculators',
    tags: ['power calculator', 'current calculator', 'voltage calculator', 'ohms law', 'electrical calculator'],
    icon: 'zap',
    featured: false,
    popular: false,
    relatedTools: ['energy-consumption-calculator', 'battery-runtime-calculator', 'led-power-calculator'],
    seo: {
      title: 'Power Current Voltage Calculator - DC and AC P/V/I Estimate',
      description:
        'Estimate active power, current, or voltage for DC, resistive, single-phase AC, and three-phase AC cases with optional power factor.',
      keywords: ['power calculator', 'current calculator', 'voltage calculator', 'ohms law', 'electrical calculator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How does it work?', answer: 'Select what you want to calculate, choose the circuit model, then enter the known values. DC uses P = V x I, single-phase AC uses P = V x I x PF, and three-phase AC uses P = sqrt(3) x V x I x PF.' },
      { question: 'What is power factor?', answer: 'Power factor is the ratio between active power and apparent power in AC circuits. Use 1 for purely resistive loads or when power factor is unknown.' },
      { question: 'Is this for detailed electrical design?', answer: 'No. It is a basic calculation for planning and comparison. Real installations may require local code checks and professional review.' },
    ],
  },
  {
    slug: 'energy-consumption-calculator',
    name: 'Energy Consumption Calculator',
    shortDescription: 'Estimate energy usage and optional cost',
    description:
      'Estimate daily and total energy consumption in kWh from power, hours per day, and days of use. Optional cost estimation.',
    category: 'calculators',
    tags: ['energy consumption', 'kwh calculator', 'electricity consumption', 'power usage', 'energy cost'],
    icon: 'zap',
    featured: false,
    popular: false,
    relatedTools: ['power-current-voltage-calculator', 'solar-panel-output-calculator', 'led-power-calculator'],
    seo: {
      title: 'Energy Consumption Calculator - Estimate kWh Usage and Cost',
      description:
        'Estimate energy consumption in kWh from power rating and usage time, with optional electricity cost.',
      keywords: ['energy consumption calculator', 'kwh calculator', 'electricity consumption', 'power usage calculator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How is energy calculated?', answer: 'Energy (kWh) = Power (kW) x Hours. For example, a 1.5kW device running 4 hours uses 6kWh.' },
      { question: 'What is a kilowatt-hour?', answer: 'A kilowatt-hour (kWh) is the unit electricity companies use for billing. It represents 1000 watts used for 1 hour.' },
      { question: 'Is cost estimation exact?', answer: 'No. It is an estimate based on the rate you enter. Actual consumption can vary with device behavior, duty cycle, and measurement conditions.' },
    ],
  },
  {
    slug: 'solar-panel-output-calculator',
    name: 'Solar Panel Output Calculator',
    shortDescription: 'Estimate PV array daily and monthly output',
    description:
      'Estimate solar panel energy output from panel wattage, panel count, peak sun hours, and system efficiency.',
    quickAnswer:
      'A solar panel output calculator estimates daily and monthly energy production from panel wattage, panel count, peak sun hours, and system efficiency. ClickBuildLabs gives a planning estimate for PV arrays, but real output depends on location, shading, weather, and installation details.',
    category: 'calculators',
    tags: ['solar panel', 'solar output', 'solar energy', 'photovoltaic', 'solar calculator', 'renewable energy'],
    icon: 'sun',
    featured: false,
    popular: false,
    relatedTools: ['solar-system-size-calculator', 'energy-consumption-calculator', 'battery-runtime-calculator'],
    seo: {
      title: 'Solar Panel Output Calculator - Estimate PV Array Energy Output',
      description:
        'Estimate daily and monthly PV array output from panel rating, panel count, peak sun hours, and efficiency.',
      keywords: ['solar panel calculator', 'solar output calculator', 'solar energy', 'photovoltaic calculator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What are peak sun hours?', answer: 'Peak sun hours (PSH) are the equivalent hours of full sunlight a location receives per day. Typical planning values are often around 3 to 6 hours.' },
      { question: 'What does efficiency include?', answer: 'Efficiency can represent wiring, inverter, temperature, soiling, and other system losses. Adjust it for your planning assumptions.' },
      { question: 'Is this accurate for my location?', answer: 'No. Results are estimates only. Actual output depends on location, orientation, shading, weather, inverter clipping, and installation details.' },
      { question: 'How is daily solar output estimated?', answer: 'Daily output is estimated as panel watts x panel count x peak sun hours x system efficiency, then converted from watt-hours to kilowatt-hours.' },
    ],
  },
  {
    slug: 'solar-system-size-calculator',
    name: 'Solar System Size Calculator',
    shortDescription: 'Estimate solar panel capacity from energy use',
    description:
      'Estimate solar panel capacity from daily energy consumption and available sun hours. Optional panel count estimation.',
    category: 'calculators',
    tags: ['solar system size', 'solar sizing', 'solar panel', 'off-grid', 'renewable energy', 'solar calculator'],
    icon: 'sun',
    featured: false,
    popular: false,
    relatedTools: ['solar-panel-output-calculator', 'battery-capacity-calculator', 'inverter-size-calculator'],
    seo: {
      title: 'Solar System Size Calculator - Estimate PV Array Size and Panel Count',
      description:
        'Estimate PV array size and panel count from daily energy use, peak sun hours, system losses, and panel wattage.',
      keywords: ['solar system size calculator', 'solar sizing', 'solar panel size', 'off-grid calculator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How is PV array size calculated?', answer: 'PV array size (kW) = daily energy use (kWh) / (peak sun hours x usable system factor). A 20% loss setting uses a 0.8 usable factor.' },
      { question: 'What if I have partial sun?', answer: 'Fewer peak sun hours means a larger PV array is needed for the same daily energy target. Shading and orientation need separate review.' },
      { question: 'Is this a complete solar design?', answer: 'No. It does not account for shading, orientation, local weather, inverter clipping, regulations, or detailed system design.' },
    ],
  },
  {
    slug: 'battery-runtime-calculator',
    name: 'Battery Runtime Calculator',
    shortDescription: 'Estimate battery runtime from usable capacity',
    description:
      'Estimate battery runtime from nominal capacity, load, depth of discharge, and system efficiency.',
    category: 'calculators',
    tags: ['battery runtime', 'battery hours', 'battery calculator', 'ups runtime', 'battery backup'],
    icon: 'battery',
    featured: false,
    popular: false,
    relatedTools: ['battery-capacity-calculator', 'power-current-voltage-calculator', 'inverter-size-calculator'],
    seo: {
      title: 'Battery Runtime Calculator - Estimate Runtime from Wh, DoD and Efficiency',
      description:
        'Estimate battery runtime from Wh or Ah, system voltage, load, depth of discharge, and efficiency.',
      keywords: ['battery runtime calculator', 'ups runtime', 'battery hours', 'battery backup calculator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How is runtime calculated?', answer: 'Available Wh = nominal battery Wh x depth of discharge x efficiency. Runtime (hours) = available Wh / load W.' },
      { question: 'Why include depth of discharge?', answer: 'Depth of discharge estimates the usable share of nominal battery capacity. Battery chemistry, age, and manufacturer limits should be checked separately.' },
      { question: 'Does temperature affect runtime?', answer: 'Yes. Batteries lose capacity in extreme cold or heat. This calculator does not account for temperature effects.' },
    ],
  },
  {
    slug: 'battery-capacity-calculator',
    name: 'Battery Capacity Calculator',
    shortDescription: 'Estimate required battery capacity',
    description:
      'Estimate required nominal battery capacity from load, runtime, depth of discharge, efficiency, and optional system voltage.',
    category: 'calculators',
    tags: ['battery capacity', 'battery size', 'wh calculator', 'battery bank', 'solar battery'],
    icon: 'battery',
    featured: false,
    popular: false,
    relatedTools: ['battery-runtime-calculator', 'solar-system-size-calculator', 'inverter-size-calculator'],
    seo: {
      title: 'Battery Capacity Calculator - Estimate Battery Size from Load',
      description:
        'Estimate required nominal battery capacity in Wh and Ah from load, runtime, depth of discharge, efficiency, and voltage.',
      keywords: ['battery capacity calculator', 'battery size', 'wh calculator', 'battery bank sizing'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How is capacity calculated?', answer: 'Required nominal Wh = load W x hours / (depth of discharge x efficiency). Required Ah = required Wh / system voltage.' },
      { question: 'Should I include depth of discharge?', answer: 'Yes. Depth of discharge changes the nominal battery capacity needed for the same usable energy target.' },
      { question: 'What voltage should I use?', answer: 'Common small system voltages are 12V, 24V, and 48V. Higher voltage usually means lower current for the same power.' },
    ],
  },
  {
    slug: 'inverter-size-calculator',
    name: 'Inverter Size Calculator',
    shortDescription: 'Estimate inverter size from connected loads',
    description:
      'Estimate inverter size based on total load and a planning margin. Includes a note about motor startup requirements.',
    category: 'calculators',
    tags: ['inverter size', 'inverter sizing', 'power inverter', 'solar inverter', 'off-grid'],
    icon: 'zap',
    featured: false,
    popular: false,
    relatedTools: ['battery-capacity-calculator', 'power-current-voltage-calculator', 'solar-system-size-calculator'],
    seo: {
      title: 'Inverter Size Calculator - Estimate Continuous Load, Surge and Battery Current',
      description:
        'Estimate inverter size from continuous load, surge load, safety margin, battery voltage and efficiency. For informational planning only.',
      keywords: ['inverter size calculator', 'inverter sizing', 'power inverter', 'solar inverter'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What planning margin is used?', answer: 'A 25% default planning margin is used when no value is entered. Adjust it for your load profile and equipment requirements.' },
      { question: 'How is battery-side current estimated?', answer: 'Battery-side DC current is estimated as AC load W / (battery voltage x inverter efficiency).' },
      { question: 'Can this size a motor VFD?', answer: 'No. Motor/VFD sizing depends on motor type, starting current, duty cycle, and manufacturer specifications. This tool does not replace VFD selection.' },
    ],
  },
  {
    slug: 'voltage-drop-calculator',
    name: 'Voltage Drop Calculator',
    shortDescription: 'Estimate voltage drop in wire runs',
    description:
      'Estimate voltage drop and percentage in wire runs. Enter voltage, current, one-way length, cable area, material, and circuit type.',
    category: 'calculators',
    tags: ['voltage drop', 'wire drop', 'cable drop', 'electrical drop', 'voltage loss'],
    icon: 'zap',
    featured: false,
    popular: false,
    relatedTools: ['wire-size-calculator-basic', 'power-current-voltage-calculator', 'inverter-size-calculator'],
    seo: {
      title: 'Voltage Drop Calculator - Basic Cable Voltage Drop Estimate',
      description:
        'Estimate cable voltage drop from voltage, current, one-way length, cross-section, material, and circuit type.',
      keywords: ['voltage drop calculator', 'wire drop', 'cable voltage drop', 'electrical drop'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What is a typical planning target?', answer: 'Many projects use 3% as a planning target for branch circuits, but local rules and project requirements vary.' },
      { question: 'Copper or aluminum wire?', answer: 'Copper has lower resistivity (about 0.0175 ohm mm2/m vs 0.0282 for aluminum), so aluminum usually needs a larger cross-section for the same drop.' },
      { question: 'Is this an electrical code calculation?', answer: 'No. This is a basic voltage drop estimate for planning only. Always follow your local electrical code and consult a licensed electrician for real installations.' },
    ],
  },
  {
    slug: 'wire-size-calculator-basic',
    name: 'Wire Size Calculator Basic',
    shortDescription: 'Estimate cable cross-section from voltage drop',
    description:
      'Estimate cable cross-section from a voltage drop target using current, one-way length, voltage, material, and circuit type.',
    category: 'calculators',
    tags: ['wire size', 'cable size', 'wire gauge', 'wire cross-section', 'electrical wire'],
    icon: 'zap',
    featured: false,
    popular: false,
    relatedTools: ['voltage-drop-calculator', 'power-current-voltage-calculator', 'inverter-size-calculator'],
    seo: {
      title: 'Wire Size Calculator Basic - Estimate Cable Size from Voltage Drop',
      description:
        'Estimate cable cross-section from current, one-way length, voltage, material, circuit type, and maximum voltage drop.',
      keywords: ['wire size calculator', 'cable size', 'wire gauge', 'wire cross-section calculator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'What sizes are compared?', answer: 'The calculator compares common sizes from 0.5 to 120 mm2 and returns the nearest common size that meets the selected voltage drop target.' },
      { question: 'What if my length is very long?', answer: 'Long runs need larger cable cross-section to keep voltage drop within the selected planning limit.' },
      { question: 'Is this a cable sizing standard?', answer: 'No. This is a voltage-drop based estimate for planning purposes only. Always follow your local electrical code and consult a qualified electrician for real installations.' },
    ],
  },
  {
    slug: 'led-power-calculator',
    name: 'LED Power Calculator',
    shortDescription: 'Estimate LED power and daily energy use',
    description:
      'Estimate total power, daily kWh and optional cost for LED bulbs, modules, fixtures or LED strips by length.',
    category: 'calculators',
    tags: ['led power', 'led calculator', 'led strip', 'led consumption', 'lighting power'],
    icon: 'zap',
    featured: false,
    popular: false,
    relatedTools: ['energy-consumption-calculator', 'power-current-voltage-calculator', 'voltage-drop-calculator'],
    seo: {
      title: 'LED Power Calculator - Estimate LED Strip, Bulb and Module Energy Use',
      description:
        'Estimate total LED power, daily kWh and optional cost from item wattage or strip length and watts per meter.',
      keywords: ['led power calculator', 'led strip power', 'led consumption', 'lighting power calculator'],
    },
    ads: { enabled: false, positions: [] },
    faqs: [
      { question: 'How is LED power calculated?', answer: 'For items, total watts = quantity x watts per item. For strips, total watts = length in meters x watts per meter.' },
      { question: 'Can this handle LED strips?', answer: 'Yes. Use strip mode for length in meters and watts per meter. Use item mode for bulbs, modules, or fixtures.' },
      { question: 'Can I estimate yearly cost?', answer: 'Yes. Enter your electricity price per kWh to get daily cost. Multiply by 365 for yearly estimates.' },
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
    .filter((t): t is Tool => t !== undefined && t.slug !== slug)
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
