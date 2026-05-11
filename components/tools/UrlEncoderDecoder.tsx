'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw, ArrowLeftRight } from 'lucide-react';

type Mode = 'encode' | 'decode';

export function UrlEncoderDecoder() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<Mode>('encode');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    if (!input.trim()) {
      setResult('');
      setError('');
      return;
    }
    try {
      if (mode === 'encode') {
        setResult(encodeURIComponent(input));
      } else {
        setResult(decodeURIComponent(input));
      }
      setError('');
    } catch {
      setError('Invalid input for decoding');
      setResult('');
    }
  }, [input, mode]);

  const handleModeSwitch = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput('');
  };

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5">
          <button
            onClick={() => { setMode('encode'); setInput(''); }}
            className={`px-4 py-2 text-sm rounded-md transition-all ${mode === 'encode' ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900' : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400'}`}
          >
            Encode
          </button>
          <button
            onClick={() => { setMode('decode'); setInput(''); }}
            className={`px-4 py-2 text-sm rounded-md transition-all ${mode === 'decode' ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900' : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400'}`}
          >
            Decode
          </button>
        </div>
        <button onClick={handleModeSwitch} className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
          <ArrowLeftRight className="h-4 w-4" />
        </button>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={mode === 'encode' ? 'Enter URL to encode...' : 'Enter encoded URL to decode...'}
        className="w-full h-32 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400"
      />

      <div className="flex gap-2">
        {result && (
          <button onClick={copyResult} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
            {copied ? <Check className="h-4 w-4 inline" /> : <Copy className="h-4 w-4 inline" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
        <button onClick={() => { setInput(''); }} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
          <RefreshCw className="h-4 w-4 inline" />
          Clear
        </button>
      </div>

      {result && !error && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Result</label>
          <div className="px-4 py-3 rounded-lg border bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <code className="text-sm font-mono text-zinc-900 dark:text-zinc-100 break-all">{result}</code>
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
