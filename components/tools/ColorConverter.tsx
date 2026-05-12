'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Copy, Check, RefreshCw, Pipette } from 'lucide-react';

type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'hsv' | 'cmyk';

interface ColorValues {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  hsv: { h: number; s: number; v: number };
  cmyk: { c: number; m: number; y: number; k: number };
}

function hexToRgb(hex: string): ColorValues['rgb'] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    const shortResult = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(hex);
    if (!shortResult) return null;
    return {
      r: parseInt(shortResult[1] + shortResult[1], 16),
      g: parseInt(shortResult[2] + shortResult[2], 16),
      b: parseInt(shortResult[3] + shortResult[3], 16),
    };
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

function rgbToHsl(r: number, g: number, b: number): ColorValues['hsl'] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function rgbToHsv(r: number, g: number, b: number): ColorValues['hsv'] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

function rgbToCmyk(r: number, g: number, b: number): ColorValues['cmyk'] {
  if (r === 0 && g === 0 && b === 0) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }
  const c = 1 - r / 255;
  const m = 1 - g / 255;
  const y = 1 - b / 255;
  const k = Math.min(c, m, y);
  return {
    c: Math.round(((c - k) / (1 - k)) * 100),
    m: Math.round(((m - k) / (1 - k)) * 100),
    y: Math.round(((y - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}

function parseRgb(input: string): ColorValues['rgb'] | null {
  const match = input.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (match) {
    return {
      r: Math.min(255, parseInt(match[1])),
      g: Math.min(255, parseInt(match[2])),
      b: Math.min(255, parseInt(match[3])),
    };
  }
  return null;
}

function parseHsl(input: string): ColorValues['hsl'] | null {
  const match = input.match(/hsla?\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?/i);
  if (match) {
    return {
      h: parseInt(match[1]),
      s: parseInt(match[2]),
      l: parseInt(match[3]),
    };
  }
  return null;
}

function hslToRgb(h: number, s: number, l: number): ColorValues['rgb'] {
  h /= 360;
  s /= 100;
  l /= 100;
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function formatRgb(r: number, g: number, b: number): string {
  return `rgb(${r}, ${g}, ${b})`;
}

function formatHsl(h: number, s: number, l: number): string {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function formatHsv(h: number, s: number, v: number): string {
  return `hsv(${h}, ${s}%, ${v}%)`;
}

function formatCmyk(c: number, m: number, y: number, k: number): string {
  return `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;
}

const DEFAULT_RGB = { r: 59, g: 130, b: 246 };
const DEFAULT_COLOR: ColorValues = {
  hex: rgbToHex(DEFAULT_RGB.r, DEFAULT_RGB.g, DEFAULT_RGB.b),
  rgb: DEFAULT_RGB,
  hsl: rgbToHsl(DEFAULT_RGB.r, DEFAULT_RGB.g, DEFAULT_RGB.b),
  hsv: rgbToHsv(DEFAULT_RGB.r, DEFAULT_RGB.g, DEFAULT_RGB.b),
  cmyk: rgbToCmyk(DEFAULT_RGB.r, DEFAULT_RGB.g, DEFAULT_RGB.b),
};

export function ColorConverter() {
  const [input, setInput] = useState('#3b82f6');
  const [color, setColor] = useState<ColorValues | null>(DEFAULT_COLOR);
  const [copied, setCopied] = useState<ColorFormat | null>(null);
  const [colorPickerRef, setColorPickerRef] = useState<HTMLInputElement | null>(null);

  const handleColorChange = (value: string) => {
    setInput(value);
    const trimmed = value.trim();

    if (trimmed.startsWith('#')) {
      const rgb = hexToRgb(trimmed);
      if (rgb) {
        setColor({
          hex: rgbToHex(rgb.r, rgb.g, rgb.b),
          rgb,
          hsl: rgbToHsl(rgb.r, rgb.g, rgb.b),
          hsv: rgbToHsv(rgb.r, rgb.g, rgb.b),
          cmyk: rgbToCmyk(rgb.r, rgb.g, rgb.b),
        });
        return;
      }
    }

    const rgb = parseRgb(trimmed);
    if (rgb) {
      setColor({
        hex: rgbToHex(rgb.r, rgb.g, rgb.b),
        rgb,
        hsl: rgbToHsl(rgb.r, rgb.g, rgb.b),
        hsv: rgbToHsv(rgb.r, rgb.g, rgb.b),
        cmyk: rgbToCmyk(rgb.r, rgb.g, rgb.b),
      });
      return;
    }

    const hsl = parseHsl(trimmed);
    if (hsl) {
      const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
      setColor({
        hex: rgbToHex(rgb.r, rgb.g, rgb.b),
        rgb,
        hsl,
        hsv: rgbToHsv(rgb.r, rgb.g, rgb.b),
        cmyk: rgbToCmyk(rgb.r, rgb.g, rgb.b),
      });
      return;
    }

    setColor(null);
  };

  const copyValue = async (format: ColorFormat) => {
    if (!color) return;
    let value = '';
    switch (format) {
      case 'hex':
        value = color.hex;
        break;
      case 'rgb':
        value = formatRgb(color.rgb.r, color.rgb.g, color.rgb.b);
        break;
      case 'hsl':
        value = formatHsl(color.hsl.h, color.hsl.s, color.hsl.l);
        break;
      case 'hsv':
        value = formatHsv(color.hsv.h, color.hsv.s, color.hsv.v);
        break;
      case 'cmyk':
        value = formatCmyk(color.cmyk.c, color.cmyk.m, color.cmyk.y, color.cmyk.k);
        break;
    }
    await navigator.clipboard.writeText(value);
    setCopied(format);
    setTimeout(() => setCopied(null), 2000);
  };

  const colorRows: { format: ColorFormat; label: string; value: () => string }[] = [
    { format: 'hex', label: 'HEX', value: () => color?.hex || '' },
    { format: 'rgb', label: 'RGB', value: () => color ? formatRgb(color.rgb.r, color.rgb.g, color.rgb.b) : '' },
    { format: 'hsl', label: 'HSL', value: () => color ? formatHsl(color.hsl.h, color.hsl.s, color.hsl.l) : '' },
    { format: 'hsv', label: 'HSV', value: () => color ? formatHsv(color.hsv.h, color.hsv.s, color.hsv.v) : '' },
    { format: 'cmyk', label: 'CMYK', value: () => color ? formatCmyk(color.cmyk.c, color.cmyk.m, color.cmyk.y, color.cmyk.k) : '' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Color Preview
          </label>
          <div className="relative">
            <div
              className="w-24 h-24 rounded-lg border border-zinc-200 dark:border-zinc-800 cursor-pointer overflow-hidden"
              style={{ backgroundColor: color?.hex || '#ffffff' }}
              onClick={() => colorPickerRef?.click()}
            />
            <input
              ref={setColorPickerRef}
              type="color"
              value={color?.hex || '#ffffff'}
              onChange={(e) => handleColorChange(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button
              onClick={() => colorPickerRef?.click()}
              className="absolute bottom-1 right-1 p-1.5 rounded-md bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              <Pipette className="h-3 w-3 text-zinc-600 dark:text-zinc-400" />
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Enter Color (HEX, RGB, or HSL)
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => handleColorChange(e.target.value)}
            placeholder="#3b82f6"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Converted Values
        </label>
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-800">
          {colorRows.map(({ format, label, value }) => (
            <div
              key={format}
              className="flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 w-10">
                  {label}
                </span>
                <code className="text-sm font-mono text-zinc-900 dark:text-zinc-100">
                  {value()}
                </code>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyValue(format)}
              >
                {copied === format ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
