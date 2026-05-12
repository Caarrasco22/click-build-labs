'use client';

import { useState } from 'react';
import { Download, RefreshCw, AlertCircle, Info } from 'lucide-react';

export function Base64ToImage() {
  const [input, setInput] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState('');

  const convert = () => {
    setError('');
    setPreview(null);

    let dataUrl = input.trim();
    if (!dataUrl.startsWith('data:')) {
      if (dataUrl.match(/^[A-Za-z0-9+/=]+$/)) {
        setError('Invalid input. Please paste a complete Base64 data URL (starts with data:image/...)');
        return;
      }
      setError('Invalid image data. Please paste a valid Base64 data URL.');
      return;
    }

    try {
      setPreview(dataUrl);
    } catch {
      setError('Error processing image data. Please check your input.');
    }
  };

  const download = () => {
    if (!preview) return;
    const a = document.createElement('a');
    a.href = preview;
    a.download = 'converted_image.png';
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Paste Base64 Data URL</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="data:image/png;base64,..."
          rows={6}
          className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-xs resize-none"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={convert} disabled={!input.trim()} className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium disabled:opacity-50">
          Convert to Image
        </button>
        {preview && (
          <button onClick={download} className="px-3 py-2 text-sm rounded-md bg-green-500 text-white hover:bg-green-600">
            <Download className="h-4 w-4 inline mr-1" />
            Download
          </button>
        )}
        <button onClick={() => { setInput(''); setPreview(null); setError(''); }} className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
      </div>

      {preview && (
        <div className="space-y-3">
          <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20">
            <p className="text-sm text-green-600 dark:text-green-400 mb-2">Preview</p>
            <img src={preview} alt="Converted" className="max-w-full rounded-lg" />
          </div>
        </div>
      )}

      <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-700 dark:text-amber-300">Images are processed locally in your browser. No data is sent to any server.</p>
      </div>
    </div>
  );
}