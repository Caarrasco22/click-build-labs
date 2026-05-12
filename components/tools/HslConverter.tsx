'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw, AlertCircle } from 'lucide-react';

type Mode = 'hexToHsl' | 'rgbToHsl' | 'hslToHex';

export function HslConverter() {
  const [mode, setMode] = useState<Mode>('hexToHsl');
  const [hex, setHex] = useState('');
  const [r, setR] = useState('');
  const [g, setG] = useState('');
  const [b, setB] = useState('');
  const [h, setH] = useState('');
  const [s, setS] = useState('');
  const [l, setL] = useState('');
  const [result, setResult] = useState<{ hex: string; rgb: string; hsl: string } | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  };

  const convert = () => {
    setError('');
    setResult(null);

    try {
      if (mode === 'hexToHsl') {
        let cleanHex = hex.replace('#', '').trim();
        if (cleanHex.length === 3) cleanHex = cleanHex.split('').map(c => c + c).join('');
        if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) throw new Error('Invalid HEX');
        const r = parseInt(cleanHex.substring(0, 2), 16);
        const g = parseInt(cleanHex.substring(2, 4), 16);
        const b = parseInt(cleanHex.substring(4, 6), 16);
        const hsl = rgbToHsl(r, g, b);
        setResult({
          hex: `#${cleanHex.toUpperCase()}`,
          rgb: `rgb(${r}, ${g}, ${b})`,
          hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
        });
      } else if (mode === 'rgbToHsl') {
        const rVal = parseInt(r), gVal = parseInt(g), bVal = parseInt(b);
        if ([rVal, gVal, bVal].some(v => isNaN(v) || v < 0 || v > 255)) throw new Error('Invalid RGB');
        const hsl = rgbToHsl(rVal, gVal, bVal);
        const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();
        setResult({
          hex: `#${toHex(rVal)}${toHex(gVal)}${toHex(bVal)}`,
          rgb: `rgb(${rVal}, ${gVal}, ${bVal})`,
          hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
        });
      } else {
        const hVal = parseInt(h), sVal = parseInt(s), lVal = parseInt(l);
        if ([hVal, sVal, lVal].some(v => isNaN(v))) throw new Error('Invalid HSL');
        if (hVal < 0 || hVal > 360 || sVal < 0 || sVal > 100 || lVal < 0 || lVal > 100) throw new Error('Invalid HSL range');
        const rgb = hslToRgb(hVal, sVal, lVal);
        const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();
        setResult({
          hex: `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`,
          rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
          hsl: `hsl(${hVal}, ${sVal}%, ${lVal}%)`
        });
      }
    } catch (e) {
      setError('Invalid input. Check your values and try again.');
    }
  };

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(result.hex);
      setCopied(result.hex);
      setTimeout(() => setCopied(''), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(['hexToHsl', 'rgbToHsl', 'hslToHex'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setResult(null); setError(''); }}
            className={`px-3 py-1.5 text-sm rounded-md ${mode === m ? 'bg-blue-500 text-white' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'}`}
          >
            {m === 'hexToHsl' ? 'HEX → HSL' : m === 'rgbToHsl' ? 'RGB → HSL' : 'HSL → HEX'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {mode === 'hexToHsl' && (
          <div className="space-y-2 col-span-3">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">HEX Color</label>
            <input type="text" value={hex} onChange={(e) => setHex(e.target.value)} placeholder="#FF5500" className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono" />
          </div>
        )}
        {mode === 'rgbToHsl' && (
          <>
            <div className="space-y-2"><label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">R</label><input type="number" value={r} onChange={(e) => setR(e.target.value)} placeholder="255" min="0" max="255" className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">G</label><input type="number" value={g} onChange={(e) => setG(e.target.value)} placeholder="0" min="0" max="255" className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">B</label><input type="number" value={b} onChange={(e) => setB(e.target.value)} placeholder="0" min="0" max="255" className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" /></div>
          </>
        )}
        {mode === 'hslToHex' && (
          <>
            <div className="space-y-2"><label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">H (0-360)</label><input type="number" value={h} onChange={(e) => setH(e.target.value)} placeholder="0" min="0" max="360" className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">S (0-100)</label><input type="number" value={s} onChange={(e) => setS(e.target.value)} placeholder="0" min="0" max="100" className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">L (0-100)</label><input type="number" value={l} onChange={(e) => setL(e.target.value)} placeholder="0" min="0" max="100" className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" /></div>
          </>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={convert} className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium">Convert</button>
        <button onClick={() => { setHex(''); setR(''); setG(''); setB(''); setH(''); setS(''); setL(''); setResult(null); setError(''); }} className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"><RefreshCw className="h-4 w-4 inline mr-1" />Clear</button>
        {result && (
          <button onClick={copyResult} className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">
            {copied === result.hex ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied === result.hex ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {result && (
        <div className="space-y-4">
          <div className="w-full h-24 rounded-lg border border-zinc-200 dark:border-zinc-700" style={{ backgroundColor: result.hex }} />
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center">
              <p className="text-xs text-zinc-500">HEX</p>
              <p className="font-mono font-bold text-sm">{result.hex}</p>
            </div>
            <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center">
              <p className="text-xs text-zinc-500">RGB</p>
              <p className="font-mono font-bold text-sm">{result.rgb}</p>
            </div>
            <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center">
              <p className="text-xs text-zinc-500">HSL</p>
              <p className="font-mono font-bold text-sm">{result.hsl}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}