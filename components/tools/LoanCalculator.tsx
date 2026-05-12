'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function LoanCalculator() {
  const [principal, setPrincipal] = useState('');
  const [interest, setInterest] = useState('');
  const [months, setMonths] = useState('');
  const [copied, setCopied] = useState(false);

  const p = parseFloat(principal);
  const r = parseFloat(interest);
  const m = parseFloat(months);
  const isValidP = !isNaN(p) && p > 0;
  const isValidR = !isNaN(r) && r >= 0;
  const isValidM = !isNaN(m) && m > 0;

  const monthlyPayment = isValidP && isValidR && isValidM
    ? r === 0
      ? p / m
      : (p * (r / 100 / 12) * Math.pow(1 + r / 100 / 12, m)) / (Math.pow(1 + r / 100 / 12, m) - 1)
    : null;

  const totalPaid = monthlyPayment !== null ? monthlyPayment * m : null;
  const totalInterest = totalPaid !== null ? totalPaid - p : null;

  const paymentStr = monthlyPayment !== null ? monthlyPayment.toFixed(2) : '';
  const totalStr = totalPaid !== null ? totalPaid.toFixed(2) : '';
  const interestStr = totalInterest !== null ? totalInterest.toFixed(2) : '';

  const copyResult = async () => {
    if (paymentStr) {
      await navigator.clipboard.writeText(`Monthly: $${paymentStr}, Total: $${totalStr}, Interest: $${interestStr}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <p className="text-xs text-amber-700 dark:text-amber-300">
          <strong>Disclaimer:</strong> Results are estimates for informational purposes only and are not financial advice.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Loan Amount ($)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="10000"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Interest Rate (%/year)</label>
          <input
            type="number"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            placeholder="5"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Loan Term (months)</label>
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            placeholder="36"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-lg"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => { setPrincipal(''); setInterest(''); setMonths(''); }}
          className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
        {paymentStr && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {monthlyPayment !== null && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
            <p className="text-sm text-green-600 dark:text-green-400">Monthly Payment</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">${paymentStr}</p>
          </div>
          <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 text-center">
            <p className="text-sm text-blue-600 dark:text-blue-400">Total Paid</p>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">${totalStr}</p>
          </div>
          <div className="p-4 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 text-center">
            <p className="text-sm text-red-600 dark:text-red-400">Interest</p>
            <p className="text-2xl font-bold text-red-700 dark:text-red-300">${interestStr}</p>
          </div>
        </div>
      )}
    </div>
  );
}
