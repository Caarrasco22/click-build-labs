'use client';

import { useState, useMemo, useRef } from 'react';
import { Search, X, Hash, Code, Link, Lock, Shield, RefreshCw, Palette, Type } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Tool } from '@/lib/registry';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  tools: Tool[];
  placeholder?: string;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  hash: Hash,
  code: Code,
  link: Link,
  lock: Lock,
  shield: Shield,
  refresh: RefreshCw,
  palette: Palette,
  type: Type,
};

export function SearchBar({ tools, placeholder = 'Search tools...', className }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return tools
      .filter(
        (tool) =>
          tool.name.toLowerCase().includes(q) ||
          tool.shortDescription.toLowerCase().includes(q) ||
          tool.tags.some((t) => t.includes(q))
      )
      .slice(0, 6);
  }, [query, tools]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      router.push(`/tools/${results[selectedIndex].slug}`);
      setIsOpen(false);
      setQuery('');
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
    }
  };

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'flex items-center gap-3 rounded-lg border bg-white px-4 py-3 transition-colors dark:bg-zinc-900 dark:border-zinc-800',
          isOpen && results.length > 0 ? 'border-zinc-300 dark:border-zinc-700' : 'border-zinc-200 dark:border-zinc-700'
        )}
      >
        <Search className="h-4 w-4 text-zinc-400 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400"
        />
        {query ? (
          <button
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-400">
            ⌘K
          </kbd>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div
          className={cn(
            'absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900'
          )}
        >
          {results.map((tool, index) => {
            const Icon = iconMap[tool.icon] || Code;
            return (
              <a
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                }}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 transition-colors',
                  index === selectedIndex
                    ? 'bg-zinc-100 dark:bg-zinc-800'
                    : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                )}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                  <Icon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                    {tool.name}
                  </span>
                  <span className="block text-xs text-zinc-500 dark:text-zinc-400 truncate">
                    {tool.shortDescription}
                  </span>
                </div>
                {index === selectedIndex && (
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">↵</span>
                )}
              </a>
            );
          })}
        </div>
      )}

      {isOpen && query.trim() && results.length === 0 && (
        <div
          className={cn(
            'absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-zinc-200 bg-white px-4 py-8 text-center dark:border-zinc-800 dark:bg-zinc-900'
          )}
        >
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No tools found for &quot;{query}&quot;
          </p>
        </div>
      )}
    </div>
  );
}