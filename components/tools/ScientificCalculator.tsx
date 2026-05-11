'use client';

import { useState, useRef } from 'react';
import { Delete, Info } from 'lucide-react';

export function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [memory, setMemory] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const displayRef = useRef<HTMLInputElement>(null);

  const handleNumber = (num: string) => {
    if (display === '0' && num !== '.') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    setExpression(expression + display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleFunction = (func: string) => {
    const current = parseFloat(display);
    let result: number;

    switch (func) {
      case 'sin':
        result = Math.sin(toRadians(current));
        break;
      case 'cos':
        result = Math.cos(toRadians(current));
        break;
      case 'tan':
        result = Math.tan(toRadians(current));
        break;
      case 'log':
        result = Math.log10(current);
        break;
      case 'ln':
        result = Math.log(current);
        break;
      case 'sqrt':
        result = Math.sqrt(current);
        break;
      case 'pow':
        result = current * current;
        break;
      case 'abs':
        result = Math.abs(current);
        break;
      case 'exp':
        result = Math.exp(current);
        break;
      default:
        return;
    }
    setDisplay(formatResult(result));
  };

  const toRadians = (deg: number): number => {
    return deg * (Math.PI / 180);
  };

  const formatResult = (num: number): string => {
    if (!isFinite(num)) return 'Error';
    if (Math.abs(num) > 999999999) return num.toExponential(4);
    return parseFloat(num.toPrecision(10)).toString();
  };

  const handleEquals = () => {
    try {
      const fullExpression = expression + display;
      const sanitized = fullExpression.replace(/[^0-9+\-*/.()]/g, '');
      const result = evaluateExpression(sanitized);
      setDisplay(formatResult(result));
      setExpression('');
    } catch {
      setDisplay('Error');
    }
  };

  const evaluateExpression = (expr: string): number => {
    const tokens = expr.match(/(\d+\.?\d*)|([+\-*/])/g) || [];
    let result = parseFloat(tokens[0] ?? '') || 0;

    for (let i = 1; i < tokens.length; i += 2) {
      const op = tokens[i] ?? '';
      const next = parseFloat(tokens[i + 1] ?? '') || 0;
      switch (op) {
        case '+': result += next; break;
        case '-': result -= next; break;
        case '*': result *= next; break;
        case '/': result /= next; break;
      }
    }
    return result;
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleMemoryAdd = () => {
    setMemory(memory + parseFloat(display));
  };

  const handleMemoryRecall = () => {
    setDisplay(memory.toString());
  };

  const handleMemoryClear = () => {
    setMemory(0);
  };

  const handlePi = () => {
    setDisplay(Math.PI.toString());
  };

  const handleE = () => {
    setDisplay(Math.E.toString());
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"
        >
          <Info className="h-4 w-4" />
        </button>
        {showInfo && (
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Angle mode: degrees | Clear: C | Backspace: DEL
          </div>
        )}
      </div>

      <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
        <input
          ref={displayRef}
          type="text"
          value={display}
          readOnly
          className="w-full bg-transparent text-right text-2xl font-mono text-zinc-900 dark:text-zinc-100 outline-none"
        />
        {expression && (
          <p className="text-right text-sm text-zinc-500 font-mono mt-1">{expression}</p>
        )}
      </div>

      <div className="grid grid-cols-5 gap-1">
        {['sin', 'cos', 'tan', 'log', 'ln'].map((func) => (
          <button
            key={func}
            onClick={() => handleFunction(func)}
            className="p-2 text-xs font-medium rounded bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300"
          >
            {func}
          </button>
        ))}
        {['sqrt', 'pow', 'abs', 'exp', '('].map((func) => (
          <button
            key={func}
            onClick={() => func === '(' ? setDisplay(display + '(') : handleFunction(func)}
            className="p-2 text-xs font-medium rounded bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300"
          >
            {func === 'pow' ? 'x²' : func}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-1">
        {[
          ['7', '8', '9', '/'],
          ['4', '5', '6', '*'],
          ['1', '2', '3', '-'],
          ['0', '.', ')', '+'],
        ].map((row, rowIdx) =>
          row.map((btn, btnIdx) => (
            <button
              key={`${rowIdx}-${btnIdx}`}
              onClick={() => {
                if ('0123456789.'.includes(btn)) handleNumber(btn);
                else if (btn === ')') setDisplay(display + ')');
                else handleOperator(btn);
              }}
              className={`p-3 text-lg font-medium rounded ${
                isNaN(parseFloat(btn))
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300'
                  : 'bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700'
              }`}
            >
              {btn}
            </button>
          ))
        )}
      </div>

      <div className="grid grid-cols-4 gap-1">
        {[
          ['MC', 'MR', 'M+', 'M-'],
          ['π', 'e', 'DEL', 'C'],
        ].flat().map((btn) => (
          <button
            key={btn}
            onClick={() => {
              switch (btn) {
                case 'MC': handleMemoryClear(); break;
                case 'MR': handleMemoryRecall(); break;
                case 'M+': handleMemoryAdd(); break;
                case 'M-': setMemory(memory - parseFloat(display)); break;
                case 'π': handlePi(); break;
                case 'e': handleE(); break;
                case 'DEL': handleBackspace(); break;
                case 'C': handleClear(); break;
              }
            }}
            className="p-2 text-sm font-medium rounded bg-zinc-300 text-zinc-700 hover:bg-zinc-400 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {btn}
          </button>
        ))}
      </div>

      <button
        onClick={handleEquals}
        className="w-full py-4 text-lg font-bold rounded bg-green-500 text-white hover:bg-green-600"
      >
        =
      </button>

      <div className="flex gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <span>M: {memory.toFixed(2)}</span>
      </div>

      <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-700 dark:text-amber-300">
          Uses degrees for trigonometric functions. Results are estimates for educational purposes only.
        </p>
      </div>
    </div>
  );
}