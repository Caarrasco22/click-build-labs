'use client';

import { useState } from 'react';
import { Users, Copy } from 'lucide-react';

export function SplitBillCalculator() {
  const [total, setTotal] = useState('');
  const [people, setPeople] = useState('2');
  const [tipPercent, setTipPercent] = useState('');
  const [taxPercent, setTaxPercent] = useState('');
  const [result, setResult] = useState<{ perPerson: number; totalWithTip: number } | null>(null);

  const calculate = () => {
    const totalAmount = parseFloat(total);
    const numPeople = parseInt(people);
    if (isNaN(totalAmount) || isNaN(numPeople) || numPeople <= 0) {
      setResult(null);
      return;
    }

    let amount = totalAmount;
    if (tipPercent) amount += totalAmount * (parseFloat(tipPercent) / 100);
    if (taxPercent) amount += totalAmount * (parseFloat(taxPercent) / 100);

    setResult({ perPerson: amount / numPeople, totalWithTip: amount });
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(`$${result.perPerson.toFixed(2)} per person (Total: $${result.totalWithTip.toFixed(2)})`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Bill Total</label>
        <input
          type="number"
          value={total}
          onChange={(e) => { setTotal(e.target.value); setResult(null); }}
          placeholder="0.00"
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">People</label>
          <input
            type="number"
            value={people}
            onChange={(e) => { setPeople(e.target.value); setResult(null); }}
            min="1"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Tip %</label>
          <input
            type="number"
            value={tipPercent}
            onChange={(e) => { setTipPercent(e.target.value); setResult(null); }}
            placeholder="0"
            min="0"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Tax %</label>
          <input
            type="number"
            value={taxPercent}
            onChange={(e) => { setTaxPercent(e.target.value); setResult(null); }}
            placeholder="0"
            min="0"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full px-4 py-3 rounded-lg bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200"
      >
        <Users className="h-4 w-4 inline mr-2" />
        Split Bill
      </button>

      {result && (
        <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Per Person</p>
              <p className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">${result.perPerson.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Total with Tip & Tax</p>
              <p className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">${result.totalWithTip.toFixed(2)}</p>
            </div>
          </div>
          <button onClick={copyResult} className="mt-4 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
            <Copy className="h-4 w-4 inline mr-1" />
            Copy
          </button>
        </div>
      )}
    </div>
  );
}