'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [copied, setCopied] = useState(false);

  const price = parseFloat(originalPrice);
  const discount = parseFloat(discountPercent);
  const isValidPrice = !isNaN(price) && price > 0;
  const isValidDiscount = !isNaN(discount) && discount >= 0 && discount <= 100;

  const finalPrice = isValidPrice && isValidDiscount ? price * (1 - discount / 100) : null;
  const saved = isValidPrice && isValidDiscount ? price * (discount / 100) : null;

  const resultStr = finalPrice !== null ? finalPrice.toFixed(2) : '';
  const savedStr = saved !== null ? saved.toFixed(2) : '';

  const copyResult = async () => {
    if (resultStr) {
      await navigator.clipboard.writeText(resultStr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Original Price</label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Discount %</label>
          <input
            type="number"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            placeholder="0"
            min="0"
            max="100"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => { setOriginalPrice(''); setDiscountPercent(''); }}
          className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
        {resultStr && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {finalPrice !== null && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
            <p className="text-sm text-green-600 dark:text-green-400">Final Price</p>
            <p className="text-3xl font-bold text-green-700 dark:text-green-300">${resultStr}</p>
          </div>
          <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20 text-center">
            <p className="text-sm text-amber-600 dark:text-amber-400">You Save</p>
            <p className="text-3xl font-bold text-amber-700 dark:text-amber-300">${savedStr}</p>
          </div>
        </div>
      )}
    </div>
  );
}