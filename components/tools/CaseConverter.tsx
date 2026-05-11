'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

type CaseType = 'lower' | 'upper' | 'title' | 'sentence' | 'camel' | 'kebab' | 'snake';

const CASES: { key: CaseType; label: string }[] = [
  { key: 'lower', label: 'lowercase' },
  { key: 'upper', label: 'UPPERCASE' },
  { key: 'title', label: 'Title Case' },
  { key: 'sentence', label: 'Sentence case' },
  { key: 'camel', label: 'camelCase' },
  { key: 'kebab', label: 'kebab-case' },
  { key: 'snake', label: 'snake_case' },
];

function convertCase(text: string, type: CaseType): string {
  if (!text.trim()) return '';

  switch (type) {
    case 'lower':
      return text.toLowerCase();
    case 'upper':
      return text.toUpperCase();
    case 'title':
      return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    case 'sentence':
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    case 'camel':
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
    case 'kebab':
      return text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
    case 'snake':
      return text
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '');
  }
}

export function CaseConverter() {
  const [input, setInput] = useState('');
  const [selectedCase, setSelectedCase] = useState<CaseType>('lower');
  const [copied, setCopied] = useState(false);

  const result = convertCase(input, selectedCase);

  const copyResult = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to convert..."
        className="w-full h-32 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
      />

      <div className="flex flex-wrap gap-2">
        {CASES.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSelectedCase(key)}
            className={`px-3 py-1.5 text-sm rounded-md transition-all ${
              selectedCase === key
                ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {result && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Result</label>
            <div className="flex gap-2">
              <button onClick={copyResult} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
                {copied ? <Check className="h-4 w-4 inline" /> : <Copy className="h-4 w-4 inline" />}
              </button>
              <button onClick={() => setInput('')} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
                <RefreshCw className="h-4 w-4 inline" />
              </button>
            </div>
          </div>
          <div className="px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            <code className="text-sm font-mono text-zinc-900 dark:text-zinc-100 break-all">{result}</code>
          </div>
        </div>
      )}
    </div>
  );
}
