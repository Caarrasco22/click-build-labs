'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw, AlertCircle, Info } from 'lucide-react';

export function ImageToBase64() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setError('');
    setResult('');

    if (f.size > 5 * 1024 * 1024) {
      setError('Image is too large. Consider using a smaller image (under 5MB).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setResult(dataUrl);
    };
    reader.onerror = () => {
      setError('Error reading file. Please try another image.');
    };
    reader.readAsDataURL(f);
  };

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Select Image</label>
        <input type="file" accept="image/*" onChange={handleFile} className="w-full text-sm" />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={copyResult} disabled={!result} className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 disabled:opacity-50">
          {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
          {copied ? 'Copied!' : 'Copy Base64'}
        </button>
        <button onClick={() => { setFile(null); setResult(''); setError(''); }} className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
      </div>

      {result && (
        <div className="space-y-3">
          {file && <p className="text-sm text-zinc-500">Original size: {formatSize(file.size)} | Base64 length: {result.length} chars</p>}
          <textarea
            value={result}
            readOnly
            rows={6}
            className="w-full px-3 py-2 rounded-md border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 font-mono text-xs resize-none"
          />
          <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800">
            <p className="text-xs text-zinc-500">Preview (data URL format)</p>
            <img src={result} alt="Preview" className="max-w-full h-32 object-contain rounded mt-2" />
          </div>
        </div>
      )}

      <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-700 dark:text-amber-300">Images are processed locally in your browser. Base64 output can be used directly in CSS or HTML.</p>
      </div>
    </div>
  );
}