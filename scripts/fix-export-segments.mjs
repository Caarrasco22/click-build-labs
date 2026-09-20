import { readdir, copyFile } from 'node:fs/promises';
import { join } from 'node:path';

// Next.js Windows export bug: segment paths contain backslashes and become
// nested directories, while the browser requests dot-separated file names.
// https://github.com/vercel/next.js/issues/92339
// Add matching files without modifying Next or requiring hosting rewrites.
export async function fixExportSegments(root = 'out') {
  let copied = 0;
  async function flatten(directory, pageDirectory, parts) {
    for (const item of await readdir(directory, { withFileTypes: true })) {
      const source = join(directory, item.name);
      const next = [...parts, item.name];
      if (item.isDirectory()) await flatten(source, pageDirectory, next);
      else if (item.name.endsWith('.txt')) {
        await copyFile(source, join(pageDirectory, next.join('.')));
        copied++;
      }
    }
  }
  async function visit(directory) {
    for (const item of await readdir(directory, { withFileTypes: true })) {
      if (!item.isDirectory() || item.name === '_next') continue;
      const child = join(directory, item.name);
      if (item.name.startsWith('__next.')) await flatten(child, directory, [item.name]);
      else await visit(child);
    }
  }
  await visit(root);
  return copied;
}
