import { cn } from '@/lib/utils';

interface AdSlotProps {
  position: 'top' | 'inline' | 'bottom';
  className?: string;
  variant?: 'horizontal' | 'rectangle' | 'auto';
}

export function AdSlot({ position, className, variant = 'horizontal' }: AdSlotProps) {
  const sizeClasses = {
    horizontal: 'h-[90px] w-full max-w-[728px]',
    rectangle: 'h-[250px] w-[300px]',
    auto: 'h-[100px] md:h-[90px] w-full',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center bg-zinc-100 border border-zinc-200 rounded-lg text-zinc-400 text-sm font-medium',
        sizeClasses[variant],
        className
      )}
      data-ad-slot={position}
      data-ad-status="placeholder"
    >
      <div className="text-center px-4">
        <span>Advertisement</span>
        <span className="hidden md:inline"> · </span>
        <span className="text-xs text-zinc-400">Ad space reserved</span>
      </div>
    </div>
  );
}