"use client";

import type { ReactNode } from "react";
import { AppProvider } from "@/components/app-provider";
import { SiteShell } from "@/components/site-shell";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <SiteShell>{children}</SiteShell>
    </AppProvider>
  );
}
