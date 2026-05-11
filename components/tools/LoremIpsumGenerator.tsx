'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Copy, Check, RefreshCw, FileText, Type, AlignLeft } from 'lucide-react';

type OutputMode = 'paragraphs' | 'sentences' | 'words';

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'in', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa', 'qui',
  'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'nihil',
  'impedit', 'quo', 'plus', 'quia', 'nulla', 'possimus', 'enim', 'minim',
  'quibusdam', 'illo', 'inventore', 'veritatis', ' quasi', 'architecto', 'beatae',
  'vitae', 'dicta', 'explicabo', 'aspernatur', 'aut', 'odit', 'fugit', 'consequuntur',
  'magni', 'dolores', 'eos', 'ratione', 'sequi', 'nesciunt', 'neque', 'porro',
];

function generateLoremText(mode: OutputMode, count: number): string {
  const getSentence = () => {
    const words = [];
    const length = 8 + Math.floor(Math.random() * 8);
    for (let i = 0; i < length; i++) {
      words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
    }
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
  };

  const getParagraph = () => {
    const sentences = [];
    const count = 4 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      sentences.push(getSentence());
    }
    return sentences.join(' ');
  };

  switch (mode) {
    case 'paragraphs': {
      const paragraphs = [];
      for (let i = 0; i < count; i++) {
        paragraphs.push(getParagraph());
      }
      return paragraphs.join('\n\n');
    }
    case 'sentences': {
      const sentences = [];
      for (let i = 0; i < count; i++) {
        sentences.push(getSentence());
      }
      return sentences.join(' ');
    }
    case 'words': {
      const words = [];
      for (let i = 0; i < count; i++) {
        words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
      }
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      return words.join(' ') + '.';
    }
  }
}

export function LoremIpsumGenerator() {
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<OutputMode>('paragraphs');
  const [count, setCount] = useState(3);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setOutput(generateLoremText(mode, count));
  };

  const copyOutput = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const modeConfig: { key: OutputMode; label: string; icon: React.ComponentType<{ className?: string }>; defaultCount: number }[] = [
    { key: 'paragraphs', label: 'Paragraphs', icon: FileText, defaultCount: 3 },
    { key: 'sentences', label: 'Sentences', icon: AlignLeft, defaultCount: 12 },
    { key: 'words', label: 'Words', icon: Type, defaultCount: 50 },
  ];

  const currentConfig = modeConfig.find((m) => m.key === mode)!;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-2">
          {modeConfig.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => {
                setMode(key);
                setCount(modeConfig.find((m) => m.key === key)!.defaultCount);
              }}
              className={`px-3 py-1.5 text-sm rounded-md transition-all flex items-center gap-1.5 ${
                mode === key
                  ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-zinc-600 dark:text-zinc-400">
            Count:
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
            className="w-20 px-3 py-1.5 text-sm rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="secondary" onClick={generate}>
          <RefreshCw className="h-4 w-4" />
          Generate
        </Button>
        {output && (
          <Button variant="ghost" onClick={copyOutput}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        )}
        {output && (
          <Button variant="ghost" onClick={() => setOutput('')}>
            <RefreshCw className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {output && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Generated Text
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="Generated Lorem Ipsum will appear here..."
            className="w-full h-64 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm resize-none"
          />
        </div>
      )}
    </div>
  );
}
