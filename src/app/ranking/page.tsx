'use client'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Trophy, UserCheck } from 'lucide-react'

interface Usuario {
  nome: string
  tempo_estimado: string
}

export default function Ranking() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('usuarios')
      .select('nome, tempo_estimado')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error(error)
        else setUsuarios(data || [])
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
            Ranking Mundial
          </h1>
          <p className="text-xl text-white/70">Senhas mais fortes</p>
        </div>

        <div className="card-modern">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white/70">Carregando ranking...</p>
            </div>
          ) : usuarios.length === 0 ? (
            <div className="text-center py-20">
              <UserCheck className="w-16 h-16 mx-auto mb-4 text-white/50" />
              <p className="text-xl text-white/50">Nenhum usuário ainda<br />Seja o primeiro!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {usuarios.map((usuario, index) => (
                <div key={index} className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-xl font-bold text-white">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate">{usuario.nome}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-cyan-400">{usuario.tempo_estimado}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}