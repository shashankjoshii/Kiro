import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Mascot from "@/components/Mascot";
import { MascotProvider } from "@/context/MascotContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  weight: ["300", "400", "600"],
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://kiro-two-tau.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Best AI Tools Directory (2026) – 500+ Free & Paid Tools | KIRO",
    template: "%s | KIRO",
  },
  description:
    "Discover 500+ AI tools for developers, designers, and creators. Updated regularly with the best AI tools across 11 categories including text, image, code, video, and more.",
  keywords: [
    "AI tools",
    "artificial intelligence tools",
    "AI directory",
    "best AI tools 2026",
    "free AI tools",
    "ChatGPT alternatives",
    "AI tools list",
    "top AI tools",
    "AI software",
    "generative AI tools",
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
    title: "Best AI Tools Directory (2026) – 500+ Free & Paid Tools | KIRO",
    description:
      "Discover 500+ AI tools for developers, designers, and creators. Updated regularly with the best AI tools across 11 categories.",
    url: BASE_URL,
    siteName: "KIRO",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Tools Directory (2026) – 500+ Free & Paid Tools | KIRO",
    description:
      "Discover 500+ AI tools for developers, designers, and creators. Updated regularly with the best AI tools across 11 categories.",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${BASE_URL}/#website`,
                  "url": BASE_URL,
                  "name": "KIRO",
                  "description": "The most comprehensive AI tools directory with 500+ curated tools across 11 categories.",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": { "@type": "EntryPoint", "urlTemplate": `${BASE_URL}/tools?q={search_term_string}` },
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "Organization",
                  "@id": `${BASE_URL}/#organization`,
                  "name": "KIRO",
                  "url": BASE_URL,
                  "logo": { "@type": "ImageObject", "url": `${BASE_URL}/favicon.ico` },
                  "sameAs": [],
                },
                {
                  "@type": "CollectionPage",
                  "@id": `${BASE_URL}/#collection`,
                  "url": BASE_URL,
                  "name": "Best AI Tools Directory (2026) – 500+ Tools",
                  "description": "Discover 500+ AI tools for developers, designers, and creators curated across 11 categories.",
                  "isPartOf": { "@id": `${BASE_URL}/#website` },
                  "publisher": { "@id": `${BASE_URL}/#organization` },
                },
              ],
            }),
          }}
        />
        <MascotProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Mascot />

          {/* Footer */}
          <footer className="border-t border-border mt-24">
            <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-4">
                {/* Brand */}
                <div className="sm:col-span-2">
                  <div className="flex items-center gap-2.5 mb-4">
                    <svg viewBox="0 0 36 36" className="h-7 w-7" xmlns="http://www.w3.org/2000/svg">
                      <polygon points="6,14 10,2 15,14" fill="var(--color-accent)" />
                      <polygon points="8,13 10,5 13,13" fill="#fce8d5" />
                      <polygon points="21,14 26,2 30,14" fill="var(--color-accent)" />
                      <polygon points="23,13 26,5 28,13" fill="#fce8d5" />
                      <polygon points="9,5 10,2 11,5" fill="#3d2b1f" />
                      <polygon points="25,5 26,2 27,5" fill="#3d2b1f" />
                      <ellipse cx="18" cy="21" rx="13" ry="12" fill="var(--color-accent)" />
                      <ellipse cx="18" cy="24" rx="9" ry="8" fill="#fce8d5" />
                      <circle cx="13" cy="19" r="2.5" fill="#1a1714" />
                      <circle cx="23" cy="19" r="2.5" fill="#1a1714" />
                      <circle cx="14" cy="18" r="0.8" fill="#fff" />
                      <circle cx="24" cy="18" r="0.8" fill="#fff" />
                      <ellipse cx="18" cy="23" rx="2" ry="1.5" fill="#3d2b1f" />
                      <path d="M16,25 Q18,27 20,25" fill="none" stroke="#3d2b1f" strokeWidth="0.8" strokeLinecap="round" />
                    </svg>
                    <span
                      className="text-lg font-semibold tracking-tight"
                      style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}
                    >
                      KIRO
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed max-w-xs">
                    500+ AI tools, curated and categorized. No noise — just the best tools for what you want to build.
                  </p>
                </div>

                {/* Directory */}
                <div>
                  <p className="text-eyebrow text-muted mb-4">Directory</p>
                  <ul className="space-y-2.5">
                    {[
                      { label: "All Categories", href: "/category" },
                      { label: "Trending Tools", href: "/" },
                      { label: "AI Agents", href: "/category/ai-agents" },
                      { label: "Education", href: "/category/education" },
                    ].map(({ label, href }) => (
                      <li key={label}>
                        <a href={href} className="text-sm text-muted hover:text-foreground transition-colors">
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <p className="text-eyebrow text-muted mb-4">Company</p>
                  <ul className="space-y-2.5">
                    {[
                      { label: "About", href: "/about" },
                      { label: "Submit a Tool", href: "#" },
                      { label: "Privacy", href: "#" },
                      { label: "Terms", href: "#" },
                    ].map(({ label, href }) => (
                      <li key={label}>
                        <a href={href} className="text-sm text-muted hover:text-foreground transition-colors">
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-xs text-muted">© 2026 KIRO. All rights reserved.</p>
                <p className="text-xs text-muted">Made with care for the AI community.</p>
              </div>
            </div>
          </footer>
        </MascotProvider>
      </body>
    </html>
  );
}
