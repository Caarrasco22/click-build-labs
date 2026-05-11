'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function RemoveDuplicateLines() {
  const [input, setInput] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [keepFirst, setKeepFirst] = useState(true);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const process = () => {
    const lines = input.split('\n');
    const seen = new Set<string>();
    const output: string[] = [];
    let duplicates = 0;

    lines.forEach((line) => {
      const key = caseSensitive ? line : line.toLowerCase();
      if (seen.has(key)) {
        duplicates++;
      } else {
        seen.add(key);
        if (keepFirst || !output.includes(line)) {
          output.push(line);
        }
      }
    });

    setResult(output.join('\n'));
  };

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const inputLines = input.split('\n').filter(l => l.trim()).length;
  const resultLines = result.split('\n').filter(l => l.trim()).length;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your text here..."
          rows={6}
          className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-sm resize-none"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <input
            type="checkbox"
            checked={keepFirst}
            onChange={(e) => setKeepFirst(e.target.checked)}
            className="rounded"
          />
          Keep first occurrence
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="rounded"
          />
          Case sensitive
        </label>
      </div>

      <div className="flex gap-2">
        <button
          onClick={process}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium"
        >
          Remove Duplicates
        </button>
        <button
          onClick={() => { setInput(''); setResult(''); }}
          className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
        {result && (
          <button
            onClick={copyResult}
            className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {result && (
        <div className="space-y-2">
          <div className="flex gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <span>Input: {inputLines} lines</span>
            <span>Output: {resultLines} lines</span>
            <span>Removed: {inputLines - resultLines} duplicates</span>
          </div>
          <textarea
            value={result}
            readOnly
            rows={6}
            className="w-full px-3 py-2 rounded-md border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 font-mono text-sm resize-none"
          />
        </div>
      )}
    </div>
  );
}