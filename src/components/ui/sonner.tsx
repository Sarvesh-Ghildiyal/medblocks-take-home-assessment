// components/ui/sonner.tsx
"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

const CustomToaster = () => {
  const { theme = "system" } = useTheme();

  return (
    <Toaster
      theme={theme}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
    />
  );
};

export { CustomToaster as Toaster };
