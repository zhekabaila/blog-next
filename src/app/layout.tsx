import '../shared/styles/main.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tefa Stemanika Starting Template',
  description: 'teaching factory smkn 1 majalengka starting template nextjs 13',
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
