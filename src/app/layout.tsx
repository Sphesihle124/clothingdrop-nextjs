import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DemoModeIndicator from '@/components/DemoModeIndicator'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'
import { OrderProvider } from '@/contexts/OrderContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ClothingDrop - Traditional South African Clothing Delivery',
  description: 'Discover authentic South African traditional clothing delivered to your doorstep in minutes. Shweshwe dresses, Ndebele accessories, and more across Johannesburg and Cape Town',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <DemoModeIndicator />
              <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col pt-10">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
