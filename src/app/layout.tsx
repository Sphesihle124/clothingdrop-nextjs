import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DemoModeIndicator from '@/components/DemoModeIndicator'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ClothingDrop - Fast Fashion Delivery in South Africa',
  description: 'Get the latest fashion delivered to your doorstep in minutes across Johannesburg and Cape Town',
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
          <DemoModeIndicator />
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col pt-10">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
