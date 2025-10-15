import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'InsightScribe',
  description: 'Gere conteúdo com IA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className="bg-zinc-900 text-zinc-50">{children}</body>
    </html>
  )
}