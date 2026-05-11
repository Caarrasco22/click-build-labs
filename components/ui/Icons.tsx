import {
  Code,
  Image,
  RefreshCw,
  Wrench,
  Zap,
  Hash,
  Link,
  Lock,
  Shield,
  Type,
  Palette,
  QrCode,
} from 'lucide-react';
import type { ToolCategory } from '@/lib/registry';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code,
  image: Image,
  refresh: RefreshCw,
  wrench: Wrench,
  zap: Zap,
  hash: Hash,
  link: Link,
  lock: Lock,
  shield: Shield,
  type: Type,
  palette: Palette,
  qr: QrCode,
};

interface CategoryIconProps {
  name: string;
  className?: string;
}

export function CategoryIcon({ name, className }: CategoryIconProps) {
  const Icon = iconMap[name] || Code;
  return <Icon className={className} />;
}

export function getCategoryIcon(category: ToolCategory) {
  const icons: Record<ToolCategory, string> = {
    text: 'type',
    image: 'image',
    dev: 'code',
    utility: 'wrench',
    converter: 'refresh',
    generator: 'zap',
  };
  return icons[category] || 'code';
}