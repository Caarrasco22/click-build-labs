'use client';

import { useState, useRef } from 'react';
import { Download, RefreshCw, Info } from 'lucide-react';

export function FaviconGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [sizes, setSizes] = useState<{ 32: string; 64: string } | null>(null);
  const canvas32 = useRef<HTMLCanvasElement>(null);
  const canvas64 = useRef<HTMLCanvasElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
    setSizes(null);

    const img = new window.Image();
    img.onload = () => {
      [32, 64].forEach((size) => {
        const canvas = size === 32 ? canvas32.current : canvas64.current;
        if (!canvas) return;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, size, size);
        const dataUrl = canvas.toDataURL('image/png');
        setSizes(prev => ({ ...prev!, [size]: dataUrl }));
      });
      setSizes({ 32: canvas32.current!.toDataURL('image/png'), 64: canvas64.current!.toDataURL('image/png') });
    };
    img.src = url;
  };

  const download = (size: 32 | 64) => {
    const data = sizes?.[size];
    if (!data) return;
    const a = document.createElement('a');
    a.href = data;
    a.download = `favicon-${size}x${size}.png`;
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Select Image</label>
        <input type="file" accept="image/*" onChange={handleFile} className="w-full text-sm" />
      </div>

      <div className="flex gap-2">
        <button onClick={() => { setFile(null); setPreview(null); setSizes(null); }} className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
      </div>

      {sizes && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center">
              <p className="text-sm text-zinc-500 mb-2">32×32</p>
              <img src={sizes[32]} alt="32x32" className="w-16 h-16 mx-auto rounded" />
              <button onClick={() => download(32)} className="mt-2 px-3 py-1 text-sm rounded-md bg-green-500 text-white hover:bg-green-600">
                <Download className="h-3 w-3 inline mr-1" />
                Download
              </button>
            </div>
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center">
              <p className="text-sm text-zinc-500 mb-2">64×64</p>
              <img src={sizes[64]} alt="64x64" className="w-16 h-16 mx-auto rounded" />
              <button onClick={() => download(64)} className="mt-2 px-3 py-1 text-sm rounded-md bg-green-500 text-white hover:bg-green-600">
                <Download className="h-3 w-3 inline mr-1" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvas32} className="hidden" />
      <canvas ref={canvas64} className="hidden" />

      <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-700 dark:text-amber-300">This generates basic PNG favicons. For a complete favicon package with ICO format, consider using dedicated favicon generators.</p>
      </div>
    </div>
  );
}