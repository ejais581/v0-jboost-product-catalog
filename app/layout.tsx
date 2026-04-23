import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/context/cart-context'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'JBoost - Suplementos Deportivos',
  description: 'Tu tienda de suplementos deportivos de confianza. Proteínas, creatina, vitaminas y más.',
  generator: 'v0.app',
  icons: {
    icon: '/icon.jpg',
    apple: '/icon.jpg',
  },
  openGraph: {
    title: 'JBoost - Suplementos Deportivos',
    description: 'Tu tienda de suplementos deportivos de confianza. Proteinas, creatina, vitaminas y mas.',
    images: ['/icon.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className="font-sans antialiased bg-background bg-[url('/images/bg-pattern.jpg')] bg-fixed bg-cover">
        <CartProvider>
          {children}
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
