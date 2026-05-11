'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw, Info } from 'lucide-react';

interface GradeEntry {
  name: string;
  grade: string;
  credits: string;
}

export function GpaCalculator() {
  const [entries, setEntries] = useState<GradeEntry[]>([
    { name: 'Course 1', grade: '', credits: '' },
  ]);
  const [copied, setCopied] = useState(false);
  const [scale, setScale] = useState<'4.0' | '4.3'>('4.0');

  const gradePoints4 = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
  const gradePoints43 = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
  const gradeValues4 = [4.0, 4.0, 3.7, 3.3, 3.0, 2.7, 2.3, 2.0, 1.7, 1.3, 1.0, 0.7, 0.0];
  const gradeValues43 = [4.3, 4.0, 3.7, 3.3, 3.0, 2.7, 2.3, 2.0, 1.7, 1.3, 1.0, 0.7, 0.0];

  const gradeOptions = scale === '4.0' ? gradePoints4 : gradePoints43;
  const gradeValues = scale === '4.0' ? gradeValues4 : gradeValues43;

  const addEntry = () => {
    setEntries([...entries, { name: `Course ${entries.length + 1}`, grade: '', credits: '' }]);
  };

  const removeEntry = (index: number) => {
    if (entries.length > 1) {
      setEntries(entries.filter((_, i) => i !== index));
    }
  };

  const updateEntry = (index: number, field: keyof GradeEntry, value: string) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const calculateGpa = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    entries.forEach((entry) => {
      const gradeIndex = gradeOptions.indexOf(entry.grade);
      const credits = parseFloat(entry.credits);
      if (gradeIndex !== -1 && !isNaN(credits) && credits > 0) {
        totalPoints += gradeValues[gradeIndex] * credits;
        totalCredits += credits;
      }
    });

    if (totalCredits === 0) return null;
    return totalPoints / totalCredits;
  };

  const gpa = calculateGpa();

  const copyResult = async () => {
    if (gpa !== null) {
      await navigator.clipboard.writeText(`GPA: ${gpa.toFixed(2)}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Grade Scale:</span>
        <select
          value={scale}
          onChange={(e) => setScale(e.target.value as '4.0' | '4.3')}
          className="px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm"
        >
          <option value="4.0">4.0 Scale</option>
          <option value="4.3">4.3 Scale (with A+ = 4.3)</option>
        </select>
      </div>

      <div className="space-y-2">
        {entries.map((entry, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              value={entry.name}
              onChange={(e) => updateEntry(index, 'name', e.target.value)}
              placeholder="Course name"
              className="flex-1 px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm"
            />
            <select
              value={entry.grade}
              onChange={(e) => updateEntry(index, 'grade', e.target.value)}
              className="w-24 px-2 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm"
            >
              <option value="">Grade</option>
              {gradeOptions.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <input
              type="number"
              value={entry.credits}
              onChange={(e) => updateEntry(index, 'credits', e.target.value)}
              placeholder="Credits"
              min="0"
              step="0.5"
              className="w-24 px-2 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm"
            />
            {entries.length > 1 && (
              <button
                onClick={() => removeEntry(index)}
                className="px-2 py-2 text-sm text-red-500 hover:text-red-700"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={addEntry}
          className="px-3 py-1.5 text-sm rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300"
        >
          + Add Course
        </button>
        <button
          onClick={() => setEntries([{ name: 'Course 1', grade: '', credits: '' }])}
          className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Reset
        </button>
        {gpa !== null && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {gpa !== null && (
        <div className="p-6 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
          <p className="text-sm text-green-600 dark:text-green-400 mb-1">Your GPA</p>
          <p className="text-5xl font-bold text-green-700 dark:text-green-300">{gpa.toFixed(2)}</p>
          <p className="text-sm text-green-600/70 dark:text-green-400/70 mt-1">
            on a {scale} scale
          </p>
        </div>
      )}

      <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-700 dark:text-amber-300">
          This calculator provides estimates for informational purposes only. Official GPA should be calculated by your institution using their specific grading policies.
        </p>
      </div>
    </div>
  );
}