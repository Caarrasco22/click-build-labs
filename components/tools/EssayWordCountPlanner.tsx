'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

interface Section {
  name: string;
  words: string;
}

export function EssayWordCountPlanner() {
  const [totalWords, setTotalWords] = useState('');
  const [sections, setSections] = useState<Section[]>([
    { name: 'Introduction', words: '' },
    { name: 'Body Paragraph 1', words: '' },
    { name: 'Body Paragraph 2', words: '' },
    { name: 'Body Paragraph 3', words: '' },
    { name: 'Conclusion', words: '' },
  ]);
  const [distribution, setDistribution] = useState<'equal' | 'custom'>('equal');
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const updateSection = (index: number, field: keyof Section, value: string) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
    setResult(null);
  };

  const calculate = () => {
    const total = parseFloat(totalWords);
    if (isNaN(total) || total <= 0) {
      setResult(null);
      return;
    }

    if (distribution === 'equal') {
      const perSection = Math.floor(total / sections.length);
      const remainder = total - (perSection * sections.length);
      const distribution_text = sections.map((s, i) => {
        const words = i === sections.length - 1 ? perSection + remainder : perSection;
        return `${s.name}: ${words} words`;
      }).join('\n');
      setResult(distribution_text);
    } else {
      const customTotal = sections.reduce((sum, s) => sum + (parseFloat(s.words) || 0), 0);
      if (customTotal !== total) {
        setResult(`Note: Section totals (${customTotal}) don't match target (${total}). Adjust distribution.`);
      } else {
        const distribution_text = sections.map(s => `${s.name}: ${s.words || 0} words`).join('\n');
        setResult(distribution_text);
      }
    }
  };

  const applyEqualDistribution = () => {
    const total = parseFloat(totalWords) || 0;
    const perSection = Math.floor(total / sections.length);
    const remainder = total - (perSection * sections.length);
    const newSections = sections.map((s, i) => ({
      ...s,
      words: i === sections.length - 1 ? String(perSection + remainder) : String(perSection)
    }));
    setSections(newSections);
  };

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Target Word Count</label>
        <input
          type="number"
          value={totalWords}
          onChange={(e) => { setTotalWords(e.target.value); setResult(null); }}
          placeholder="e.g. 2000"
          min="1"
          className="w-full px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        />
      </div>

      <div className="flex gap-2 items-center">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Distribution:</label>
        <select
          value={distribution}
          onChange={(e) => setDistribution(e.target.value as 'equal' | 'custom')}
          className="px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        >
          <option value="equal">Equal distribution</option>
          <option value="custom">Custom distribution</option>
        </select>
        {distribution === 'equal' && totalWords && (
          <button
            onClick={applyEqualDistribution}
            className="px-3 py-1.5 text-sm rounded-md bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300"
          >
            Apply to sections
          </button>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Sections</label>
        {sections.map((section, index) => (
          <div key={index} className="flex gap-2 items-center">
            <span className="w-32 text-sm text-zinc-600 dark:text-zinc-400 truncate">{section.name}</span>
            <input
              type="number"
              value={section.words}
              onChange={(e) => updateSection(index, 'words', e.target.value)}
              placeholder="words"
              min="0"
              className="flex-1 px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm"
            />
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={calculate}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 font-medium"
        >
          Calculate
        </button>
        <button
          onClick={() => { setTotalWords(''); setSections(sections.map(s => ({ ...s, words: '' }))); setResult(null); }}
          className="px-3 py-2 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Clear
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
        <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20">
          <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">Word Count Distribution</p>
          <pre className="text-sm text-green-600 dark:text-green-400 whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}