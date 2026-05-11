'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function BmiCalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [copied, setCopied] = useState(false);

  const heightVal = parseFloat(height);
  const weightVal = parseFloat(weight);
  const isValidHeight = !isNaN(heightVal) && heightVal > 0;
  const isValidWeight = !isNaN(weightVal) && weightVal > 0;

  const bmi = isValidHeight && isValidWeight ? weightVal / ((heightVal / 100) ** 2) : null;
  const bmiStr = bmi !== null ? bmi.toFixed(1) : '';

  const getCategory = (bmiValue: number): { label: string; color: string } => {
    if (bmiValue < 18.5) return { label: 'Underweight', color: 'blue' };
    if (bmiValue < 25) return { label: 'Normal', color: 'green' };
    if (bmiValue < 30) return { label: 'Overweight', color: 'amber' };
    return { label: 'Obese', color: 'red' };
  };

  const category = bmi !== null ? getCategory(bmi) : null;

  const copyResult = async () => {
    if (bmiStr && category) {
      await navigator.clipboard.writeText(`BMI: ${bmiStr} (${category.label})`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <p className="text-xs text-amber-700 dark:text-amber-300">
          <strong>Disclaimer:</strong> Results are for general informational purposes only and are not medical advice.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="170"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => { setHeight(''); setWeight(''); }}
          className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
        {bmiStr && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {bmi !== null && category && (
        <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-center">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Your BMI</p>
          <p className="text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{bmiStr}</p>
          <p className={`text-lg font-medium ${
            category.color === 'green' ? 'text-green-600 dark:text-green-400' :
            category.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
            category.color === 'amber' ? 'text-amber-600 dark:text-amber-400' :
            'text-red-600 dark:text-red-400'
          }`}>{category.label}</p>
        </div>
      )}
    </div>
  );
}