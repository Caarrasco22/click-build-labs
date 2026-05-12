'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function ContrastChecker() {
  const [fg, setFg] = useState('#000000');
  const [bg, setBg] = useState('#FFFFFF');
  const [result, setResult] = useState<{ ratio: string; aa: { normal: boolean; large: boolean }; aaa: { normal: boolean; large: boolean } } | null>(null);
  const [copied, setCopied] = useState(false);

  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const getContrastRatio = (hex1: string, hex2: string) => {
    const parse = (h: string) => ({
      r: parseInt(h.replace('#', '').substring(0, 2), 16),
      g: parseInt(h.replace('#', '').substring(2, 4), 16),
      b: parseInt(h.replace('#', '').substring(4, 6), 16)
    });
    const p1 = parse(hex1);
    const p2 = parse(hex2);
    const l1 = getLuminance(p1.r, p1.g, p1.b);
    const l2 = getLuminance(p2.r, p2.g, p2.b);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  };

  const check = () => {
    const ratio = getContrastRatio(fg, bg);
    setResult({
      ratio: ratio.toFixed(2),
      aa: { normal: ratio >= 4.5, large: ratio >= 3 },
      aaa: { normal: ratio >= 7, large: ratio >= 4.5 }
    });
  };

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(`Contrast ratio: ${result.ratio}:1`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Foreground (Text)</label>
          <div className="flex gap-2">
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
            <input type="text" value={fg} onChange={(e) => setFg(e.target.value)} className="flex-1 px-2 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-sm" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Background</label>
          <div className="flex gap-2">
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
            <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} className="flex-1 px-2 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-sm" />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={check}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium"
        >
          Check Contrast
        </button>
        <button
          onClick={() => { setFg('#000000'); setBg('#FFFFFF'); setResult(null); }}
          className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Reset
        </button>
        {result && (
          <button
            onClick={copyResult}
            className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {result && (
        <div className="space-y-4">
          <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-700" style={{ backgroundColor: bg }}>
            <p style={{ color: fg }} className="text-lg font-bold">Large Text Preview</p>
            <p style={{ color: fg }} className="text-sm">Small text preview - at least 14px or 18px bold</p>
          </div>

          <div className="p-6 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 text-center">
            <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Contrast Ratio</p>
            <p className="text-4xl font-bold text-blue-700 dark:text-blue-300">{result.ratio}:1</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center">
              <p className="text-xs text-zinc-500 mb-2">WCAG AA</p>
              <div className="space-y-1">
                <p className={`text-sm font-medium ${result.aa.normal ? 'text-green-600' : 'text-red-600'}`}>
                  Normal text: {result.aa.normal ? 'Pass ✓' : 'Fail ✗'}
                </p>
                <p className={`text-sm font-medium ${result.aa.large ? 'text-green-600' : 'text-red-600'}`}>
                  Large text: {result.aa.large ? 'Pass ✓' : 'Fail ✗'}
                </p>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center">
              <p className="text-xs text-zinc-500 mb-2">WCAG AAA</p>
              <div className="space-y-1">
                <p className={`text-sm font-medium ${result.aaa.normal ? 'text-green-600' : 'text-red-600'}`}>
                  Normal text: {result.aaa.normal ? 'Pass ✓' : 'Fail ✗'}
                </p>
                <p className={`text-sm font-medium ${result.aaa.large ? 'text-green-600' : 'text-red-600'}`}>
                  Large text: {result.aaa.large ? 'Pass ✓' : 'Fail ✗'}
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            <strong>Note:</strong> This is an approximation for planning purposes. Test with your specific fonts and use cases.
          </p>
        </div>
      )}
    </div>
  );
}