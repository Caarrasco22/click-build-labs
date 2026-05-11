import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-zinc-200 bg-white p-5 transition-all duration-150',
        'dark:border-zinc-800 dark:bg-zinc-900/50',
        hover &&
          'hover:border-zinc-300 hover:bg-white hover:shadow-sm',
        'dark:hover:border-zinc-700 dark:hover:bg-zinc-900',
        className
      )}
    >
      {children}
    </div>
  );
}