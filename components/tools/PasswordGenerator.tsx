'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Copy, RefreshCw, Check, Eye, EyeOff } from 'lucide-react';

interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

export function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const generate = useCallback(() => {
    let chars = '';
    if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) chars += '0123456789';
    if (options.symbols) chars += SYMBOLS;

    if (!chars) {
      setPassword('');
      return;
    }

    const array = new Uint32Array(options.length);
    crypto.getRandomValues(array);
    setPassword(Array.from(array, (x) => chars[x % chars.length]).join(''));
  }, [options]);

  const copyPassword = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const strength = password.length > 0 ? calculateStrength(password) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            readOnly
            placeholder="Your password will appear here..."
            className="w-full px-4 py-3 pr-12 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-mono tracking-wide"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-zinc-400" />
            ) : (
              <Eye className="h-4 w-4 text-zinc-400" />
            )}
          </button>
        </div>

        <Button variant="secondary" onClick={generate}>
          <RefreshCw className="h-4 w-4" />
          Generate
        </Button>

        <Button variant="ghost" onClick={copyPassword}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>

      {strength && (
        <div className="space-y-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  level <= strength.level
                    ? strength.color === 'green'
                      ? 'bg-green-500'
                      : strength.color === 'yellow'
                        ? 'bg-yellow-500'
                        : strength.color === 'orange'
                          ? 'bg-orange-500'
                          : 'bg-red-500'
                    : 'bg-zinc-200 dark:bg-zinc-800'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {strength.label} · {password.length} characters
          </p>
        </div>
      )}

      <div className="space-y-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4">
        <div className="flex items-center gap-4">
          <label className="text-sm text-zinc-600 dark:text-zinc-400 w-16">
            Length
          </label>
          <input
            type="range"
            min="8"
            max="64"
            value={options.length}
            onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
            className="flex-1"
          />
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 w-8">
            {options.length}
          </span>
        </div>

        <div className="flex flex-wrap gap-4">
          {[
            { key: 'uppercase', label: 'Uppercase (A-Z)' },
            { key: 'lowercase', label: 'Lowercase (a-z)' },
            { key: 'numbers', label: 'Numbers (0-9)' },
            { key: 'symbols', label: 'Symbols (!@#$)' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options[key as keyof PasswordOptions] as boolean}
                onChange={(e) =>
                  setOptions({ ...options, [key]: e.target.checked })
                }
                className="rounded border-zinc-300 dark:border-zinc-600 text-zinc-900 focus:ring-zinc-500"
              />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function calculateStrength(password: string): { level: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { level: 1, label: 'Weak', color: 'red' };
  if (score <= 4) return { level: 2, label: 'Fair', color: 'orange' };
  if (score <= 5) return { level: 3, label: 'Good', color: 'yellow' };
  return { level: 4, label: 'Strong', color: 'green' };
}