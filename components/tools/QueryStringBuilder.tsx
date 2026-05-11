'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw, Plus, Trash2 } from 'lucide-react';

interface Param {
  key: string;
  value: string;
}

function buildQueryString(params: Param[]): string {
  const searchParams = new URLSearchParams();
  params.forEach(({ key, value }) => {
    if (key.trim()) searchParams.set(key, value);
  });
  const result = searchParams.toString();
  return result ? '?' + result : '';
}

function parseQueryString(query: string): Param[] {
  const params: Param[] = [];
  try {
    const url = new URL(query.startsWith('?') ? query : '?' + query);
    url.searchParams.forEach((value, key) => {
      params.push({ key, value });
    });
  } catch {
    const cleanQuery = query.startsWith('?') ? query.slice(1) : query;
    cleanQuery.split('&').forEach((pair) => {
      const [key, value] = pair.split('=');
      if (key) params.push({ key: decodeURIComponent(key), value: decodeURIComponent(value || '') });
    });
  }
  return params;
}

export function QueryStringBuilder() {
  const [params, setParams] = useState<Param[]>([{ key: '', value: '' }]);
  const [output, setOutput] = useState('');
  const [parsed, setParsed] = useState<Param[]>([]);
  const [inputMode, setInputMode] = useState<'build' | 'parse'>('build');
  const [copied, setCopied] = useState(false);

  const addParam = () => setParams([...params, { key: '', value: '' }]);

  const removeParam = (index: number) => {
    setParams(params.filter((_, i) => i !== index));
    setOutput('');
  };

  const updateParam = (index: number, field: 'key' | 'value', val: string) => {
    const updated = [...params];
    updated[index][field] = val;
    setParams(updated);
    setOutput(buildQueryString(updated));
  };

  const handleParseInput = (value: string) => {
    if (!value.trim()) {
      setParsed([]);
      return;
    }
    setParsed(parseQueryString(value));
  };

  const copyOutput = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => { setInputMode('build'); setParams([{ key: '', value: '' }]); setOutput(''); setParsed([]); }}
          className={`px-4 py-2 text-sm rounded-lg ${inputMode === 'build' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600'}`}
        >
          Build
        </button>
        <button
          onClick={() => { setInputMode('parse'); setParams([{ key: '', value: '' }]); setOutput(''); setParsed([]); }}
          className={`px-4 py-2 text-sm rounded-lg ${inputMode === 'parse' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600'}`}
        >
          Parse
        </button>
      </div>

      {inputMode === 'build' ? (
        <>
          {params.map((param, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={param.key}
                onChange={(e) => updateParam(i, 'key', e.target.value)}
                placeholder="Key"
                className="flex-1 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm"
              />
              <input
                type="text"
                value={param.value}
                onChange={(e) => updateParam(i, 'value', e.target.value)}
                placeholder="Value"
                className="flex-1 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm"
              />
              <button onClick={() => removeParam(i)} className="p-2 text-zinc-400 hover:text-red-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button onClick={addParam} className="px-3 py-2 text-sm rounded-lg bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
            <Plus className="h-4 w-4 inline" />
            Add Parameter
          </button>
          {output && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Query String</label>
                <button onClick={copyOutput} className="px-3 py-1 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200">
                  {copied ? <Check className="h-4 w-4 inline" /> : <Copy className="h-4 w-4 inline" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="px-4 py-3 rounded-lg border bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-sm font-mono break-all">{output}</pre>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Query String to Parse</label>
            <input
              type="text"
              onChange={(e) => handleParseInput(e.target.value)}
              placeholder="?key1=value1&key2=value2"
              className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-mono"
            />
          </div>
          {parsed.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Parsed Parameters</label>
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                {parsed.map((param, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 last:border-0">
                    <span className="text-sm font-mono text-zinc-600 dark:text-zinc-400">{param.key}</span>
                    <span className="text-sm font-mono text-zinc-900 dark:text-zinc-100">{param.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <button onClick={() => { setParams([{ key: '', value: '' }]); setOutput(''); setParsed([]); }} className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
        <RefreshCw className="h-4 w-4 inline" />
        Clear
      </button>
    </div>
  );
}
