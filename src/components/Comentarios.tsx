import { useState, useEffect } from 'react'
import { BotaoDenunciar } from './botaoDenunciar'

const apiUrl = import.meta.env.VITE_API_URL

export type ComentarioType = {
  id: number
  conteudo: string
  usuarioId: number
  reviewId: number
  usuario: {
    id: number
    nome: string
    email: string
  }
  createdAt: string
}

type SistemaComentariosProps = {
  reviewId: number
  usuarioId: number
}

export default function SistemaComentarios({ reviewId, usuarioId }: SistemaComentariosProps) {
  const [comentarios, setComentarios] = useState<ComentarioType[]>([])
  const [novoComentario, setNovoComentario] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const buscarComentarios = async () => {
    try {
      const response = await fetch(`${apiUrl}/reviews/${reviewId}/comentarios`)
      if (!response.ok) throw new Error('Erro ao buscar comentários')
      const data = await response.json()
      setComentarios(data)
    } catch (error) {
      console.error('Erro ao buscar comentários:', error)
      setErro('Erro ao carregar comentários')
    }
  }

  const adicionarComentario = async () => {
    if (!novoComentario.trim()) return
    
    try {
      setCarregando(true)
      setErro(null)
      
      const response = await fetch(`${apiUrl}/reviews/${reviewId}/comentarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conteudo: novoComentario,
          usuarioId: usuarioId,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Erro ao adicionar comentário')

      setNovoComentario('')
      buscarComentarios()
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error)
      setErro(error instanceof Error ? error.message : 'Erro ao adicionar comentário')
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    buscarComentarios()
  }, [reviewId])

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h4 className="text-lg font-semibold mb-3">Comentários</h4>
      
      {erro && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3">{erro}</div>}
      
      <div className="mb-3">
        <textarea
          value={novoComentario}
          onChange={(e) => setNovoComentario(e.target.value)}
          placeholder="Escreva seu comentário..."
          className="w-full p-2 border rounded"
          rows={3}
        />
        <button
          onClick={adicionarComentario}
          disabled={carregando || !novoComentario.trim()}
          className="mt-2 bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          {carregando ? 'Enviando...' : 'Enviar'}
        </button>
      </div>

      <div className="space-y-2">
        {comentarios.map((comentario) => (
          <div key={comentario.id} className="p-2 bg-white rounded border">
            <div className="flex justify-between">
              <strong>{comentario.usuario.nome}</strong>
              <span className="text-sm text-gray-500">
                {new Date(comentario.createdAt).toLocaleDateString('pt-BR')}
              </span>
            </div>
            <p className="text-gray-700">{comentario.conteudo}</p>
            <div className="mt-1">
            <BotaoDenunciar
              comentarioId={comentario.id}
              usuarioId={usuarioId} // ID do usuário logado
            />
    </div>
          </div>
        ))}
        
        {comentarios.length === 0 && !erro && (
          <p className="text-gray-500 text-center py-4">
            Nenhum comentário ainda. Seja o primeiro a comentar!
          </p>
        )}
      </div>
    </div>
  )
}