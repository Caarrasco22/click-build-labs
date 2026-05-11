'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

function minifyJs(js: string): string {
  let result = js;
  result = result.replace(/\/\*[\s\S]*?\*\//g, '');
  result = result.replace(/\/\/.*$/gm, '');
  result = result.replace(/\s+/g, ' ');
  result = result.replace(/\s*([{}()=+\-*/%<>!&|,;:])\s*/g, '$1');
  result = result.replace(/;\}/g, '}');
  result = result.replace(/;\n/g, '\n');
  return result.trim();
}

export function JavaScriptMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const minify = () => {
    if (!input.trim()) {
      setOutput('');
      return;
    }
    setOutput(minifyJs(input));
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    if (!value.trim()) setOutput('');
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
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="function hello() {&#10;  // comment&#10;  console.log('Hello');&#10;}"
          className="w-full h-40 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400"
        />
      </div>

      <div className="flex gap-2">
        <button onClick={minify} className="px-4 py-2 text-sm rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900">
          Minify JS
        </button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
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

      {output && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Minified Output</label>
          <textarea
            value={output}
            readOnly
            className="w-full h-32 px-4 py-3 rounded-lg border bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-sm font-mono resize-none"
          />
          <p className="text-xs text-zinc-500">Basic minification only. For production JavaScript, use a proper bundler like webpack, rollup, or esbuild.</p>
        </div>
      )}
    </div>
  );
}
