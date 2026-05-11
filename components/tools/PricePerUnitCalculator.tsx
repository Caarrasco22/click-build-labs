'use client';

import { useState } from 'react';
import { DollarSign, Copy } from 'lucide-react';

export function PricePerUnitCalculator() {
  const [totalPrice, setTotalPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [result, setResult] = useState<{ pricePerUnit: number } | null>(null);

  const calculate = () => {
    const price = parseFloat(totalPrice);
    const qty = parseFloat(quantity);
    if (isNaN(price) || isNaN(qty) || qty <= 0) {
      setResult(null);
      return;
    }
    setResult({ pricePerUnit: price / qty });
  };

  const copyResult = () => {
    if (result) {
      const unitText = unit ? ` per ${unit}` : ' per unit';
      navigator.clipboard.writeText(`${result.pricePerUnit.toFixed(2)}${unitText}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Total Price</label>
          <input
            type="number"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="0"
            min="0"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Unit (optional)</label>
        <input
          type="text"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          placeholder="e.g., kg, oz, pcs"
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        />
      </div>

      <button
        onClick={calculate}
        className="w-full px-4 py-3 rounded-lg bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200"
      >
        <DollarSign className="h-4 w-4 inline mr-2" />
        Calculate
      </button>

      {result && (
        <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Price Per Unit</p>
          <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            ${result.pricePerUnit.toFixed(2)}
            {unit ? <span className="text-lg">/{unit}</span> : <span className="text-lg">/unit</span>}
          </p>
          <button onClick={copyResult} className="mt-4 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
            <Copy className="h-4 w-4 inline mr-1" />
            Copy
          </button>
        </div>
      )}
    </div>
  );
}