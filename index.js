import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Link from 'next/link'

export default function Home() {
  const [counts, setCounts] = useState({ canais:0, videos:0, publicados:0, producao:0 })

  useEffect(() => {
    async function fetchCounts() {
      const { data: canais } = await supabase.from('canais').select('id', { count: 'exact' })
      const { data: videos } = await supabase.from('videos').select('id,status', { count: 'exact' })
      const publicados = videos ? videos.filter(v=>v.status==='publicado').length : 0
      const producao = videos ? videos.filter(v=>v.status!=='publicado').length : 0
      setCounts({ canais: canais ? canais.length : 0, videos: videos ? videos.length : 0, publicados, producao })
    }
    fetchCounts()
  }, [])

  return (
    <div>
      <h2 className="text-xl mb-4">Bem-vindo de volta!</h2>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-gray-800 rounded">Total de canais<br/><strong className="text-2xl">{counts.canais}</strong></div>
        <div className="p-4 bg-gray-800 rounded">Vídeos cadastrados<br/><strong className="text-2xl">{counts.videos}</strong></div>
        <div className="p-4 bg-gray-800 rounded">Publicados<br/><strong className="text-2xl">{counts.publicados}</strong></div>
        <div className="p-4 bg-gray-800 rounded">Em produção<br/><strong className="text-2xl">{counts.producao}</strong></div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 bg-gray-800 rounded">
          <h3 className="mb-2 font-semibold">Ferramentas disponíveis</h3>
          <ul className="list-disc pl-5">
            <li><Link href="/ferramentas">Gerador de SRT</Link></li>
            <li><Link href="/ferramentas">Divisor de Texto</Link></li>
          </ul>
        </div>

        <div className="p-4 bg-gray-800 rounded">
          <h3 className="mb-2 font-semibold">Atalhos</h3>
          <ul className="list-disc pl-5">
            <li><Link href="/canais">Gerenciar Canais</Link></li>
            <li><Link href="/videos">Gerenciar Vídeos</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}