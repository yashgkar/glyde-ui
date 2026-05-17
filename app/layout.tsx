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
  title: "glyde — Lightweight TypeScript HTTP Client",
  description:
    "A zero-dependency, TypeScript-first HTTP client built on native fetch. 1.73 KB gzipped. Interceptors, typed errors, streaming.",
  keywords: [
    "http client",
    "fetch",
    "typescript",
    "axios alternative",
    "zero dependencies",
  ],
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
