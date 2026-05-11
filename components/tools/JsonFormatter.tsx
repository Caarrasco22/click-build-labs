'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Copy, Check, Trash2, ArrowDownAZ, Minimize2, Braces } from 'lucide-react';

type FormatMode = 'beautify' | 'minify' | 'validate';

export function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<FormatMode>('beautify');

  const process = (value: string, currentMode: FormatMode) => {
    if (!value.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      const parsed = JSON.parse(value);

      if (currentMode === 'beautify') {
        setOutput(JSON.stringify(parsed, null, 2));
        setError('');
      } else if (currentMode === 'minify') {
        setOutput(JSON.stringify(parsed));
        setError('');
      } else {
        setOutput('Valid JSON ✓');
        setError('');
      }
    } catch (err) {
      if (currentMode === 'validate') {
        setOutput('');
        setError((err as Error).message);
      } else {
        setOutput('');
        setError((err as Error).message);
      }
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    process(value, mode);
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
      <div className="flex items-center gap-2">
        <div className="flex rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5">
          {[
            { key: 'beautify', icon: ArrowDownAZ, label: 'Beautify' },
            { key: 'minify', icon: Minimize2, label: 'Minify' },
            { key: 'validate', icon: Braces, label: 'Validate' },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => { setMode(key as FormatMode); process(input, key as FormatMode); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-all ${
                mode === key
                  ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        <Button variant="ghost" size="sm" onClick={() => { setInput(''); setOutput(''); setError(''); }}>
          <Trash2 className="h-4 w-4" />
          Clear
        </Button>

        {output && output !== 'Valid JSON ✓' && (
          <Button variant="ghost" size="sm" onClick={copyOutput}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Input JSON
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder='{"key": "value"}'
            className="w-full h-48 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Output
          </label>
          <div className="relative">
            <textarea
              value={error || output}
              readOnly
              placeholder="Formatted JSON will appear here..."
              className={`w-full h-48 px-4 py-3 rounded-lg border bg-zinc-50 dark:bg-zinc-900 text-sm font-mono resize-none ${
                error
                  ? 'border-red-200 dark:border-red-900 text-red-500'
                  : 'border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}