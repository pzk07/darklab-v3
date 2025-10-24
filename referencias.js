import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Referencias(){
  const [refs, setRefs] = useState([])
  const [titulo, setTitulo] = useState('')
  const [url, setUrl] = useState('')
  const [obs, setObs] = useState('')

  useEffect(()=>{ fetchRefs() },[])

  async function fetchRefs(){
    let { data } = await supabase.from('referencias').select('*').order('id', {ascending:false})
    setRefs(data || [])
  }

  async function adicionar(){
    await supabase.from('referencias').insert([{ titulo, url, observacao: obs }])
    setTitulo(''); setUrl(''); setObs(''); fetchRefs()
  }

  return (
    <div>
      <h2 className="text-xl mb-4">Referências</h2>
      <div className="mb-4">
        <input value={titulo} onChange={e=>setTitulo(e.target.value)} placeholder="Título" className="p-2 mr-2 bg-gray-800 rounded" />
        <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="URL" className="p-2 mr-2 bg-gray-800 rounded" />
        <input value={obs} onChange={e=>setObs(e.target.value)} placeholder="Observação" className="p-2 mr-2 bg-gray-800 rounded" />
        <button onClick={adicionar} className="px-3 py-2 bg-indigo-600 rounded">Adicionar</button>
      </div>

      <div>
        {refs.map(r=>(
          <div key={r.id} className="p-3 bg-gray-800 rounded mb-2">
            <a href={r.url} target="_blank" rel="noreferrer" className="text-indigo-300">{r.titulo}</a><br/>
            <small>{r.observacao}</small>
          </div>
        ))}
      </div>
    </div>
  )
}