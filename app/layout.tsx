import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: "BrinKids | Party toys booked like events",
  description: "A playful booking marketplace for parents and children’s party equipment.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
