'use client';

import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState('');

  const testRegex = () => {
    setError('');
    setMatches([]);
    if (!pattern.trim()) return;

    try {
      const regex = new RegExp(pattern, flags);
      const found = testString.match(regex);
      if (found) {
        setMatches(found);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid regex');
    }
  };

  const toggleFlag = (flag: string) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ''));
    } else {
      setFlags(flags + flag);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Regular Expression</label>
        <input
          type="text"
          value={pattern}
          onChange={(e) => { setPattern(e.target.value); setMatches([]); setError(''); }}
          placeholder="e.g., \d+|[a-z]+"
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-zinc-400"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-500">Flags:</span>
        {['g', 'i', 'm'].map((flag) => (
          <button
            key={flag}
            onClick={() => toggleFlag(flag)}
            className={`px-3 py-1 text-sm rounded-md ${flags.includes(flag) ? 'bg-zinc-900 text-white dark:bg-zinc-50' : 'bg-zinc-100 text-zinc-600'}`}
          >
            {flag}
          </button>
        ))}
        <span className="text-xs text-zinc-400 ml-2">g=global, i=case-insensitive, m=multiline</span>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Test String</label>
        <textarea
          value={testString}
          onChange={(e) => { setTestString(e.target.value); setMatches([]); }}
          placeholder="Enter text to test against the regex..."
          className="w-full h-32 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400"
        />
      </div>

      <div className="flex gap-2">
        <button onClick={testRegex} className="px-4 py-2 text-sm rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900">
          Test
        </button>
        <button onClick={() => { setPattern(''); setTestString(''); setMatches([]); setError(''); }} className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
          <RefreshCw className="h-4 w-4 inline" />
          Clear
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {matches.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Matches ({matches.length})
          </label>
          <div className="flex flex-wrap gap-2">
            {matches.map((match, i) => (
              <span key={i} className="px-3 py-1 rounded-md bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-sm font-mono">
                {match || '(empty)'}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
