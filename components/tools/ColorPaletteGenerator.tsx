'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ColorItem {
  hex: string;
  type: string;
}

export function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState('#3B82F6');
  const [palette, setPalette] = useState<ColorItem[]>([]);
  const [copied, setCopied] = useState('');

  const hexToRgb = (hex: string) => {
    const clean = hex.replace('#', '');
    return {
      r: parseInt(clean.substring(0, 2), 16),
      g: parseInt(clean.substring(2, 4), 16),
      b: parseInt(clean.substring(4, 6), 16)
    };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => Math.min(255, Math.max(0, Math.round(x))).toString(16).padStart(2, '0')).join('').toUpperCase();
  };

  const generatePalette = () => {
    const { r, g, b } = hexToRgb(baseColor);
    const colors: ColorItem[] = [];

    for (let i = 0; i < 5; i++) {
      const factor = 1 - (i * 0.15);
      colors.push({
        hex: rgbToHex(r * factor, g * factor, b * factor),
        type: `shade-${(10 - i * 2) * 10}`
      });
    }

    for (let i = 1; i <= 5; i++) {
      const factor = 1 + (i * 0.15);
      colors.push({
        hex: rgbToHex(Math.min(255, r * factor), Math.min(255, g * factor), Math.min(255, b * factor)),
        type: `tint-${i * 10}`
      });
    }

    const compR = 255 - r;
    const compG = 255 - g;
    const compB = 255 - b;
    colors.push({ hex: rgbToHex(compR, compG, compB), type: 'complementary' });

    const h = (r / 255 + 30 / 360) % 1;
    const h2 = (r / 255 - 30 / 360 + 1) % 1;
    const s = 0.7, l = 0.5;
    colors.push({ hex: rgbToHex(Math.round(s * 255), Math.round((l - 0.1) * 255), Math.round((l - 0.1) * 255)), type: 'analogous-1' });
    colors.push({ hex: rgbToHex(Math.round((l - 0.1) * 255), Math.round(s * 255), Math.round((l - 0.1) * 255)), type: 'analogous-2' });

    setPalette(colors);
  };

  const copyColor = async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(''), 2000);
  };

  const copyAll = async () => {
    const text = palette.map(c => `${c.type}: ${c.hex}`).join('\n');
    await navigator.clipboard.writeText(text);
    setCopied('all');
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Base Color (HEX)</label>
        <div className="flex gap-4">
          <input
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="w-12 h-10 rounded cursor-pointer"
          />
          <input
            type="text"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            placeholder="#3B82F6"
            className="flex-1 px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={generatePalette}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium"
        >
          Generate Palette
        </button>
        {palette.length > 0 && (
          <button
            onClick={copyAll}
            className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {copied === 'all' ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied === 'all' ? 'Copied!' : 'Copy All'}
          </button>
        )}
      </div>

      {palette.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {palette.map((color, i) => (
            <div key={i} className="space-y-1">
              <div
                className="h-16 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer relative group"
                style={{ backgroundColor: color.hex }}
                onClick={() => copyColor(color.hex)}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg">
                  {copied === color.hex ? <Check className="h-4 w-4 text-white" /> : <Copy className="h-4 w-4 text-white" />}
                </div>
              </div>
              <p className="text-xs font-mono text-center">{color.hex}</p>
              <p className="text-xs text-zinc-500 text-center">{color.type}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}