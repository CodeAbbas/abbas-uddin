import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// <CHANGE> Updated to Orbitron for F1 racing aesthetic
const _orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

// <CHANGE> Updated metadata for F1 theme
export const metadata: Metadata = {
  title: "F1 2025 Driver Standings",
  description: "Official 2025 Formula 1 driver standings with stats and achievements",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
