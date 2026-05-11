'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function ReadingSpeedCalculator() {
  const [words, setWords] = useState('');
  const [minutes, setMinutes] = useState('');
  const [targetWords, setTargetWords] = useState('');
  const [result, setResult] = useState<{ wpm: number; timeForTarget: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const wordCount = parseFloat(words);
    const timeMinutes = parseFloat(minutes);
    const target = parseFloat(targetWords);

    if (isNaN(wordCount) || isNaN(timeMinutes) || timeMinutes <= 0 || wordCount < 0) {
      setResult(null);
      return;
    }

    const wpm = wordCount / timeMinutes;
    let timeForTarget = '';

    if (!isNaN(target) && target > 0) {
      const targetMinutes = target / wpm;
      if (targetMinutes >= 60) {
        const hours = Math.floor(targetMinutes / 60);
        const mins = Math.round(targetMinutes % 60);
        timeForTarget = `${hours}h ${mins}m`;
      } else {
        timeForTarget = `${Math.round(targetMinutes)} minute(s)`;
      }
    }

    setResult({ wpm: Math.round(wpm * 10) / 10, timeForTarget });
  };

  const copyResult = async () => {
    if (result) {
      const text = result.timeForTarget
        ? `Reading speed: ${result.wpm} WPM. Time to read ${targetWords || 'target'} words: ${result.timeForTarget}`
        : `Reading speed: ${result.wpm} WPM`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Words Read</label>
          <input
            type="number"
            value={words}
            onChange={(e) => { setWords(e.target.value); setResult(null); }}
            placeholder="e.g. 1500"
            min="0"
            className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Time (minutes)</label>
          <input
            type="number"
            value={minutes}
            onChange={(e) => { setMinutes(e.target.value); setResult(null); }}
            placeholder="e.g. 15"
            min="0.1"
            step="0.1"
            className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Estimate Time for Another Text (words)</label>
        <input
          type="number"
          value={targetWords}
          onChange={(e) => { setTargetWords(e.target.value); setResult(null); }}
          placeholder="e.g. 5000 (optional)"
          min="0"
          className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={calculate}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium"
        >
          Calculate
        </button>
        <button
          onClick={() => { setWords(''); setMinutes(''); setTargetWords(''); setResult(null); }}
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
        <div className="space-y-4">
          <div className="p-6 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
            <p className="text-sm text-green-600 dark:text-green-400 mb-1">Your Reading Speed</p>
            <p className="text-5xl font-bold text-green-700 dark:text-green-300">{result.wpm}</p>
            <p className="text-lg text-green-600/70 dark:text-green-400/70">words per minute (WPM)</p>
          </div>
          {result.timeForTarget && (
            <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 text-center">
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">
                Time to read {targetWords || 'target'} words
              </p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{result.timeForTarget}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}