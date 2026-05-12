'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

interface Fraction {
  num: string;
  den: string;
}

export function FractionCalculator() {
  const [a, setA] = useState<Fraction>({ num: '', den: '' });
  const [b, setB] = useState<Fraction>({ num: '', den: '' });
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');
  const [result, setResult] = useState<{ num: number; den: number; decimal: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const parseFraction = (f: Fraction): { num: number; den: number } | null => {
    const num = parseFloat(f.num);
    const den = parseFloat(f.den);
    if (isNaN(num) || isNaN(den) || den === 0) return null;
    return { num, den };
  };

  const fractionToNumber = (f: { num: number; den: number }): number => f.num / f.den;

  const numberToFraction = (n: number): { num: number; den: number } => {
    const tolerance = 1.0E-6;
    let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
    let b = n;
    do {
      const a = Math.floor(b);
      let aux = h1;
      h1 = a * h1 + h2;
      h2 = aux;
      aux = k1;
      k1 = a * k1 + k2;
      k2 = aux;
      b = 1 / (b - a);
    } while (Math.abs(n - h1 / k1) > n * tolerance && k1 < 10000);
    return { num: Math.round(h1), den: Math.round(k1) };
  };

  const calculate = () => {
    const fa = parseFraction(a);
    const fb = parseFraction(b);
    if (!fa || !fb) {
      setResult(null);
      return;
    }

    let res: { num: number; den: number };
    let decimalResult: number;

    switch (operation) {
      case 'add':
        decimalResult = fractionToNumber(fa) + fractionToNumber(fb);
        const addDen = fa.den * fb.den;
        res = { num: fa.num * fb.den + fb.num * fa.den, den: addDen };
        break;
      case 'subtract':
        decimalResult = fractionToNumber(fa) - fractionToNumber(fb);
        const subDen = fa.den * fb.den;
        res = { num: fa.num * fb.den - fb.num * fa.den, den: subDen };
        break;
      case 'multiply':
        decimalResult = fractionToNumber(fa) * fractionToNumber(fb);
        res = { num: fa.num * fb.num, den: fa.den * fb.den };
        break;
      case 'divide':
        decimalResult = fractionToNumber(fa) / fractionToNumber(fb);
        res = { num: fa.num * fb.den, den: fa.den * fb.num };
        break;
      default:
        return;
    }

    const simplified = numberToFraction(decimalResult);
    const gcd = (x: number, y: number): number => y === 0 ? Math.abs(x) : gcd(y, x % y);
    const divisor = gcd(Math.abs(res.num), Math.abs(res.den));
    res.num /= divisor;
    res.den /= divisor;
    if (res.den < 0) {
      res.num *= -1;
      res.den *= -1;
    }

    setResult({ num: res.num, den: res.den, decimal: decimalResult.toFixed(6).replace(/\.?0+$/, '') });
  };

  const copyResult = async () => {
    if (result) {
      const text = `${result.num}/${result.den}`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOperationChange = (op: 'add' | 'subtract' | 'multiply' | 'divide') => {
    setOperation(op);
    setResult(null);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2 items-center">
        <input
          type="number"
          value={a.num}
          onChange={(e) => { setA({ ...a, num: e.target.value }); setResult(null); }}
          placeholder="Num"
          className="px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center font-mono"
        />
        <span className="text-center text-2xl font-bold text-zinc-400">/</span>
        <input
          type="number"
          value={a.den}
          onChange={(e) => { setA({ ...a, den: e.target.value }); setResult(null); }}
          placeholder="Den"
          className="px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center font-mono"
        />
        <select
          value={operation}
          onChange={(e) => { handleOperationChange(e.target.value as typeof operation); setResult(null); }}
          className="px-2 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-center font-bold"
        >
          <option value="add">+</option>
          <option value="subtract">−</option>
          <option value="multiply">×</option>
          <option value="divide">÷</option>
        </select>
        <input
          type="number"
          value={b.num}
          onChange={(e) => { setB({ ...b, num: e.target.value }); setResult(null); }}
          placeholder="Num"
          className="px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center font-mono"
        />
        <span className="text-center text-2xl font-bold text-zinc-400">/</span>
        <input
          type="number"
          value={b.den}
          onChange={(e) => { setB({ ...b, den: e.target.value }); setResult(null); }}
          placeholder="Den"
          className="px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center font-mono"
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
          onClick={() => { setA({ num: '', den: '' }); setB({ num: '', den: '' }); setResult(null); }}
          className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
        {result && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {result && (
        <div className="space-y-4">
          <div className="p-6 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
            <p className="text-sm text-green-600 dark:text-green-400 mb-1">Result (Simplified)</p>
            <p className="text-4xl font-bold text-green-700 dark:text-green-300">
              {result.num}/{result.den}
            </p>
            <p className="text-lg text-green-600/70 dark:text-green-400/70 mt-2">
              = {result.decimal}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
