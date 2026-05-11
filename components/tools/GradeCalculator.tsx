'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

interface Assessment {
  name: string;
  score: string;
  weight: string;
}

export function GradeCalculator() {
  const [assessments, setAssessments] = useState<Assessment[]>([
    { name: 'Exam', score: '', weight: '' },
  ]);
  const [copied, setCopied] = useState(false);
  const [targetGrade, setTargetGrade] = useState('');

  const addAssessment = () => {
    setAssessments([...assessments, { name: '', score: '', weight: '' }]);
  };

  const removeAssessment = (index: number) => {
    if (assessments.length > 1) {
      setAssessments(assessments.filter((_, i) => i !== index));
    }
  };

  const updateAssessment = (index: number, field: keyof Assessment, value: string) => {
    const newAssessments = [...assessments];
    newAssessments[index][field] = value;
    setAssessments(newAssessments);
  };

  const calculateCurrentGrade = () => {
    let totalWeightedScore = 0;
    let totalWeight = 0;

    assessments.forEach((a) => {
      const score = parseFloat(a.score);
      const weight = parseFloat(a.weight);
      if (!isNaN(score) && !isNaN(weight) && weight > 0) {
        totalWeightedScore += score * (weight / 100);
        totalWeight += weight;
      }
    });

    return totalWeight > 0 ? totalWeightedScore / (totalWeight / 100) : null;
  };

  const calculateNeededForTarget = () => {
    if (!targetGrade) return null;

    const current = calculateCurrentGrade();
    const target = parseFloat(targetGrade);

    if (isNaN(target)) return null;

    let totalWeight = 0;
    let currentWeightedScore = 0;

    assessments.forEach((a) => {
      const weight = parseFloat(a.weight);
      const score = parseFloat(a.score);
      if (!isNaN(weight) && weight > 0) {
        totalWeight += weight;
        if (!isNaN(score)) {
          currentWeightedScore += score * (weight / 100);
        }
      }
    });

    const remainingWeight = 100 - totalWeight;
    if (remainingWeight <= 0) return null;

    const needed = ((target * 100) - currentWeightedScore) / remainingWeight;
    return needed;
  };

  const currentGrade = calculateCurrentGrade();
  const neededForTarget = calculateNeededForTarget();

  const copyResult = async () => {
    if (currentGrade !== null) {
      await navigator.clipboard.writeText(`Current Grade: ${currentGrade.toFixed(2)}%`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Assessments</p>
        {assessments.map((assessment, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              value={assessment.name}
              onChange={(e) => updateAssessment(index, 'name', e.target.value)}
              placeholder="Assessment name"
              className="flex-1 px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm"
            />
            <input
              type="number"
              value={assessment.score}
              onChange={(e) => updateAssessment(index, 'score', e.target.value)}
              placeholder="Score %"
              min="0"
              max="100"
              className="w-24 px-2 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm"
            />
            <input
              type="number"
              value={assessment.weight}
              onChange={(e) => updateAssessment(index, 'weight', e.target.value)}
              placeholder="Weight %"
              min="0"
              max="100"
              className="w-24 px-2 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm"
            />
            {assessments.length > 1 && (
              <button
                onClick={() => removeAssessment(index)}
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
          onClick={addAssessment}
          className="px-3 py-1.5 text-sm rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300"
        >
          + Add Assessment
        </button>
        <button
          onClick={() => setAssessments([{ name: '', score: '', weight: '' }])}
          className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Reset
        </button>
        {currentGrade !== null && (
          <button
            onClick={copyResult}
            className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {copied ? <Check className="h-4 w-4 inline mr-1" /> : <Copy className="h-4 w-4 inline mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {currentGrade !== null && (
        <div className="p-6 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-center">
          <p className="text-sm text-green-600 dark:text-green-400 mb-1">Current Grade</p>
          <p className="text-5xl font-bold text-green-700 dark:text-green-300">{currentGrade.toFixed(2)}%</p>
        </div>
      )}

      <div className="flex gap-2 items-center">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
          Target Grade:
        </label>
        <input
          type="number"
          value={targetGrade}
          onChange={(e) => setTargetGrade(e.target.value)}
          placeholder="e.g. 85"
          min="0"
          max="100"
          className="px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm w-24"
        />
        <span className="text-sm text-zinc-500">%</span>
      </div>

      {targetGrade && neededForTarget !== null && (
        <div className={`p-4 rounded-lg border ${
          neededForTarget > 100 
            ? 'border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20' 
            : 'border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20'
        }`}>
          {neededForTarget > 100 ? (
            <p className="text-sm text-red-700 dark:text-red-300">
              Target grade is not achievable with remaining assessments (would need {neededForTarget.toFixed(0)}%).
            </p>
          ) : neededForTarget < 0 ? (
            <p className="text-sm text-green-700 dark:text-green-300">
              You have already exceeded your target grade!
            </p>
          ) : (
            <p className="text-sm text-blue-700 dark:text-blue-300">
              You need an average of <span className="font-bold">{neededForTarget.toFixed(2)}%</span> on remaining assessments to reach {targetGrade}%.
            </p>
          )}
        </div>
      )}
    </div>
  );
}