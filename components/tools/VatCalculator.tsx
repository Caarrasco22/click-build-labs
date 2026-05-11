'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw, ArrowLeftRight } from 'lucide-react';

type VatMode = 'add' | 'extract';

export function VatCalculator() {
  const [price, setPrice] = useState('');
  const [vatPercent, setVatPercent] = useState('21');
  const [mode, setMode] = useState<VatMode>('add');
  const [copied, setCopied] = useState(false);

  const priceVal = parseFloat(price);
  const vatVal = parseFloat(vatPercent);
  const isValidPrice = !isNaN(priceVal) && priceVal >= 0;
  const isValidVat = !isNaN(vatVal) && vatVal >= 0;

  const vatAmount = isValidPrice && isValidVat ? (mode === 'add' ? priceVal * (vatVal / 100) : priceVal * vatVal / (100 + vatVal)) : null;
  const totalPrice = isValidPrice && isValidVat ? (mode === 'add' ? priceVal + vatAmount! : priceVal) : null;
  const basePrice = mode === 'extract' && isValidPrice && isValidVat ? priceVal / (1 + vatVal / 100) : null;

  const resultStr = totalPrice !== null ? totalPrice.toFixed(2) : '';
  const vatStr = vatAmount !== null ? vatAmount.toFixed(2) : '';
  const baseStr = basePrice !== null ? basePrice.toFixed(2) : '';

  const copyResult = async () => {
    if (resultStr) {
      await navigator.clipboard.writeText(resultStr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5">
        <button
          onClick={() => { setMode('add'); setPrice(''); }}
          className={`flex-1 px-3 py-2 text-sm rounded-md transition-all ${mode === 'add' ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900' : 'text-zinc-600'}`}
        >
          Add VAT
        </button>
        <button
          onClick={() => { setMode('extract'); setPrice(''); }}
          className={`flex-1 px-3 py-2 text-sm rounded-md transition-all ${mode === 'extract' ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900' : 'text-zinc-600'}`}
        >
          Extract from Total
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {mode === 'add' ? 'Price without VAT' : 'Price with VAT'}
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">VAT %</label>
          <input
            type="number"
            value={vatPercent}
            onChange={(e) => setVatPercent(e.target.value)}
            placeholder="21"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => { setPrice(''); }}
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

      {totalPrice !== null && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Base Price</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">${mode === 'add' ? price || '0.00' : baseStr}</p>
          </div>
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">VAT ({vatPercent}%)</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">${vatStr}</p>
          </div>
          <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center sm:col-span-2">
            <p className="text-sm text-green-600 dark:text-green-400">Total Price</p>
            <p className="text-3xl font-bold text-green-700 dark:text-green-300">${resultStr}</p>
          </div>
        </div>
      )}
    </div>
  );
}