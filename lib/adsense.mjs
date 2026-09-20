// Shared by Next.js and the static-export finalizer. Never put sample IDs here.
// Public publisher identifier supplied by the site owner; not a secret.
const SITE_PUBLISHER_ID = 'ca-pub-4108029632331459';

export function getAdSenseConfig(env = process.env) {
  const publisherId = (env.ADSENSE_PUBLISHER_ID ?? SITE_PUBLISHER_ID).trim();
  if (publisherId && (!/^ca-pub-\d{16}$/.test(publisherId) || /^ca-pub-0+$/.test(publisherId))) {
    throw new Error('ADSENSE_PUBLISHER_ID must be your real ca-pub- identifier (16 digits).');
  }
  const enabled = env.ADSENSE_ENABLED === 'true';
  if (enabled && (!publisherId || env.ADSENSE_CMP_READY !== 'true')) {
    throw new Error('AdSense activation requires a publisher ID and ADSENSE_CMP_READY=true. See docs/ADSENSE_SETUP.md.');
  }
  return { publisherId, enabled };
}

export function mergeAdsTxt(existing, publisherId) {
  if (!publisherId) return existing;
  const sellerId = publisherId.replace(/^ca-/, '');
  const alreadyPresent = existing.split(/\r?\n/).some((line) => {
    const fields = line.split('#')[0].split(',').map((field) => field.trim());
    return fields[0]?.toLowerCase() === 'google.com' && fields[1] === sellerId &&
      ['DIRECT', 'RESELLER'].includes(fields[2]?.toUpperCase());
  });
  if (alreadyPresent) return existing;
  return `${existing}${existing && !existing.endsWith('\n') ? '\n' : ''}google.com, ${sellerId}, DIRECT, f08c47fec0942fa0\n`;
}
