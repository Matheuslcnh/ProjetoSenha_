import './globals.css'
import DrawerNavbar from '@/components/BottomNavbar'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700']
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      
      <body className={`${inter.variable} font-inter antialiased`}>
    
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 relative overflow-hidden">
          {/* Background Grid */}
          
          <div className="absolute inset-0 bg-grid-white/5 pointer-events-none" />
          
                        <DrawerNavbar />

          <div className="relative z-10">
            
            {children}
          </div>
          
          
        </main>
      </body>
    </html>
  )
}