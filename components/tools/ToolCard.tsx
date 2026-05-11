import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CATEGORY_LABELS } from '@/lib/registry';
import type { Tool } from '@/lib/registry';
import { ArrowRight } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  showCategory?: boolean;
}

export function ToolCard({ tool, showCategory = true }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.slug}`}>
      <Card hover className="h-full group">
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              {tool.featured && <Badge variant="outline">Featured</Badge>}
              {tool.popular && !tool.featured && <Badge variant="outline">Popular</Badge>}
            </div>
            {showCategory && (
              <span className="text-xs text-zinc-400 dark:text-zinc-500 shrink-0">
                {CATEGORY_LABELS[tool.category]}
              </span>
            )}
          </div>

          <h3 className="text-base font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors dark:text-zinc-100 dark:group-hover:text-zinc-300">
            {tool.name}
          </h3>

          <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
            {tool.shortDescription}
          </p>

          <div className="mt-auto pt-4 flex items-center text-xs text-zinc-400 group-hover:text-zinc-600 transition-colors dark:text-zinc-500 dark:group-hover:text-zinc-300">
            <span>Use tool</span>
            <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Card>
    </Link>
  );
}