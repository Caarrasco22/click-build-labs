'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function TimestampConverter() {
  const [input, setInput] = useState('');
  const [isMs, setIsMs] = useState(false);
  const [result, setResult] = useState<{ local: string; utc: string } | null>(null);
  const [error, setError] = useState('');

  const convert = (value: string) => {
    if (!value.trim()) {
      setResult(null);
      setError('');
      return;
    }

    try {
      const num = parseInt(value, 10);
      const timestamp = isMs ? num : num * 1000;

      if (isNaN(timestamp) || timestamp < 0) {
        setError('Invalid timestamp');
        setResult(null);
        return;
      }

      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        setError('Invalid date');
        setResult(null);
        return;
      }

      setResult({
        local: date.toLocaleString(),
        utc: date.toUTCString(),
      });
      setError('');
    } catch {
      setError('Error converting timestamp');
      setResult(null);
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    convert(value);
  };

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(`Local: ${result.local}\nUTC: ${result.utc}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="number"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Enter Unix timestamp..."
          className="flex-1 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-mono"
        />
        <button
          onClick={() => { setIsMs(!isMs); convert(input); }}
          className={`px-3 py-2 text-sm rounded-md transition-all ${isMs ? 'bg-zinc-900 text-white dark:bg-zinc-50' : 'bg-zinc-100 text-zinc-600'}`}
        >
          {isMs ? 'ms' : 's'}
        </button>
      </div>

      <div className="flex gap-2">
        <button onClick={() => { setInput(''); setResult(null); setError(''); }} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200">
          <RefreshCw className="h-4 w-4 inline" />
          Clear
        </button>
        {result && (
          <button onClick={copyResult} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200">
            {copied ? <Check className="h-4 w-4 inline" /> : <Copy className="h-4 w-4 inline" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {result && (
        <div className="space-y-3">
          <div className="px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            <p className="text-xs text-zinc-500 mb-1">Local Time</p>
            <p className="text-sm font-mono text-zinc-900 dark:text-zinc-100">{result.local}</p>
          </div>
          <div className="px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            <p className="text-xs text-zinc-500 mb-1">UTC</p>
            <p className="text-sm font-mono text-zinc-900 dark:text-zinc-100">{result.utc}</p>
          </div>
        </div>
      )}
    </div>
  );
}
