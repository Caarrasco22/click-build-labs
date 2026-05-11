'use client';

import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

interface DiffLine {
  type: 'same' | 'add' | 'remove';
  content: string;
  lineNum: number;
}

function computeDiff(lines1: string[], lines2: string[]): DiffLine[] {
  const result: DiffLine[] = [];
  const maxLen = Math.max(lines1.length, lines2.length);

  for (let i = 0; i < maxLen; i++) {
    const l1 = lines1[i];
    const l2 = lines2[i];

    if (l1 === l2) {
      if (l1 !== undefined) result.push({ type: 'same', content: l1, lineNum: i + 1 });
    } else {
      if (l1 !== undefined) result.push({ type: 'remove', content: l1, lineNum: i + 1 });
      if (l2 !== undefined) result.push({ type: 'add', content: l2, lineNum: i + 1 });
    }
  }
  return result;
}

export function TextDiffChecker() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [showDiff, setShowDiff] = useState(false);

  const diff = showDiff ? computeDiff(text1.split('\n'), text2.split('\n')) : [];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Original Text</label>
          <textarea
            value={text1}
            onChange={(e) => { setText1(e.target.value); setShowDiff(false); }}
            placeholder="Paste original text..."
            className="w-full h-40 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Changed Text</label>
          <textarea
            value={text2}
            onChange={(e) => { setText2(e.target.value); setShowDiff(false); }}
            placeholder="Paste changed text..."
            className="w-full h-40 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => { setText1(''); setText2(''); setShowDiff(false); }}
          className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
        >
          <RefreshCw className="h-4 w-4 inline" />
          Clear
        </button>
        <button
          onClick={() => setShowDiff(true)}
          className="px-4 py-1.5 text-sm rounded-md bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900"
        >
          Compare
        </button>
      </div>

      {diff.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Differences</label>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            {diff.map((line, i) => (
              <div
                key={i}
                className={`px-4 py-2 text-sm font-mono border-b border-zinc-200 dark:border-zinc-800 last:border-0 ${
                  line.type === 'add' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                  line.type === 'remove' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' :
                  'bg-white dark:bg-zinc-900'
                }`}
              >
                <span className="inline-block w-8 text-zinc-400 mr-2">{line.lineNum}</span>
                <span className="mr-2">{line.type === 'add' ? '+' : line.type === 'remove' ? '-' : ' '}</span>
                {line.content || '\u00A0'}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
