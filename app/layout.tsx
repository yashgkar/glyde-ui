import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "glyde — Lightweight TypeScript HTTP Client | axios alternative",
    template: "%s | glyde",
  },
  description:
    "A zero-dependency, TypeScript-first HTTP client built on native fetch. 1.73 KB gzipped. Typed errors, async interceptors, streaming. The modern axios alternative with no supply chain risk.",
  keywords: [
    "http client",
    "fetch",
    "typescript",
    "axios alternative",
    "zero dependencies",
    "fetch wrapper",
    "typescript fetch",
    "node http client",
    "nextjs http client",
    "lightweight http client",
    "supply chain safe",
  ],
  metadataBase: new URL("https://glydeapi.vercel.app"),
  openGraph: {
    title: "glyde — Lightweight TypeScript HTTP Client",
    description: "Zero-dependency, TypeScript-first HTTP client built on native fetch. 1.73 KB gzipped. The modern axios alternative.",
    url: "https://glydeapi.vercel.app",
    siteName: "glyde",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "glyde — Lightweight TypeScript HTTP Client",
    description: "Zero-dependency, TypeScript-first HTTP client built on native fetch. 1.73 KB gzipped.",
  },
  alternates: {
    canonical: "https://glydeapi.vercel.app",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
