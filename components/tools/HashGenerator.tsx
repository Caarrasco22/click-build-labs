'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Copy, Check, RefreshCw, Lock } from 'lucide-react';

type HashAlgorithm = 'sha-1' | 'sha-256' | 'sha-512';

const ALGORITHMS: { key: HashAlgorithm; label: string; note?: string }[] = [
  { key: 'sha-256', label: 'SHA-256', note: 'Recommended' },
  { key: 'sha-512', label: 'SHA-512' },
  { key: 'sha-1', label: 'SHA-1', note: 'Legacy' },
];

const ALGORITHM_LABELS: Record<HashAlgorithm, string> = {
  'sha-1': 'SHA-1',
  'sha-256': 'SHA-256',
  'sha-512': 'SHA-512',
};

async function computeHash(algorithm: HashAlgorithm, text: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function HashGenerator() {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('sha-256');
  const [hash, setHash] = useState('');
  const [copied, setCopied] = useState(false);
  const [isComputing, setIsComputing] = useState(false);
  const [error, setError] = useState('');

  const compute = async () => {
    if (!input.trim()) {
      setHash('');
      setError('');
      return;
    }
    setIsComputing(true);
    setError('');
    try {
      const result = await computeHash(algorithm, input);
      setHash(result);
    } catch (err) {
      setError(`Your browser does not support ${ALGORITHM_LABELS[algorithm]}. Try a different algorithm.`);
      setHash('');
    }
    setIsComputing(false);
  };

  const copyHash = async () => {
    if (hash) {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Input Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          className="w-full h-32 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {ALGORITHMS.map(({ key, label, note }) => (
          <button
            key={key}
            onClick={() => { setAlgorithm(key); setHash(''); setError(''); }}
            className={`px-3 py-1.5 text-sm rounded-md transition-all flex items-center gap-1.5 ${
              algorithm === key
                ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            <span>{label}</span>
            {note && (
              <span className={`text-xs ${algorithm === key ? 'text-zinc-300' : 'text-zinc-400'}`}>
                ({note})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <Button variant="secondary" onClick={compute} disabled={isComputing}>
          <Lock className="h-4 w-4" />
          {isComputing ? 'Computing...' : 'Generate Hash'}
        </Button>
        {hash && (
          <Button variant="ghost" onClick={copyHash}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        )}
        <Button variant="ghost" onClick={() => { setInput(''); setHash(''); setError(''); }}>
          <RefreshCw className="h-4 w-4" />
          Clear
        </Button>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {hash && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {ALGORITHM_LABELS[algorithm]} Hash
          </label>
          <div className="px-4 py-3 rounded-lg border bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <code className="text-sm font-mono text-zinc-900 dark:text-zinc-100 break-all select-all">
              {hash}
            </code>
          </div>
        </div>
      )}
    </div>
  );
}
