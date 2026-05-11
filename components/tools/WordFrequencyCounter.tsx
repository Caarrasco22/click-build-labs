'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

interface WordCount {
  word: string;
  count: number;
}

export function WordFrequencyCounter() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<WordCount[]>([]);
  const [maxResults, setMaxResults] = useState(50);
  const [copied, setCopied] = useState(false);

  const count = () => {
    const words = input.toLowerCase().match(/[a-z]+/g) || [];
    const freq: Record<string, number> = {};

    words.forEach(word => {
      freq[word] = (freq[word] || 0) + 1;
    });

    const sorted: WordCount[] = Object.entries(freq)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count);

    setResult(sorted);
  };

  const copyResult = async () => {
    if (result.length > 0) {
      const text = result.map(r => `${r.word}: ${r.count}`).join('\n');
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const totalWords = input.toLowerCase().match(/[a-z]+/g)?.length || 0;
  const uniqueWords = result.length;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste text to analyze word frequency..."
          rows={6}
          className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-sm resize-none"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={count}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium"
        >
          Count Frequency
        </button>
        <button
          onClick={() => { setInput(''); setResult([]); }}
          className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
        {result.length > 0 && (
          <button
            onClick={copyResult}
            className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {result.length > 0 && (
        <div className="space-y-3">
          <div className="flex gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <span>Total words: {totalWords}</span>
            <span>Unique words: {uniqueWords}</span>
            <span>Showing top {Math.min(maxResults, result.length)}</span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-zinc-600 dark:text-zinc-400">Max results:</label>
            <select
              value={maxResults}
              onChange={(e) => setMaxResults(parseInt(e.target.value))}
              className="px-2 py-1 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 max-h-80 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-green-50 dark:bg-green-900/50">
                <tr className="text-left text-zinc-600 dark:text-zinc-400">
                  <th className="py-1 pr-4">Word</th>
                  <th className="py-1">Count</th>
                </tr>
              </thead>
              <tbody>
                {result.slice(0, maxResults).map((item, i) => (
                  <tr key={i} className="border-t border-zinc-200 dark:border-zinc-700">
                    <td className="py-1 pr-4 font-mono">{item.word}</td>
                    <td className="py-1 text-zinc-600 dark:text-zinc-400">{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}