import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Prompts(){
  const [prompts, setPrompts] = useState([])
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [conteudo, setConteudo] = useState('')

  useEffect(()=>{ fetchPrompts() },[])

  async function fetchPrompts(){
    let { data } = await supabase.from('prompts').select('*').order('id', {ascending:false})
    setPrompts(data || [])
  }

  async function adicionar(){
    await supabase.from('prompts').insert([{ titulo, descricao, conteudo }])
    setTitulo(''); setDescricao(''); setConteudo(''); fetchPrompts()
  }

  return (
    <div>
      <h2 className="text-xl mb-4">Prompts</h2>
      <div className="mb-4">
        <input value={titulo} onChange={e=>setTitulo(e.target.value)} placeholder="Título" className="p-2 mr-2 bg-gray-800 rounded" />
        <input value={descricao} onChange={e=>setDescricao(e.target.value)} placeholder="Descrição" className="p-2 mr-2 bg-gray-800 rounded" />
      </div>
      <div className="mb-4">
        <textarea value={conteudo} onChange={e=>setConteudo(e.target.value)} rows="6" className="w-full p-2 bg-gray-800 rounded" placeholder="Conteúdo do prompt"></textarea>
        <button onClick={adicionar} className="mt-2 px-3 py-2 bg-indigo-600 rounded">Adicionar Prompt</button>
      </div>

      <div>
        {prompts.map(p=>(
          <div key={p.id} className="p-3 bg-gray-800 rounded mb-2">
            <strong>{p.titulo}</strong><br/>{p.descricao}
            <pre className="mt-2 bg-gray-900 p-2 rounded text-sm">{p.conteudo}</pre>
          </div>
        ))}
      </div>
    </div>
  )
}