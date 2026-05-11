'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw, Info } from 'lucide-react';

export function FinalGradeCalculator() {
  const [currentGrade, setCurrentGrade] = useState('');
  const [desiredGrade, setDesiredGrade] = useState('');
  const [finalWeight, setFinalWeight] = useState('');
  const [result, setResult] = useState<{ needed: number; possible: boolean; message: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const current = parseFloat(currentGrade);
    const target = parseFloat(desiredGrade);
    const weight = parseFloat(finalWeight);

    if (isNaN(current) || isNaN(target) || isNaN(weight)) {
      setResult(null);
      return;
    }

    if (weight <= 0 || weight > 100) {
      setResult({ needed: 0, possible: false, message: 'Final weight must be between 0 and 100%.' });
      return;
    }

    const currentWeight = 100 - weight;
    const needed = (target - (current * currentWeight / 100)) / (weight / 100);
    const possible = needed <= 100 && needed >= 0;

    let message = '';
    if (needed > 100) {
      message = `You would need ${needed.toFixed(1)}% on your final, which is impossible (over 100%).`;
    } else if (needed < 0) {
      message = `You have already achieved your target grade! You need 0% on the final.`;
    } else {
      message = `You need ${needed.toFixed(1)}% on your final to achieve ${target}% overall.`;
    }

    setResult({ needed, possible, message });
  };

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(result.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Current Grade (%)</label>
          <input
            type="number"
            value={currentGrade}
            onChange={(e) => { setCurrentGrade(e.target.value); setResult(null); }}
            placeholder="e.g. 85"
            min="0"
            max="100"
            className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Desired Grade (%)</label>
          <input
            type="number"
            value={desiredGrade}
            onChange={(e) => { setDesiredGrade(e.target.value); setResult(null); }}
            placeholder="e.g. 90"
            min="0"
            max="100"
            className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Final Weight (%)</label>
          <input
            type="number"
            value={finalWeight}
            onChange={(e) => { setFinalWeight(e.target.value); setResult(null); }}
            placeholder="e.g. 30"
            min="0"
            max="100"
            className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={calculate}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium"
        >
          Calculate
        </button>
        <button
          onClick={() => { setCurrentGrade(''); setDesiredGrade(''); setFinalWeight(''); setResult(null); }}
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
        <div className={`p-6 rounded-lg border ${
          result.possible ? 'border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20' : 'border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20'
        }`}>
          <p className={`text-xl font-bold ${result.possible ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
            {result.message}
          </p>
        </div>
      )}

      <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-700 dark:text-amber-300">
          This tool provides estimates for planning purposes only. Your actual grade depends on your specific coursework and instructor policies.
        </p>
      </div>
    </div>
  );
}