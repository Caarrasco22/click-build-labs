'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function ProfitMarginCalculator() {
  const [cost, setCost] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [copied, setCopied] = useState(false);

  const costVal = parseFloat(cost);
  const sellVal = parseFloat(sellPrice);
  const isValidCost = !isNaN(costVal) && costVal >= 0;
  const isValidSell = !isNaN(sellVal) && sellVal >= 0;

  const profit = isValidCost && isValidSell ? sellVal - costVal : null;
  const margin = isValidCost && isValidSell && sellVal > 0 ? (profit! / sellVal) * 100 : null;
  const markup = isValidCost && isValidSell && costVal > 0 ? (profit! / costVal) * 100 : null;

  const profitStr = profit !== null ? profit.toFixed(2) : '';
  const marginStr = margin !== null ? margin.toFixed(1) : '';
  const markupStr = markup !== null ? markup.toFixed(1) : '';
  const hasError = isValidCost && isValidSell && sellVal < costVal;

  const copyResult = async () => {
    if (profitStr) {
      await navigator.clipboard.writeText(`Profit: $${profitStr}, Margin: ${marginStr}%, Markup: ${markupStr}%`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Cost</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Sell Price</label>
          <input
            type="number"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => { setCost(''); setSellPrice(''); }}
          className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
        {profitStr && !hasError && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {hasError && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-300">Sell price cannot be less than cost. Please check your values.</p>
        </div>
      )}

      {profit !== null && !hasError && margin !== null && markup !== null && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
            <p className="text-sm text-green-600 dark:text-green-400">Profit</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">${profitStr}</p>
          </div>
          <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 text-center">
            <p className="text-sm text-blue-600 dark:text-blue-400">Margin</p>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{marginStr}%</p>
          </div>
          <div className="p-4 rounded-lg border border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-900/20 text-center">
            <p className="text-sm text-purple-600 dark:text-purple-400">Markup</p>
            <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{markupStr}%</p>
          </div>
        </div>
      )}
    </div>
  );
}
