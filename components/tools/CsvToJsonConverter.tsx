'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw, Download } from 'lucide-react';

function parseCSV(input: string): { headers: string[]; rows: string[][] } | null {
  const lines = input.trim().split('\n');
  if (lines.length === 0) return null;

  const parseRow = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  const headers = parseRow(lines[0]);
  const rows = lines.slice(1).map(parseRow);
  return { headers, rows };
}

export function CsvToJsonConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const convert = (value: string) => {
    if (!value.trim()) {
      setOutput('');
      setError('');
      return;
    }
    const parsed = parseCSV(value);
    if (!parsed || parsed.headers.length === 0) {
      setError('Invalid CSV format');
      setOutput('');
      return;
    }
    const jsonArray = parsed.rows.map((row) => {
      const obj: Record<string, string> = {};
      parsed.headers.forEach((h, i) => { obj[h] = row[i] || ''; });
      return obj;
    });
    setOutput(JSON.stringify(jsonArray, null, 2));
    setError('');
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    convert(value);
  };

  const copyOutput = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadJson = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="name,age,city&#10;John,30,NYC&#10;Jane,25,LA"
        className="w-full h-40 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400"
      />

      <div className="flex gap-2">
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
          <RefreshCw className="h-4 w-4 inline" />
          Clear
        </button>
        {output && (
          <>
            <button onClick={copyOutput} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
              {copied ? <Check className="h-4 w-4 inline" /> : <Copy className="h-4 w-4 inline" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button onClick={downloadJson} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
              <Download className="h-4 w-4 inline" />
              Download
            </button>
          </>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {output && !error && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">JSON Output</label>
          <textarea
            value={output}
            readOnly
            className="w-full h-40 px-4 py-3 rounded-lg border bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-sm font-mono resize-none"
          />
        </div>
      )}
    </div>
  );
}
