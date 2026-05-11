import { AdSlot } from './AdSlot';

interface AdLayoutProps {
  children: React.ReactNode;
  toolAds?: {
    top?: boolean;
    inline?: boolean;
    bottom?: boolean;
  };
}

export function AdLayout({ children, toolAds }: AdLayoutProps) {
  const globalSlots = {
    top: true,
    inline: true,
    bottom: true,
  };

  const effectiveSlots = {
    top: toolAds?.top ?? globalSlots.top,
    inline: toolAds?.inline ?? globalSlots.inline,
    bottom: toolAds?.bottom ?? globalSlots.bottom,
  };

  return (
    <div className="flex flex-col min-h-screen">
      {effectiveSlots.top && (
        <div className="flex justify-center py-4 px-4">
          <AdSlot position="top" variant="auto" />
        </div>
      )}

      <main className="flex-1">
        {children}
      </main>

      {effectiveSlots.inline && (
        <div className="flex justify-center py-4 px-4">
          <AdSlot position="inline" variant="auto" />
        </div>
      )}

      {effectiveSlots.bottom && (
        <div className="flex justify-center py-4 px-4">
          <AdSlot position="bottom" variant="auto" />
        </div>
      )}
    </div>
  );
}