'use client';

import { useState, useCallback } from 'react';
import { v1 as generateUuidV1, v4 as generateUuidV4, v7 as generateUuidV7 } from 'uuid';
import { Button } from '@/components/ui/Button';
import { Copy, RefreshCw, Check } from 'lucide-react';

type UuidVersion = 4 | 1 | 7;

const VERSION_INFO = {
  4: { label: 'v4', desc: 'Random - Most common' },
  1: { label: 'v1', desc: 'Timestamp based' },
  7: { label: 'v7', desc: 'Unix timestamp (recommended)' },
};

export function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [version, setVersion] = useState<UuidVersion>(4);
  const [copied, setCopied] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generate = useCallback(() => {
    const generators: Record<UuidVersion, () => string> = {
      4: generateUuidV4,
      1: generateUuidV1,
      7: generateUuidV7,
    };
    const gen = generators[version];
    setUuids(Array.from({ length: 5 }, () => gen()));
  }, [version]);

  const copyAll = async () => {
    await navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copySingle = async (uuid: string, index: number) => {
    await navigator.clipboard.writeText(uuid);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Version:</span>
          <div className="flex gap-1">
            {([4, 1, 7] as UuidVersion[]).map((v) => (
              <button
                key={v}
                onClick={() => { setVersion(v); setUuids([]); }}
                className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                  version === v
                    ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                }`}
              >
                {VERSION_INFO[v].label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={generate}>
            <RefreshCw className="h-4 w-4" />
            Generate
          </Button>
          <Button variant="ghost" size="sm" onClick={copyAll} disabled={uuids.length === 0}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy All'}
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {uuids.length === 0 && <p className="p-4 text-sm text-zinc-500">Choose a version and select Generate to create five UUIDs.</p>}
          {uuids.map((uuid, index) => (
            <div
              key={index}
              className="group flex items-center justify-between px-4 py-3 hover:bg-white dark:hover:bg-zinc-800/50 transition-colors"
            >
              <code className="text-sm font-mono text-zinc-900 dark:text-zinc-100 select-all break-all min-w-0">
                {uuid}
              </code>
              <button
                aria-label={`Copy UUID ${index + 1}`}
                onClick={() => copySingle(uuid, index)}
                className="opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
              >
                {copiedIndex === index ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-zinc-400" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
