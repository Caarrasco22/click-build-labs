'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function CharacterCounter() {
  const [text, setText] = useState('');

  const stats = {
    total: text.length,
    noSpaces: text.replace(/\s/g, '').length,
    lines: text.split('\n').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
  };

  const copyStats = async () => {
    await navigator.clipboard.writeText(`Total: ${stats.total}\nNo spaces: ${stats.noSpaces}\nLines: ${stats.lines}\nWords: ${stats.words}`);
  };

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste text here..."
        className="w-full h-40 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
      />

      <div className="flex gap-2">
        <button
          onClick={() => setText('')}
          className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition-colors"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
        {text && (
          <button
            onClick={copyStats}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition-colors"
          >
            <Copy className="h-4 w-4 inline mr-1" />
            Copy
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Characters', value: stats.total },
          { label: 'No Spaces', value: stats.noSpaces },
          { label: 'Lines', value: stats.lines },
          { label: 'Words', value: stats.words },
        ].map(({ label, value }) => (
          <div key={label} className="px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-center">
            <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{value}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
