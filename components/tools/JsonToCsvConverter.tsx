'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw, Download } from 'lucide-react';

interface ParsedRow { [key: string]: string | number | boolean | null | undefined }

function parseJson(input: string): { headers: string[]; rows: string[][] } | null {
  try {
    const data = JSON.parse(input);
    if (!Array.isArray(data) || data.length === 0) return null;

    const headers = Object.keys(data[0]);
    const rows = data.map((item: ParsedRow) => headers.map((h) => String(item[h] ?? '')));
    return { headers, rows };
  } catch {
    return null;
  }
}

function toCsv(headers: string[], rows: string[][]): string {
  const escape = (val: string) => `"${val.replace(/"/g, '""')}"`;
  return [
    headers.map(escape).join(','),
    ...rows.map((row) => row.map(escape).join(',')),
  ].join('\n');
}

export function JsonToCsvConverter() {
  const [input, setInput] = useState('');
  const [csv, setCsv] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const convert = (value: string) => {
    if (!value.trim()) {
      setCsv('');
      setError('');
      return;
    }

    const result = parseJson(value);
    if (!result) {
      setError('Invalid JSON. Provide an array of objects.');
      setCsv('');
      return;
    }

    setCsv(toCsv(result.headers, result.rows));
    setError('');
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    convert(value);
  };

  const copyCsv = async () => {
    if (csv) {
      await navigator.clipboard.writeText(csv);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadCsv = () => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">JSON Input</label>
        <textarea
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder='[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'
          className="w-full h-40 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400"
        />
      </div>

      <div className="flex gap-2">
        <button onClick={() => { setInput(''); setCsv(''); setError(''); }} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200">
          <RefreshCw className="h-4 w-4 inline" />
          Clear
        </button>
        {csv && (
          <>
            <button onClick={copyCsv} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200">
              {copied ? <Check className="h-4 w-4 inline" /> : <Copy className="h-4 w-4 inline" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button onClick={downloadCsv} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200">
              <Download className="h-4 w-4 inline" />
              Download CSV
            </button>
          </>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {csv && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">CSV Output</label>
          <textarea
            value={csv}
            readOnly
            className="w-full h-40 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-mono resize-none"
          />
        </div>
      )}
    </div>
  );
}
