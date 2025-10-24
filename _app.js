import '../styles/globals.css'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">DarkLab — Painel de Produção</h1>
          <nav className="space-x-4">
            <Link href="/">Home</Link>
            <Link href="/canais">Canais</Link>
            <Link href="/videos">Vídeos</Link>
            <Link href="/prompts">Prompts</Link>
            <Link href="/referencias">Referências</Link>
            <Link href="/ferramentas">Ferramentas</Link>
          </nav>
        </header>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp