'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Copy, Check, RefreshCw, ArrowRightLeft } from 'lucide-react';

export function SlugGenerator() {
  const [input, setInput] = useState('');
  const [slug, setSlug] = useState('');
  const [copied, setCopied] = useState(false);
  const [lowercase, setLowercase] = useState(true);
  const [trim, setTrim] = useState(true);

  const generateSlug = (text: string) => {
    if (!text.trim()) {
      setSlug('');
      return;
    }

    let result = text;

    if (trim) {
      result = result.trim();
    }

    result = result.toLowerCase();

    result = result.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    result = result.replace(/[^\w\s-]/g, '');

    result = result.replace(/[\s_-]+/g, '-');

    result = result.replace(/^-+|-+$/g, '');

    if (lowercase) {
      result = result.toLowerCase();
    } else {
      result = result.replace(/-([a-z])/g, (_, char) => `-${char.toUpperCase()}`);
    }

    return result;
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    setSlug(generateSlug(value) || '');
  };

  const copySlug = async () => {
    if (slug) {
      await navigator.clipboard.writeText(slug);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Text to Slugify
        </label>
        <textarea
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full h-32 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={lowercase}
            onChange={(e) => {
              setLowercase(e.target.checked);
              setSlug(generateSlug(input) || '');
            }}
            className="rounded border-zinc-300 dark:border-zinc-600 text-zinc-900 focus:ring-zinc-500"
          />
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Lowercase</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={trim}
            onChange={(e) => {
              setTrim(e.target.checked);
              setSlug(generateSlug(input) || '');
            }}
            className="rounded border-zinc-300 dark:border-zinc-600 text-zinc-900 focus:ring-zinc-500"
          />
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Trim whitespace</span>
        </label>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Generated Slug
          </label>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleInputChange('')}
            >
              <RefreshCw className="h-4 w-4" />
              Clear
            </Button>
            {slug && (
              <Button variant="ghost" size="sm" onClick={copySlug}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            )}
          </div>
        </div>
        <div className="px-4 py-3 rounded-lg border bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <code className="text-sm font-mono text-zinc-900 dark:text-zinc-100 break-all">
            {slug || 'Your slug will appear here...'}
          </code>
        </div>
      </div>
    </div>
  );
}
