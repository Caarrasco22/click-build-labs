'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function TipCalculator() {
  const [amount, setAmount] = useState('');
  const [tipPercent, setTipPercent] = useState('15');
  const [people, setPeople] = useState('1');
  const [copied, setCopied] = useState(false);

  const amountVal = parseFloat(amount);
  const tipVal = parseFloat(tipPercent);
  const peopleVal = parseInt(people);
  const isValidAmount = !isNaN(amountVal) && amountVal >= 0;
  const isValidTip = !isNaN(tipVal) && tipVal >= 0;
  const isValidPeople = !isNaN(peopleVal) && peopleVal > 0;

  const tipAmount = isValidAmount && isValidTip ? amountVal * (tipVal / 100) : null;
  const totalWithTip = isValidAmount && isValidTip ? amountVal + tipAmount! : null;
  const perPerson = totalWithTip !== null && isValidPeople ? totalWithTip / peopleVal : null;

  const tipStr = tipAmount !== null ? tipAmount.toFixed(2) : '';
  const totalStr = totalWithTip !== null ? totalWithTip.toFixed(2) : '';
  const perPersonStr = perPerson !== null ? perPerson.toFixed(2) : '';

  const copyResult = async () => {
    if (totalStr && perPersonStr) {
      await navigator.clipboard.writeText(`Tip: $${tipStr}, Total: $${totalStr}, Per person: $${perPersonStr}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Bill Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Tip %</label>
          <input
            type="number"
            value={tipPercent}
            onChange={(e) => setTipPercent(e.target.value)}
            placeholder="15"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Split (people)</label>
          <input
            type="number"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            placeholder="1"
            min="1"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => { setAmount(''); setTipPercent('15'); setPeople('1'); }}
          className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
        {totalStr && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {totalWithTip !== null && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20 text-center">
            <p className="text-sm text-amber-600 dark:text-amber-400">Tip Amount</p>
            <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">${tipStr}</p>
          </div>
          <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 text-center">
            <p className="text-sm text-blue-600 dark:text-blue-400">Total with Tip</p>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">${totalStr}</p>
          </div>
          <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
            <p className="text-sm text-green-600 dark:text-green-400">Per Person</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">${perPersonStr}</p>
          </div>
        </div>
      )}
    </div>
  );
}