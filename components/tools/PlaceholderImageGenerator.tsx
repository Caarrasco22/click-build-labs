'use client';

import { useState, useRef } from 'react';
import { Download, RefreshCw } from 'lucide-react';

export function PlaceholderImageGenerator() {
  const [width, setWidth] = useState('800');
  const [height, setHeight] = useState('600');
  const [bgColor, setBgColor] = useState('#CCCCCC');
  const [textColor, setTextColor] = useState('#666666');
  const [text, setText] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = parseInt(width) || 800;
    canvas.height = parseInt(height) || 600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const label = text || `${canvas.width} × ${canvas.height}`;
    ctx.fillStyle = textColor;
    ctx.font = `bold ${Math.round(canvas.height / 10)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, canvas.width / 2, canvas.height / 2);

    setPreviewUrl(canvas.toDataURL('image/png'));
  };

  const download = () => {
    if (!previewUrl) return;
    const a = document.createElement('a');
    a.href = previewUrl;
    a.download = 'placeholder.png';
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Width</label>
          <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} min="1" className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Height</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} min="1" className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Background</label>
          <div className="flex gap-2">
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
            <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="flex-1 px-2 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-sm" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Text Color</label>
          <div className="flex gap-2">
            <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
            <input type="text" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="flex-1 px-2 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-sm" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Text (optional)</label>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Leave empty for dimensions" className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
      </div>

      <div className="flex gap-2">
        <button onClick={generate} className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium">
          Generate
        </button>
        {previewUrl && (
          <button onClick={download} className="px-3 py-2 text-sm rounded-md bg-green-500 text-white hover:bg-green-600">
            <Download className="h-4 w-4 inline mr-1" />
            Download PNG
          </button>
        )}
        <button onClick={() => { setWidth('800'); setHeight('600'); setBgColor('#CCCCCC'); setTextColor('#666666'); setText(''); setPreviewUrl(null); }} className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Reset
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {previewUrl && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Preview</p>
          <img src={previewUrl} alt="Placeholder" className="max-w-full rounded-lg border border-zinc-200 dark:border-zinc-700" />
        </div>
      )}
    </div>
  );
}