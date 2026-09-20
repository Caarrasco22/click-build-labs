'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';


export function JavaScriptMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const minify = async () => {
    setError('');
    if (!input.trim()) {
      setOutput('');
      return;
    }
    setBusy(true);
    try {
      const { minify: minifyJs } = await import('terser');
      const result = await minifyJs(input, { compress: false, mangle: false, format: { comments: 'some' } });
      setOutput(result.code ?? '');
    } catch (cause) {
      setOutput('');
      setError(cause instanceof Error ? cause.message : 'This JavaScript could not be parsed.');
    } finally { setBusy(false); }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    setOutput('');
    setError('');
  };

  const copyOutput = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">JavaScript Input</label>
        <textarea
          disabled={busy}
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="function hello() {&#10;  // comment&#10;  console.log('Hello');&#10;}"
          className="w-full h-40 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400"
        />
      </div>

      <div className="flex gap-2">
        <button onClick={minify} disabled={busy} className="px-4 py-2 text-sm rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900">
          {busy ? 'Minifying...' : 'Minify JS'}
        </button>
        <button disabled={busy} onClick={() => { setInput(''); setOutput(''); setError(''); }} className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
          <RefreshCw className="h-4 w-4 inline" />
          Clear
        </button>
        {output && (
          <button onClick={copyOutput} className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
            {copied ? <Check className="h-4 w-4 inline" /> : <Copy className="h-4 w-4 inline" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
      {output && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Minified Output</label>
          <textarea
            value={output}
            readOnly
            className="w-full h-32 px-4 py-3 rounded-lg border bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-sm font-mono resize-none"
          />
          <p className="text-xs text-zinc-500">Terser parses JavaScript locally and removes unnecessary formatting. Variable renaming and compression are disabled; license comments are retained. No code is executed. Test the result in your application.</p>
        </div>
      )}
    </div>
  );
}
