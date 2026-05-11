'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface AngleInfo {
  degrees: number;
  radians: string;
  sin: string;
  cos: string;
  tan: string;
}

const ANGLES: { label: string; degrees: number }[] = [
  { label: '0°', degrees: 0 },
  { label: '30°', degrees: 30 },
  { label: '45°', degrees: 45 },
  { label: '60°', degrees: 60 },
  { label: '90°', degrees: 90 },
  { label: '120°', degrees: 120 },
  { label: '135°', degrees: 135 },
  { label: '150°', degrees: 150 },
  { label: '180°', degrees: 180 },
  { label: '210°', degrees: 210 },
  { label: '225°', degrees: 225 },
  { label: '240°', degrees: 240 },
  { label: '270°', degrees: 270 },
  { label: '300°', degrees: 300 },
  { label: '315°', degrees: 315 },
  { label: '330°', degrees: 330 },
  { label: '360°', degrees: 360 },
];

const formatValue = (val: number, isTan: boolean = false): string => {
  if (isNaN(val) || !isFinite(val)) return 'undefined';
  if (val === 0) return '0';
  const rounded = Math.round(val * 1000) / 1000;
  if (Math.abs(rounded - Math.round(rounded)) < 0.001) {
    return Math.round(rounded).toString();
  }
  return rounded.toFixed(3).replace(/\.?0+$/, '');
};

const simplifySqrt = (n: number): string => {
  if (n === 0) return '0';
  if (n === 1) return '1';
  const sqrt2 = Math.sqrt(n);
  if (Math.abs(sqrt2 - Math.round(sqrt2)) < 0.0001) {
    return Math.round(sqrt2).toString();
  }
  const perfectSquares: Record<number, string> = {
    2: '√2', 3: '√3', 5: '√5', 6: '√6', 7: '√7', 10: '√10'
  };
  for (const [sq, root] of Object.entries(perfectSquares)) {
    if (Math.abs(n - parseInt(sq)) < 0.1) {
      return root;
    }
  }
  return `√${n}`;
};

export function UnitCircleHelper() {
  const [selectedAngle, setSelectedAngle] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const radians = (selectedAngle * Math.PI) / 180;
  const sin = Math.sin(radians);
  const cos = Math.cos(radians);
  const tan = cos !== 0 ? sin / cos : Infinity;

  const getSinDisplay = (): string => {
    const deg = selectedAngle % 360;
    if (deg === 0 || deg === 360) return '0';
    if (deg === 90) return '1';
    if (deg === 270) return '-1';
    if (deg === 30) return '1/2';
    if (deg === 150) return '1/2';
    if (deg === 210) return '-1/2';
    if (deg === 330) return '-1/2';
    if (deg === 45) return simplifySqrt(2) + '/2';
    if (deg === 135) return simplifySqrt(2) + '/2';
    if (deg === 225) return '-' + simplifySqrt(2) + '/2';
    if (deg === 315) return '-' + simplifySqrt(2) + '/2';
    return formatValue(sin);
  };

  const getCosDisplay = (): string => {
    const deg = selectedAngle % 360;
    if (deg === 90 || deg === 270) return '0';
    if (deg === 0) return '1';
    if (deg === 180) return '-1';
    if (deg === 60) return '1/2';
    if (deg === 300) return '1/2';
    if (deg === 120) return '-1/2';
    if (deg === 240) return '-1/2';
    if (deg === 45) return simplifySqrt(2) + '/2';
    if (deg === 315) return simplifySqrt(2) + '/2';
    if (deg === 135) return '-' + simplifySqrt(2) + '/2';
    if (deg === 225) return '-' + simplifySqrt(2) + '/2';
    return formatValue(cos);
  };

  const getTanDisplay = (): string => {
    const deg = selectedAngle % 360;
    if (deg === 90 || deg === 270) return 'undefined';
    if (deg === 0 || deg === 180 || deg === 360) return '0';
    if (deg === 45 || deg === 225) return '1';
    if (deg === 135 || deg === 315) return '-1';
    if (deg === 30 || deg === 210) return simplifySqrt(3) + '/3';
    if (deg === 150 || deg === 330) return '-' + simplifySqrt(3) + '/3';
    if (deg === 60 || deg === 240) return simplifySqrt(3);
    if (deg === 120 || deg === 300) return '-' + simplifySqrt(3);
    return formatValue(tan);
  };

  const radiansDisplay = `${(selectedAngle * Math.PI / 180).toFixed(4)} rad`;

  const copyResult = async () => {
    const text = `${selectedAngle}° (${radiansDisplay}): sin=${getSinDisplay()}, cos=${getCosDisplay()}, tan=${getTanDisplay()}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Select Angle</label>
        <div className="flex flex-wrap gap-2">
          {ANGLES.map((a) => (
            <button
              key={a.degrees}
              onClick={() => setSelectedAngle(a.degrees)}
              className={`px-3 py-1.5 text-sm rounded-md font-mono ${
                selectedAngle === a.degrees
                  ? 'bg-blue-500 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20">
        <div className="text-center mb-4">
          <p className="text-4xl font-bold text-green-700 dark:text-green-300">{selectedAngle}°</p>
          <p className="text-lg text-green-600/70 dark:text-green-400/70">{radiansDisplay}</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white dark:bg-zinc-800 rounded-lg">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">sin</p>
            <p className="text-2xl font-bold font-mono text-blue-700 dark:text-blue-300">{getSinDisplay()}</p>
          </div>
          <div className="text-center p-3 bg-white dark:bg-zinc-800 rounded-lg">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">cos</p>
            <p className="text-2xl font-bold font-mono text-purple-700 dark:text-purple-300">{getCosDisplay()}</p>
          </div>
          <div className="text-center p-3 bg-white dark:bg-zinc-800 rounded-lg">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">tan</p>
            <p className="text-2xl font-bold font-mono text-amber-700 dark:text-amber-300">{getTanDisplay()}</p>
          </div>
        </div>
      </div>

      <button
        onClick={copyResult}
        className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
      >
        {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
        {copied ? 'Copied!' : 'Copy Values'}
      </button>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        <p><strong>Note:</strong> Tan is undefined at 90° and 270° where cosine is zero.</p>
        <p>These values are exact for the listed angles on the unit circle.</p>
      </div>
    </div>
  );
}