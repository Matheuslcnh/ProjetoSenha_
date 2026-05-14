'use client'
import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'
import { Shield, User, Phone, PawPrint, Lock, ShieldCheck } from 'lucide-react'

export default function Home() {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [pet, setPet] = useState('')
  const [senha, setSenha] = useState('')
  const [resultado, setResultado] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setResultado(null)

    try {
      const tempo = senha.length >= 12 ? 'Mais de 10 anos' : 'Algumas horas'
      const senha_hash = await bcrypt.hash(senha, 10)

      const { error } = await supabase.from('usuarios').insert([
        { nome, telefone, pet, senha_hash, tempo_estimado: tempo }
      ])

      if (error) throw error

      setResultado(`✅ Senha salva! Tempo estimado: ${tempo}`)
      setNome(''); setTelefone(''); setPet(''); setSenha('')
    } catch (error: any) {
      setResultado(`❌ Erro: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              Teste sua senha
            </h1>
            <p className="text-white/70 text-lg">Descubra a força da sua senha</p>
          </div>

          {/* Form Card */}
          <div className="card-modern">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Nome
                </label>
                <input 
                  type="text" 
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  required
                  className="input-modern"
                  placeholder="Digite seu nome:"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/90 mb-3 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Telefone
                </label>
                <input 
                  type="tel"
                  value={telefone}
                  onChange={e => setTelefone(e.target.value)}
                  className="input-modern"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/90 mb-3 flex items-center gap-2">
                  <PawPrint className="w-5 h-5" />
                  Nome do pet
                </label>
                <input 
                  type="text"
                  value={pet}
                  onChange={e => setPet(e.target.value)}
                  className="input-modern"
                  placeholder="Rex, Luna, etc"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/90 mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Sua senha
                </label>
                <input 
                  type="password"
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  required
                  className="input-modern"
                  placeholder="Digite sua senha"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary-modern w-full"
              >
                {loading ? 'Analisando...' : 'Calcular Força da Senha'}
              </button>
            </form>

            {resultado && (
              <div className="result-success mt-8 p-6 text-center rounded-2xl">
                <ShieldCheck className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
                <div className="text-xl font-bold text-white mb-2">{resultado}</div>
                <button 
                  onClick={() => setResultado(null)}
                  className="mt-4 text-emerald-300 hover:text-emerald-200 text-sm font-medium"
                >
                  Testar outra senha
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}