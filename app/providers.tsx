"use client";

import type { ReactNode } from "react";
import { AppProvider } from "@/components/app-provider";
import { AuthProvider } from "@/components/auth-provider";
import { SiteShell } from "@/components/site-shell";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AppProvider>
        <SiteShell>{children}</SiteShell>
      </AppProvider>
    </AuthProvider>
  );
}
