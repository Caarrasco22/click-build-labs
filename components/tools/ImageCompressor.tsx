'use client';

import { useState, useRef } from 'react';
import { Download, RefreshCw, Info } from 'lucide-react';

export function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState('80');
  const [origSize, setOrigSize] = useState<number | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setOrigSize(f.size);
    setCompressedUrl(null);
    setCompressedSize(null);
  };

  const compress = () => {
    if (!file || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = new window.Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg', parseInt(quality) / 100);
      setCompressedUrl(dataUrl);
      const base64 = dataUrl.split(',')[1];
      const size = (base64.length * 3) / 4;
      setCompressedSize(Math.round(size));
    };
    img.src = URL.createObjectURL(file);
  };

  const download = () => {
    if (!compressedUrl) return;
    const a = document.createElement('a');
    a.href = compressedUrl;
    a.download = file?.name ? `compressed_${file.name.replace(/\.[^.]+$/, '.jpg')}` : 'compressed_image.jpg';
    a.click();
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

      {file && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Quality ({quality}%)</label>
            <input type="range" min="10" max="100" value={quality} onChange={(e) => setQuality(e.target.value)} className="w-full" />
          </div>
          {origSize && <p className="text-sm text-zinc-500">Original size: {formatSize(origSize)}</p>}
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={compress} disabled={!file} className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium disabled:opacity-50">
          Compress Image
        </button>
        {compressedUrl && (
          <button onClick={download} className="px-3 py-2 text-sm rounded-md bg-green-500 text-white hover:bg-green-600">
            <Download className="h-4 w-4 inline mr-1" />
            Download
          </button>
        )}
        <button onClick={() => { setFile(null); setOrigSize(null); setCompressedUrl(null); setCompressedSize(null); }} className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {compressedUrl && (
        <div className="space-y-3">
          <div className="flex gap-4 text-sm">
            {origSize && <span className="text-zinc-500">Original: {formatSize(origSize)}</span>}
            {compressedSize && <span className="text-green-600 font-medium">Compressed: {formatSize(compressedSize)} ({origSize ? Math.round((compressedSize / origSize) * 100) : 0}%)</span>}
          </div>
          <img src={compressedUrl} alt="Compressed" className="max-w-full rounded-lg border border-zinc-200 dark:border-zinc-700" />
        </div>
      )}

      <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-700 dark:text-amber-300">This is a basic client-side compression using Canvas API. Results may vary. Images are processed locally only.</p>
      </div>
    </div>
  );
}