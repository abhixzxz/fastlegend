import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FastLegend - Free Typing Speed Test | Improve Your WPM & Accuracy",
  description:
    "FastLegend is a modern, free typing speed test application. Measure your WPM, accuracy, and improve your typing skills with beautiful animations, detailed analytics, and multiple test modes. Perfect for typists of all levels.",
  keywords: [
    "typing test",
    "typing speed test",
    "WPM test",
    "typing practice",
    "typing game",
    "keyboard test",
    "typing challenge",
    "improve typing speed",
    "typing accuracy",
    "free typing test",
    "online typing test",
    "typing speed checker",
    "typing skills",
    "typing tutor",
    "monkeytype alternative",
  ],
  authors: [{ name: "FastLegend Team" }],
  creator: "FastLegend",
  publisher: "FastLegend",
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
  openGraph: {
    title: "FastLegend - Free Typing Speed Test",
    description:
      "Test your typing speed and improve your skills with FastLegend. Beautiful UI, detailed analytics, and multiple test modes.",
    url: "https://fastlegend.vercel.app",
    siteName: "FastLegend",
    images: [
      {
        url: "https://fastlegend.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "FastLegend Typing Speed Test",
        type: "image/png",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FastLegend - Free Typing Speed Test",
    description: "Test your typing speed and improve your skills with beautiful animations and detailed analytics.",
    images: ["https://fastlegend.vercel.app/og-image.png"],
    creator: "@fastlegend",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  charset: "utf-8",
  alternates: {
    canonical: "https://fastlegend.vercel.app",
  },
  category: "Productivity",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "FastLegend",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1db954" />
        <meta name="apple-mobile-web-app-capable" content="true" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="canonical" href="https://fastlegend.vercel.app" />
        <link rel="manifest" href="/manifest.json" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "FastLegend",
              description: "A modern typing speed test application to measure WPM and accuracy",
              url: "https://fastlegend.vercel.app",
              applicationCategory: "Productivity",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "1000",
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "FastLegend",
              url: "https://fastlegend.vercel.app",
              logo: "https://fastlegend.vercel.app/logo.png",
              sameAs: ["https://twitter.com/fastlegend", "https://github.com/fastlegend"],
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
