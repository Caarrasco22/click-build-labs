'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Copy, RefreshCw, Check } from 'lucide-react';

type UuidVersion = 4 | 1 | 7;

const VERSION_INFO = {
  4: { label: 'v4', desc: 'Random - Most common' },
  1: { label: 'v1', desc: 'Timestamp based' },
  7: { label: 'v7', desc: 'Unix timestamp (recommended)' },
};

function generateUuidV4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateUuidV1(): string {
  const now = Date.now();
  const timeLow = (now & 0xffffffff) >>> 0;
  const timeMid = ((now / 0x100000000) & 0xffff) >>> 0;
  const timeHiAndVersion = 0x1000 | ((now / 0x100000000 / 0x10000) & 0x0fff);

  const clockSeq = ((Math.random() * 16) | 0) >>> 0;
  const node = Array.from({ length: 6 }, () => ((Math.random() * 256) | 0) >>> 0);

  return (
    timeLow.toString(16).padStart(8, '0') + '-' +
    timeMid.toString(16).padStart(4, '0') + '-' +
    timeHiAndVersion.toString(16).padStart(4, '0') + '-' +
    clockSeq.toString(16).padStart(2, '0') +
    node.slice(0, 2).map((b) => b.toString(16).padStart(2, '0')).join('') + '-' +
    node.slice(2).map((b) => b.toString(16).padStart(2, '0')).join('')
  );
}

function generateUuidV7(): string {
  const timestamp = Date.now();
  const rand = Array.from({ length: 10 }, () => ((Math.random() * 256) | 0) >>> 0);

  const timeHex = timestamp.toString(16).padStart(12, '0');
  return (
    timeHex.slice(0, 8) + '-' +
    timeHex.slice(8, 12) + '-7' +
    rand[0].toString(16).padStart(3, '0') + '-' +
    ((rand[1] & 0x0f) | 0x8).toString(16) +
    rand.slice(2, 6).map((b) => b.toString(16).padStart(2, '0')).join('') + '-' +
    rand.slice(6).map((b) => b.toString(16).padStart(2, '0')).join('')
  );
}

export function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([generateUuidV4()]);
  const [version, setVersion] = useState<UuidVersion>(4);
  const [copied, setCopied] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generate = useCallback(() => {
    const generators = {
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
                onClick={() => setVersion(v)}
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
          <Button variant="ghost" size="sm" onClick={copyAll}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy All'}
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {uuids.map((uuid, index) => (
            <div
              key={index}
              className="group flex items-center justify-between px-4 py-3 hover:bg-white dark:hover:bg-zinc-800/50 transition-colors"
            >
              <code className="text-sm font-mono text-zinc-900 dark:text-zinc-100 select-all">
                {uuid}
              </code>
              <button
                onClick={() => copySingle(uuid, index)}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
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