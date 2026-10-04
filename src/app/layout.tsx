import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";

import { Providers } from "@/components/shared/Providers";
import { cn } from "@/lib/utils";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Smart IFU Builder",
    template: "%s · Smart IFU Builder",
  },
  description:
    "Create compliant device instructions in minutes, not days. Guided IFU drafting aligned with India's Medical Devices Rules, 2017.",
};

const RootLayout = ({ children }: LayoutProps<"/">) => (
  <html
    lang="en-IN"
    suppressHydrationWarning
    className={cn(
      geistSans.variable,
      geistMono.variable,
      sourceSerif.variable,
      "h-full antialiased",
    )}
  >
    <body className="flex min-h-full flex-col">
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
