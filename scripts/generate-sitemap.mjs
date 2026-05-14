import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_URL = 'https://clickbuildlabs.com';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const registryPath = join(rootDir, 'lib', 'registry.ts');
const sitemapPath = join(rootDir, 'public', 'sitemap.xml');

function absoluteUrl(path = '') {
  const normalizedPath = path ? `/${path.replace(/^\/+|\/+$/g, '')}` : '';
  return `${SITE_URL}${normalizedPath}/`;
}

function getToolsBlock(registrySource) {
  const startToken = 'export const tools: Tool[] = [';
  const start = registrySource.indexOf(startToken);
  if (start === -1) {
    throw new Error('Could not find tools registry block.');
  }

  const end = registrySource.indexOf('\n];', start);
  if (end === -1) {
    throw new Error('Could not find end of tools registry block.');
  }

  return registrySource.slice(start, end);
}

function getTools(registrySource) {
  const toolsBlock = getToolsBlock(registrySource);
  const tools = [];
  const toolPattern = /slug:\s*'([^']+)'[\s\S]*?category:\s*'([^']+)'/g;
  let match;

  while ((match = toolPattern.exec(toolsBlock)) !== null) {
    tools.push({ slug: match[1], category: match[2] });
  }

  if (tools.length === 0) {
    throw new Error('No tools found in registry.');
  }

  return tools;
}

function uniqueUrls(urls) {
  return [...new Set(urls)];
}

function urlEntry(url, changefreq, priority) {
  return [
    '  <url>',
    `    <loc>${url}</loc>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

async function main() {
  const registrySource = await readFile(registryPath, 'utf8');
  const tools = getTools(registrySource);
  const categoriesWithTools = [...new Set(tools.map((tool) => tool.category))].sort();

  const urls = uniqueUrls([
    absoluteUrl(),
    absoluteUrl('/tools'),
    absoluteUrl('/about'),
    ...tools.map((tool) => absoluteUrl(`/tools/${tool.slug}`)),
    ...categoriesWithTools.map((category) => absoluteUrl(`/categories/${category}`)),
    absoluteUrl('/privacy'),
    absoluteUrl('/terms'),
  ]);

  const entries = urls.map((url) => {
    if (url === absoluteUrl()) {
      return urlEntry(url, 'daily', '1.0');
    }

    if (url === absoluteUrl('/tools')) {
      return urlEntry(url, 'daily', '0.9');
    }

    if (url.includes('/categories/')) {
      return urlEntry(url, 'daily', '0.8');
    }

    if (url.includes('/tools/')) {
      return urlEntry(url, 'weekly', '0.7');
    }

    return urlEntry(url, 'monthly', '0.4');
  });

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');

  await writeFile(sitemapPath, sitemap, 'utf8');
  console.log(
    `Generated sitemap.xml with ${urls.length} URLs (${tools.length} tools, ${categoriesWithTools.length} categories).`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
