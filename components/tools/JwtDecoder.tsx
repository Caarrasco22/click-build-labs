'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw, AlertTriangle } from 'lucide-react';

function decodeBase64Url(part: string): string {
  const base64 = part.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + ((4 - base64.length % 4) % 4), '=');
  return atob(padded);
}

function decodeJWT(token: string): { header: object; payload: object } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const header = JSON.parse(decodeBase64Url(parts[0]));
    const payload = JSON.parse(decodeBase64Url(parts[1]));
    return { header, payload };
  } catch {
    return null;
  }
}

export function JwtDecoder() {
  const [input, setInput] = useState('');
  const [decoded, setDecoded] = useState<{ header: object; payload: object } | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (value: string) => {
    setInput(value);
    if (!value.trim()) {
      setDecoded(null);
      setError('');
      return;
    }
    const result = decodeJWT(value);
    if (result) {
      setDecoded(result);
      setError('');
    } else {
      setDecoded(null);
      setError('Invalid JWT format. Please check your token.');
    }
  };

  const copyDecoded = async () => {
    if (decoded) {
      await navigator.clipboard.writeText(JSON.stringify(decoded, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Paste your JWT token here..."
        className="w-full h-32 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400"
      />

      <div className="flex gap-2">
        <button onClick={() => { setInput(''); setDecoded(null); setError(''); }} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
          <RefreshCw className="h-4 w-4 inline" />
          Clear
        </button>
        {decoded && (
          <button onClick={copyDecoded} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
            {copied ? <Check className="h-4 w-4 inline" /> : <Copy className="h-4 w-4 inline" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      <div className="flex items-start gap-2 px-4 py-3 rounded-lg border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-900/20">
        <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
        <p className="text-sm text-yellow-700 dark:text-yellow-400">
          This tool only decodes the token. It does NOT verify the signature. Avoid pasting sensitive tokens and do not use decoded output for security-critical decisions.
        </p>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {decoded && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Header</label>
            <pre className="px-4 py-3 rounded-lg border bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-sm font-mono text-zinc-900 dark:text-zinc-100 overflow-auto max-h-48">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Payload</label>
            <pre className="px-4 py-3 rounded-lg border bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-sm font-mono text-zinc-900 dark:text-zinc-100 overflow-auto max-h-48">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
