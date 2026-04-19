import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Mascot from "@/components/Mascot";

const inter = { variable: "--font-inter" };
const sourceSerif = { variable: "--font-source-serif" };

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://kiro-two-tau.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Best AI Tools Directory (2026) – 200+ Free & Paid Tools | KIRO",
    template: "%s | KIRO",
  },
  description:
    "Discover 200+ AI tools for developers, designers, and creators. Updated daily with trending and powerful AI tools.",
  keywords: [
    "AI tools",
    "artificial intelligence tools",
    "AI directory",
    "best AI tools 2026",
    "free AI tools",
    "ChatGPT alternatives",
  ],
  authors: [{ name: "KIRO" }],
  creator: "KIRO",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Best AI Tools Directory (2026) – 200+ Free & Paid Tools | KIRO",
    description:
      "Discover 200+ AI tools for developers, designers, and creators. Updated daily with trending and powerful AI tools.",
    url: BASE_URL,
    siteName: "KIRO",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Tools Directory (2026) – 200+ Free & Paid Tools | KIRO",
    description:
      "Discover 200+ AI tools for developers, designers, and creators. Updated daily with trending and powerful AI tools.",
  },
};

import { MascotProvider } from "@/context/MascotContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <MascotProvider>
          <Navbar />
          <main className="flex-1 pt-14">{children}</main>
          <Mascot />

        {/* Footer */}
        <footer className="border-t border-border bg-card mt-24">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M50 10 C30 10 15 25 15 45 C15 65 50 90 50 90 C50 90 85 65 85 45 C85 25 70 10 50 10 Z" fill="var(--color-accent)"/>
                  </svg>
                </div>
                <span className="font-serif text-lg font-medium">KIRO</span>
              </div>
              
              <div className="flex items-center gap-8">
                <a href="#" className="font-serif text-sm text-foreground hover:text-accent transition-colors">
                  Research
                </a>
                <a href="#" className="font-serif text-sm text-foreground hover:text-accent transition-colors">
                  Submit Tool
                </a>
                <a href="#" className="font-serif text-sm text-foreground hover:text-accent transition-colors">
                  Company
                </a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-4">
               <p className="text-xs text-muted">
                 © 2026 KIRO. All rights reserved.
               </p>
                <div className="flex gap-4">
                  <a href="#" className="text-xs text-muted hover:text-foreground">Privacy</a>
                  <a href="#" className="text-xs text-muted hover:text-foreground">Terms</a>
               </div>
            </div>
          </div>
        </footer>
        </MascotProvider>
      </body>
    </html>
  );
}
