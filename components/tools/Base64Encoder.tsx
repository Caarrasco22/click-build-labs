'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Copy, ArrowLeftRight, Check } from 'lucide-react';

type Mode = 'encode' | 'decode';

export function Base64Encoder() {
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const process = (value: string, currentMode: Mode) => {
    if (!value.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      if (currentMode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(value))));
      } else {
        setOutput(decodeURIComponent(escape(atob(value.replace(/\s/g, '')))));
      }
      setError('');
    } catch {
      setError('Invalid input for decoding');
      setOutput('');
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    process(value, mode);
  };

  const handleModeSwitch = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    setInput('');
    setOutput('');
    setError('');
  };

  const copyOutput = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const swapValues = () => {
    setInput(output);
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setOutput('');
    setError('');
    if (output) {
      process(output, mode === 'encode' ? 'decode' : 'encode');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5">
          <button
            onClick={() => { setMode('encode'); setInput(''); setOutput(''); setError(''); }}
            className={`px-4 py-2 text-sm rounded-md transition-all ${
              mode === 'encode'
                ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => { setMode('decode'); setInput(''); setOutput(''); setError(''); }}
            className={`px-4 py-2 text-sm rounded-md transition-all ${
              mode === 'decode'
                ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
            }`}
          >
            Decode
          </button>
        </div>

        <Button variant="ghost" size="sm" onClick={handleModeSwitch}>
          <ArrowLeftRight className="h-4 w-4" />
          Switch
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {mode === 'encode' ? 'Text to encode' : 'Base64 to decode'}
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
            className="w-full h-40 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {mode === 'encode' ? 'Base64 output' : 'Decoded text'}
            </label>
            {output && (
              <Button variant="ghost" size="sm" onClick={copyOutput}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            )}
          </div>
          <div className="relative">
            <textarea
              value={error || output}
              readOnly
              placeholder="Output will appear here..."
              className={`w-full h-40 px-4 py-3 rounded-lg border bg-zinc-50 dark:bg-zinc-900 text-sm font-mono resize-none ${
                error
                  ? 'border-red-200 dark:border-red-900 text-red-500'
                  : 'border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100'
              }`}
            />
            {output && !error && (
              <button
                onClick={swapValues}
                className="absolute right-3 top-3 p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                title="Use output as input"
              >
                <ArrowLeftRight className="h-4 w-4 text-zinc-400" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}