'use client';

import { useState, useRef } from 'react';
import { Download, RefreshCw, Info } from 'lucide-react';

export function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [origDims, setOrigDims] = useState<{ w: number; h: number } | null>(null);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
    setResizedUrl(null);
    const img = new window.Image();
    img.onload = () => {
      setOrigDims({ w: img.width, h: img.height });
      setWidth(String(img.width));
      setHeight(String(img.height));
    };
    img.src = url;
  };

  const handleWidthChange = (w: string) => {
    setWidth(w);
    if (maintainRatio && origDims && w) {
      const ratio = origDims.h / origDims.w;
      setHeight(String(Math.round(parseFloat(w) * ratio)));
    }
  };

  const handleHeightChange = (h: string) => {
    setHeight(h);
    if (maintainRatio && origDims && h) {
      const ratio = origDims.w / origDims.h;
      setWidth(String(Math.round(parseFloat(h) * ratio)));
    }
  };

  const resize = () => {
    if (!preview || !width || !height || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = parseInt(width);
    canvas.height = parseInt(height);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = new window.Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      setResizedUrl(canvas.toDataURL('image/png'));
    };
    img.src = preview;
  };

  const download = () => {
    if (!resizedUrl) return;
    const a = document.createElement('a');
    a.href = resizedUrl;
    a.download = file?.name ? `resized_${file.name}` : 'resized_image.png';
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Select Image</label>
        <input type="file" accept="image/*" onChange={handleFile} className="w-full text-sm" />
      </div>

      {preview && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Width (px)</label>
              <input type="number" value={width} onChange={(e) => handleWidthChange(e.target.value)} min="1" className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Height (px)</label>
              <input type="number" value={height} onChange={(e) => handleHeightChange(e.target.value)} min="1" className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <input type="checkbox" checked={maintainRatio} onChange={(e) => setMaintainRatio(e.target.checked)} className="rounded" />
            Maintain aspect ratio
          </label>
          {origDims && <p className="text-xs text-zinc-500">Original: {origDims.w} × {origDims.h}px</p>}
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={resize} disabled={!preview} className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium disabled:opacity-50">
          Resize Image
        </button>
        {resizedUrl && (
          <button onClick={download} className="px-3 py-2 text-sm rounded-md bg-green-500 text-white hover:bg-green-600">
            <Download className="h-4 w-4 inline mr-1" />
            Download
          </button>
        )}
        <button onClick={() => { setFile(null); setPreview(null); setOrigDims(null); setWidth(''); setHeight(''); setResizedUrl(null); }} className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {resizedUrl && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Preview</p>
          <img src={resizedUrl} alt="Resized" className="max-w-full rounded-lg border border-zinc-200 dark:border-zinc-700" />
        </div>
      )}

      <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-700 dark:text-amber-300">Images are processed locally in your browser. No data is uploaded to any server.</p>
      </div>
    </div>
  );
}