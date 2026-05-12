'use client';

import { useState, useRef } from 'react';
import { Copy, Check, RefreshCw, Info } from 'lucide-react';

export function ImageColorPicker() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<{ hex: string; rgb: string } | null>(null);
  const [copied, setCopied] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setImageUrl(url);
    setSelectedColor(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!canvasRef.current || !imgRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = imgRef.current.width;
    canvas.height = imgRef.current.height;
    ctx.drawImage(imgRef.current, 0, 0);

    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = '#' + [pixel[0], pixel[1], pixel[2]].map(c => c.toString(16).padStart(2, '0')).join('').toUpperCase();
    setSelectedColor({ hex, rgb: `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})` });
  };

  const copyHex = async () => {
    if (selectedColor) {
      await navigator.clipboard.writeText(selectedColor.hex);
      setCopied('hex');
      setTimeout(() => setCopied(''), 2000);
    }
  };

  const copyRgb = async () => {
    if (selectedColor) {
      await navigator.clipboard.writeText(selectedColor.rgb);
      setCopied('rgb');
      setTimeout(() => setCopied(''), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Select Image</label>
        <input type="file" accept="image/*" onChange={handleFile} className="w-full text-sm" />
      </div>

      <div className="flex gap-2">
        <button onClick={() => { setFile(null); setImageUrl(null); setSelectedColor(null); }} className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {imageUrl && (
        <div className="space-y-3">
          <img
            ref={imgRef}
            src={imageUrl}
            alt="Click to pick color"
            onClick={handleClick}
            className="max-w-full rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-crosshair"
          />
          <p className="text-xs text-zinc-500">Click anywhere on the image to pick a color</p>
        </div>
      )}

      {selectedColor && (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-zinc-500">HEX</p>
              <button onClick={copyHex} className="text-xs text-blue-500 hover:text-blue-700">
                {copied === 'hex' ? <Check className="h-3 w-3 inline" /> : <Copy className="h-3 w-3 inline" />}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded border border-zinc-200 dark:border-zinc-700" style={{ backgroundColor: selectedColor.hex }} />
              <span className="font-mono font-bold">{selectedColor.hex}</span>
            </div>
          </div>
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-zinc-500">RGB</p>
              <button onClick={copyRgb} className="text-xs text-blue-500 hover:text-blue-700">
                {copied === 'rgb' ? <Check className="h-3 w-3 inline" /> : <Copy className="h-3 w-3 inline" />}
              </button>
            </div>
            <p className="font-mono text-sm">{selectedColor.rgb}</p>
          </div>
        </div>
      )}

      <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-700 dark:text-amber-300">Images are processed locally in your browser. Click on the image to pick a color from any pixel.</p>
      </div>
    </div>
  );
}