'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="hidden dark:block h-5 w-5 text-zinc-400" />
      <Moon className="dark:hidden h-5 w-5 text-zinc-600" />
    </button>
  );
}
