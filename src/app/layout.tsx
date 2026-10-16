import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";

import "./globals.css";
import { portfolio } from "@/lib/data";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Grain } from "@/components/ui/grain";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(portfolio.meta.url),
  title: {
    default: portfolio.meta.title,
    template: `%s | ${portfolio.personal.name}`,
  },
  description: portfolio.meta.description,
  openGraph: {
    title: portfolio.meta.title,
    description: portfolio.meta.description,
    url: portfolio.meta.url,
    siteName: portfolio.personal.name,
    type: "website",
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
      suppressHydrationWarning
      className={`${fraunces.variable} ${manrope.variable}`}
    >
      <body className="min-h-svh font-sans antialiased">
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
        <Grain />
      </body>
    </html>
  );
}
