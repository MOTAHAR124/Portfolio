import { CursorBackdrop } from "@/components/cursor-backdrop";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getAuthorData } from "@/lib/data";
import { cn, portableTextToPlainText } from "@/lib/utils";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const fontSans = localFont({
  src: [
    { path: "./fonts/inter/07c7676b89ed2778-s.p.2bn3s6zvc0dyp.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/inter/2fb76073e23fd9e4-s.3lvt2whj97whp.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/inter/45462fd7b7c12654-s.0k62hbripvv8p.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/inter/46a9e2f250689b4a-s.0-dom-5bn10r2.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/inter/6131cbbf5549afa2-s.2uwcyprjm3xu3.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/inter/76b70a1dbe058eb5-s.1y4-pdgsjb-pw.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/inter/ba63f6a0e436df8e-s.3-6t-g6q0vh0a.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const author = await getAuthorData();

  if (!author) {
    return {
      title: "Portfolio",
      description: "Personal portfolio website",
      verification: {
        google: "googlec5332e5d345a03fa.html",
      },
    };
  }

  const url = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(url),
    title: {
      default: author.name ?? "",
      template: `%s | ${author.name}`,
    },
    description: portableTextToPlainText(author.description!),
    icons: {
      icon: author.avatar?.asset?.url
        ? [{ url: author.avatar.asset.url, type: "image/jpeg", sizes: "any" }]
        : "/favicon.ico",
      shortcut: author.avatar?.asset?.url || "/favicon.ico",
      apple: author.avatar?.asset?.url
        ? [{ url: author.avatar.asset.url, type: "image/jpeg" }]
        : "/favicon.ico",
    },
    openGraph: {
      title: author.name ?? "",
      description: portableTextToPlainText(author.description!),
      url: url,
      siteName: author.name ?? "",
      locale: "en_US",
      type: "website",
      images: author.avatar?.asset?.url ? [author.avatar.asset.url] : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      title: author.name ?? "",
      card: "summary_large_image",
      images: author.avatar?.asset?.url ? [author.avatar.asset.url] : [],
    },
    verification: {
      google: "googlec5332e5d345a03fa.html",
      yandex: "",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          "relative min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <CursorBackdrop />
          <div className="relative z-10">
            <TooltipProvider delayDuration={0}>
              {children}
              <Navbar />
            </TooltipProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
