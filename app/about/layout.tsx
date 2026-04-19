import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About KIRO – AI Tools Directory",
  description:
    "Learn why KIRO was built and how it helps improve AI literacy.",
  openGraph: {
    title: "About KIRO – AI Tools Directory",
    description:
      "Learn why KIRO was built and how it helps improve AI literacy.",
  },
  twitter: {
    card: "summary",
    title: "About KIRO – AI Tools Directory",
    description:
      "Learn why KIRO was built and how it helps improve AI literacy.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
