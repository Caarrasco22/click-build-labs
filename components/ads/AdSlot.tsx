interface AdSlotProps {
  position: 'top' | 'inline' | 'bottom';
  className?: string;
  variant?: 'horizontal' | 'rectangle' | 'auto';
}

// Manual inventory is intentionally disabled until real slot IDs and consent are configured.
export function AdSlot(_props: AdSlotProps) {
  void _props;
  return null;
}
