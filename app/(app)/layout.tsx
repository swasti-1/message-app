// app/(app)/layout.tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import "@/app/globals.css"

import Navbar from '@/components/ui/Navbar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Mystery Message',
  description: 'Send anonymous messages to your friends',
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Navbar />
      <main>{children}</main>
    </div>
  )
}
