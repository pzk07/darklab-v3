import { useState } from 'react'

function textoParaSRT(texto, duracao=3){
  const lines = texto.split(/\n+/).filter(Boolean)
  let srt = ''
  let tempo = 0
  lines.forEach((l,i)=>{
    const inicio = new Date(tempo*1000).toISOString().substr(11,12).replace('.',',')
    tempo += duracao
    const fim = new Date(tempo*1000).toISOString().substr(11,12).replace('.',',')
    srt += `${i+1}\n${inicio} --> ${fim}\n${l.trim()}\n\n`
  })
  return srt
}

export default function Ferramentas(){
  const [texto, setTexto] = useState('')
  const [srt, setSrt] = useState('')
  const [tamanho, setTamanho] = useState(3)

  function gerar(){
    setSrt(textoParaSRT(texto, Number(tamanho)))
  }

  function dividir(){
    const palavras = texto.split(/\s+/)
    const metade = Math.ceil(palavras.length/2)
    const p1 = palavras.slice(0, metade).join(' ')
    const p2 = palavras.slice(metade).join(' ')
    setSrt(p1 + "\n\n" + p2)
  }

  return (
    <div>
      <h2 className="text-xl mb-4">Ferramentas do Criador</h2>

      <div className="mb-6 p-4 bg-gray-800 rounded">
        <h3 className="font-semibold mb-2">Gerador de SRT</h3>
        <textarea rows="6" className="w-full p-2 bg-gray-900 rounded" value={texto} onChange={e=>setTexto(e.target.value)} placeholder="Cole a transcrição aqui..."></textarea>
        <div className="mt-2">
          <label>Segundos por legenda: </label>
          <input type="number" value={tamanho} onChange={e=>setTamanho(e.target.value)} className="w-20 p-1 ml-2 bg-gray-800 rounded"/>
          <button onClick={gerar} className="ml-4 px-3 py-1 bg-indigo-600 rounded">Gerar SRT</button>
          <button onClick={()=>{navigator.clipboard.writeText(srt)}} className="ml-2 px-3 py-1 bg-gray-700 rounded">Copiar</button>
        </div>
      </div>

      <div className="p-4 bg-gray-800 rounded">
        <h3 className="font-semibold mb-2">Divisor de Texto</h3>
        <textarea rows="4" className="w-full p-2 bg-gray-900 rounded" value={texto} onChange={e=>setTexto(e.target.value)} placeholder="Cole o texto para dividir..."></textarea>
        <div className="mt-2">
          <button onClick={dividir} className="px-3 py-1 bg-indigo-600 rounded">Dividir em 2</button>
          <button onClick={()=>{navigator.clipboard.writeText(srt)}} className="ml-2 px-3 py-1 bg-gray-700 rounded">Copiar Resultado</button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-800 rounded">
        <h3 className="font-semibold">Resultado</h3>
        <pre className="mt-2 bg-gray-900 p-3 rounded whitespace-pre-wrap">{srt}</pre>
      </div>
    </div>
  )
}