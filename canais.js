import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Canais() {
  const [canais, setCanais] = useState([])
  const [nome, setNome] = useState('')
  const [nicho, setNicho] = useState('')

  useEffect(()=>{ fetchCanais() },[])

  async function fetchCanais(){
    let { data } = await supabase.from('canais').select('*').order('id', {ascending:false})
    setCanais(data || [])
  }

  async function adicionar(){
    await supabase.from('canais').insert([{ nome, nicho, status:'ativo', data_criacao: new Date().toISOString().slice(0,10) }])
    setNome(''); setNicho(''); fetchCanais()
  }

  return (
    <div>
      <h2 className="text-xl mb-4">Canais</h2>
      <div className="mb-4">
        <input value={nome} onChange={e=>setNome(e.target.value)} placeholder="Nome do canal" className="p-2 mr-2 bg-gray-800 rounded" />
        <input value={nicho} onChange={e=>setNicho(e.target.value)} placeholder="Nicho" className="p-2 mr-2 bg-gray-800 rounded" />
        <button onClick={adicionar} className="px-3 py-2 bg-indigo-600 rounded">Adicionar</button>
      </div>
      <div>
        {canais.map(c=>(
          <div key={c.id} className="p-3 bg-gray-800 rounded mb-2">
            <strong>{c.nome}</strong> — {c.nicho} <br/>
            <small>Criado: {c.data_criacao}</small>
          </div>
        ))}
      </div>
    </div>
  )
}