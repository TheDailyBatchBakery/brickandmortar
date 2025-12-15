import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Brick & Mortar - Order Online for Pickup',
  description: 'Order online for pickup. Fresh, fast, and convenient.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

