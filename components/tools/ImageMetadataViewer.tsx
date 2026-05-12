'use client';

import { useState } from 'react';
import { RefreshCw, Info } from 'lucide-react';

export function ImageMetadataViewer() {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<{ name: string; size: string; type: string; width: number; height: number; ratio: string } | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const img = new window.Image();
    img.onload = () => {
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const g = gcd(img.width, img.height);
      setMetadata({
        name: f.name,
        size: formatSize(f.size),
        type: f.type || 'unknown',
        width: img.width,
        height: img.height,
        ratio: `${img.width / g}:${img.height / g}`
      });
    };
    img.src = URL.createObjectURL(f);
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

      <div className="flex gap-2">
        <button onClick={() => { setFile(null); setMetadata(null); }} className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
      </div>

      {metadata && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <p className="text-xs text-zinc-500">Filename</p>
              <p className="font-medium truncate">{metadata.name}</p>
            </div>
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <p className="text-xs text-zinc-500">File Size</p>
              <p className="font-medium">{metadata.size}</p>
            </div>
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <p className="text-xs text-zinc-500">MIME Type</p>
              <p className="font-medium">{metadata.type}</p>
            </div>
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <p className="text-xs text-zinc-500">Dimensions</p>
              <p className="font-medium">{metadata.width} × {metadata.height} px</p>
            </div>
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 col-span-2">
              <p className="text-xs text-zinc-500">Aspect Ratio</p>
              <p className="font-medium">{metadata.ratio}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-700 dark:text-amber-300">This tool shows basic metadata available through browser APIs. EXIF data and other advanced metadata are not read.</p>
      </div>
    </div>
  );
}