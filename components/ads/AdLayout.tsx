interface AdLayoutProps {
  children: React.ReactNode;
  toolAds?: { top?: boolean; inline?: boolean; bottom?: boolean };
}

// Do not reserve space or nest another main landmark while manual ads are disabled.
export function AdLayout({ children }: AdLayoutProps) {
  return <>{children}</>;
}
