'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Home, BarChart3 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function DrawerNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)

  const links = [
    { href: '/', label: 'Testar Senha', icon: Home },
    { href: '/ranking', label: 'Ranking', icon: BarChart3 },
  ]

  return (
    <>
      {/* Botão Menu - Sempre visível */}
      <motion.button
        onClick={toggleMenu}
        className="fixed top-6 left-6 z-[1001] p-3 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-xl md:hover:scale-110"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </motion.button>

      {/* Drawer Lateral */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 h-full w-80 z-[1000] bg-gradient-to-b from-slate-900 to-slate-900/80 backdrop-blur-xl border-r border-cyan-500/30 shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/10">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Senha Ranking
              </h2>
              <p className="text-white/60 mt-2">Teste a força da sua senha</p>
            </div>

            {/* Links */}
            <nav className="p-4 pt-8 flex-1">
              {links.map(({ href, label, icon: Icon }) => {
                const active = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-4 p-4 rounded-xl mb-3 transition-all duration-300 hover:bg-white/10 ${
                      active 
                        ? 'bg-gradient-to-r from-cyan-500/20 border-r-4 border-cyan-400 text-cyan-300 font-bold shadow-lg' 
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${active ? 'text-cyan-400' : ''}`} />
                    <span className="font-medium">{label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 mt-auto">
              <div className="text-center text-white/50 text-sm">
                Feito para conscientizar sobre<br />
                segurança de senhas
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999]"
            style={{ backdropFilter: 'blur(4px)' }}
          />
        )}
      </AnimatePresence>
    </>
  )
}