import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StudioBar from "@/components/StudioBar";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import ScrollProgress from "@/components/ScrollProgress";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://technovastudio.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TECHNOVA STUDIO — Bespoke Digital Engineering & Web Development",
    template: "%s | TECHNOVA STUDIO",
  },
  description:
    "TECHNOVA STUDIO crafts professional websites, performant frontend interfaces, resilient backend APIs, practical AI integrations, and security-conscious software systems.",
  keywords: [
    "TECHNOVA STUDIO",
    "Website Development",
    "Frontend Development",
    "Backend Development",
    "API Integration",
    "AI Solutions",
    "Cybersecurity Web Development",
    "Website Maintenance",
    "Bug Fixing",
    "Digital Studio India",
  ],
  authors: [{ name: "TECHNOVA STUDIO", url: siteUrl }],
  creator: "TECHNOVA STUDIO",
  icons: {
    icon: "/brand/technova-logo.jpg",
    shortcut: "/brand/technova-logo.jpg",
    apple: "/brand/technova-logo.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: "TECHNOVA STUDIO — Your Ideas. Our Technology. Real Digital Experiences.",
    description:
      "Modern digital studio helping businesses turn ideas into practical, professional websites and intelligent digital solutions.",
    siteName: "TECHNOVA STUDIO",
    images: [
      {
        url: "/brand/technova-logo.jpg",
        width: 1024,
        height: 1024,
        alt: "TECHNOVA STUDIO Official Brand Emblem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TECHNOVA STUDIO",
    description: "Your Ideas. Our Technology. Real Digital Experiences.",
    images: ["/brand/technova-logo.jpg"],
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
};

export const viewport: Viewport = {
  themeColor: "#FEFAE0",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen studio-canvas text-[#1F2421] flex flex-col justify-between selection:bg-[#D4A373]/30 selection:text-[#1F2421]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#D4A373] text-[#1F2421] font-semibold rounded-lg shadow-lg font-mono text-xs"
        >
          Skip to main content
        </a>
        <ScrollProgress />
        <StudioBar />
        <Navbar />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
