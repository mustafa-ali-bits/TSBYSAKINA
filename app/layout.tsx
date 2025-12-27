import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { CartProvider } from '../src/context/CartContext'
import { Analytics } from "@vercel/analytics/next"


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Sweet Tooth by Sakina',
  description: 'Handcrafted chocolate perfection',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <Analytics/>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
