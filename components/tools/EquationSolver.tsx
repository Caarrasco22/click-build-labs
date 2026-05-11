'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw, Info } from 'lucide-react';

export function EquationSolver() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const solveLinear = (aVal: number, bVal: number, cVal: number): { x: number } => {
    const stepsArr: string[] = [];
    stepsArr.push(`Equation: ${aVal}x + ${bVal} = ${cVal}`);
    stepsArr.push(`Step 1: Subtract ${bVal} from both sides`);
    stepsArr.push(`${aVal}x = ${cVal} - ${bVal}`);
    stepsArr.push(`${aVal}x = ${cVal - bVal}`);
    stepsArr.push(`Step 2: Divide both sides by ${aVal}`);
    stepsArr.push(`x = ${cVal - bVal} / ${aVal}`);
    stepsArr.push(`x = ${(cVal - bVal) / aVal}`);
    setSteps(stepsArr);
    return { x: (cVal - bVal) / aVal };
  };

  const solveQuadratic = (aVal: number, bVal: number, cVal: number): { x1: number; x2: number } | { x: number } | { complex: true; re: number; im: number } => {
    const stepsArr: string[] = [];
    stepsArr.push(`Equation: ${aVal}x² + ${bVal}x + ${cVal} = 0`);
    stepsArr.push(`Using quadratic formula: x = (-b ± √(b² - 4ac)) / 2a`);
    stepsArr.push(`a = ${aVal}, b = ${bVal}, c = ${cVal}`);

    const discriminant = bVal * bVal - 4 * aVal * cVal;
    stepsArr.push(`Discriminant = b² - 4ac = ${bVal}² - 4(${aVal})(${cVal}) = ${discriminant}`);

    if (discriminant > 0) {
      stepsArr.push(`Discriminant > 0: Two real solutions`);
      const x1 = (-bVal + Math.sqrt(discriminant)) / (2 * aVal);
      const x2 = (-bVal - Math.sqrt(discriminant)) / (2 * aVal);
      stepsArr.push(`x = (-${bVal} ± √${discriminant}) / ${2 * aVal}`);
      stepsArr.push(`x₁ = ${x1.toFixed(6)}`);
      stepsArr.push(`x₂ = ${x2.toFixed(6)}`);
      setSteps(stepsArr);
      return { x1, x2 };
    } else if (discriminant === 0) {
      stepsArr.push(`Discriminant = 0: One repeated solution`);
      const x = -bVal / (2 * aVal);
      stepsArr.push(`x = ${x.toFixed(6)}`);
      setSteps(stepsArr);
      return { x };
    } else {
      const re = -bVal / (2 * aVal);
      const im = Math.sqrt(-discriminant) / (2 * aVal);
      stepsArr.push(`Discriminant < 0: Complex solutions`);
      stepsArr.push(`x = ${re.toFixed(4)} ± ${im.toFixed(4)}i`);
      setSteps(stepsArr);
      return { complex: true, re, im };
    }
  };

  const calculate = () => {
    setResult(null);
    setSteps([]);

    const aVal = parseFloat(a);
    const bVal = parseFloat(b);
    const cVal = parseFloat(c);

    if (isNaN(aVal) || isNaN(bVal) || isNaN(cVal)) {
      setResult('Please enter valid numbers for all fields');
      return;
    }

    if (aVal === 0) {
      const sol = solveLinear(bVal, 0, cVal);
      setResult(`Linear equation: x = ${sol.x.toFixed(6)}`);
    } else {
      const sol = solveQuadratic(aVal, bVal, cVal);
      if ('x1' in sol) {
        setResult(`Quadratic: x₁ = ${sol.x1.toFixed(6)}, x₂ = ${sol.x2.toFixed(6)}`);
      } else if ('x' in sol) {
        setResult(`Quadratic (repeated root): x = ${sol.x.toFixed(6)}`);
      } else if (sol.complex) {
        const sign1 = sol.im >= 0 ? '+' : '-';
        const sign2 = sol.im >= 0 ? '+' : '-';
        setResult(`Complex: x = ${sol.re.toFixed(4)} ${sign1} ${Math.abs(sol.im).toFixed(4)}i`);
      }
    }
  };

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="a"
            className="w-20 px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center font-mono"
          />
          <span className="text-lg font-bold text-zinc-400">x² +</span>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            placeholder="b"
            className="w-20 px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center font-mono"
          />
          <span className="text-lg font-bold text-zinc-400">x +</span>
          <input
            type="number"
            value={c}
            onChange={(e) => setC(e.target.value)}
            placeholder="c"
            className="w-20 px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center font-mono"
          />
          <span className="text-lg font-bold text-zinc-400">= 0</span>
        </div>
        <p className="text-xs text-zinc-500 text-center">
          Enter 0 for a coefficient if it does not exist in your equation
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={calculate}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium"
        >
          Solve
        </button>
        <button
          onClick={() => { setA(''); setB(''); setC(''); setResult(null); setSteps([]); }}
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
        <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20">
          <p className="text-sm text-green-600 dark:text-green-400 mb-1">Solution</p>
          <p className="text-xl font-bold text-green-700 dark:text-green-300">{result}</p>
        </div>
      )}

      {steps.length > 0 && (
        <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Steps</p>
          <div className="space-y-1">
            {steps.map((step, i) => (
              <p key={i} className="text-xs font-mono text-zinc-600 dark:text-zinc-400">{step}</p>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-700 dark:text-amber-300">
          Solves linear (ax + b = c) and quadratic (ax² + bx + c = 0) equations. For quadratic, enter a ≠ 0.
        </p>
      </div>
    </div>
  );
}