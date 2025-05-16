import type React from 'react'
import type { Metadata } from 'next'
import './globals.css'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'AiEnsured AI Security Suite',
    description: 'Advanced AI security and model diagnostics platform',
    generator: 'v0.dev'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className="dark">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
