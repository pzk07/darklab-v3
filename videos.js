import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Videos(){
  const [videos, setVideos] = useState([])
  const [titulo, setTitulo] = useState('')
  const [canal, setCanal] = useState('')
  const [status, setStatus] = useState('ideia')

  useEffect(()=>{ fetchVideos(); },[])

  async function fetchVideos(){
    let { data } = await supabase.from('videos').select('*').order('id', {ascending:false})
    setVideos(data || [])
  }

  async function adicionar(){
    await supabase.from('videos').insert([{ titulo, canal_id: canal, status, data_publicacao: null, link: null }])
    setTitulo(''); setCanal(''); setStatus('ideia'); fetchVideos()
  }

  return (
    <div>
      <h2 className="text-xl mb-4">Vídeos</h2>
      <div className="mb-4">
        <input value={titulo} onChange={e=>setTitulo(e.target.value)} placeholder="Título" className="p-2 mr-2 bg-gray-800 rounded" />
        <input value={canal} onChange={e=>setCanal(e.target.value)} placeholder="ID do canal" className="p-2 mr-2 bg-gray-800 rounded" />
        <select value={status} onChange={e=>setStatus(e.target.value)} className="p-2 mr-2 bg-gray-800 rounded">
          <option value="ideia">Ideia</option>
          <option value="roteiro">Roteiro</option>
          <option value="gravacao">Gravação</option>
          <option value="edicao">Edição</option>
          <option value="upload">Upload</option>
          <option value="publicado">Publicado</option>
        </select>
        <button onClick={adicionar} className="px-3 py-2 bg-indigo-600 rounded">Adicionar</button>
      </div>

      <div>
        {videos.map(v=>(
          <div key={v.id} className="p-3 bg-gray-800 rounded mb-2">
            <strong>{v.titulo}</strong> — status: {v.status}
          </div>
        ))}
      </div>
    </div>
  )
}