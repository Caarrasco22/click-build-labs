'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function WordCounter() {
  const [text, setText] = useState('');

  const stats = {
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    charsWithSpaces: text.length,
    charsNoSpaces: text.replace(/\s/g, '').length,
    sentences: text.split(/[.!?]+/).filter((s) => s.trim()).length,
    paragraphs: text.split(/\n\n+/).filter((p) => p.trim()).length,
    readingTime: Math.ceil(text.split(/\s+/).filter((w) => w).length / 200),
  };

  const copyAll = async () => {
    const result = `Words: ${stats.words}
Characters (with spaces): ${stats.charsWithSpaces}
Characters (no spaces): ${stats.charsNoSpaces}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Reading time: ${stats.readingTime} min`;
    await navigator.clipboard.writeText(result);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="w-full h-48 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
        />
      </div>

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
            onClick={copyAll}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition-colors"
          >
            <Copy className="h-4 w-4 inline mr-1" />
            Copy Stats
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Words', value: stats.words },
          { label: 'Characters', value: stats.charsWithSpaces },
          { label: 'No Spaces', value: stats.charsNoSpaces },
          { label: 'Sentences', value: stats.sentences },
          { label: 'Paragraphs', value: stats.paragraphs },
          { label: 'Read Time', value: `${stats.readingTime} min` },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
          >
            <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              {value}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
