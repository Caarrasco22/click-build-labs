import { readFile, writeFile, rm } from 'node:fs/promises';
import nextEnv from '@next/env';
import { getAdSenseConfig, mergeAdsTxt } from '../lib/adsense.mjs';
import { fixExportSegments } from './fix-export-segments.mjs';

nextEnv.loadEnvConfig(process.cwd());
const { publisherId } = getAdSenseConfig();
let existing = '';
try { existing = await readFile('public/ads.txt', 'utf8'); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
const contents = mergeAdsTxt(existing, publisherId);
if (contents) await writeFile('out/ads.txt', contents);
else await rm('out/ads.txt', { force: true });
console.log(publisherId ? 'AdSense verification and ads.txt configured.' : 'AdSense disabled: no publisher ID. Existing ads.txt entries preserved.');
console.log(`Static navigation: normalized ${await fixExportSegments()} Windows segment files.`);
