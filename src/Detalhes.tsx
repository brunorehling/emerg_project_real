import type { ReviewType } from "./utils/ReviewType"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useUsuarioStore } from "./context/ClienteContext"
import SistemaComentarios from "./components/Comentarios"

const apiUrl = import.meta.env.VITE_API_URL

export default function Detalhes() {
  const params = useParams()
  const [review, setReview] = useState<ReviewType>()
  const [mostrarComentarios, setMostrarComentarios] = useState<boolean>(false)
  const { usuario } = useUsuarioStore()

  useEffect(() => {
    async function buscaDados() {
      try {
        const response = await fetch(`${apiUrl}/reviews/${params.reviewId}`)
        if (!response.ok) throw new Error('Erro ao buscar review')
        const dados = await response.json()
        setReview(dados)
      } catch (error) {
        console.error(error)
      }
    }
    buscaDados()
  }, [params.reviewId])

  return (
    <section className="flex flex-col md:flex-row mt-6 mx-auto max-w-5xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-700">
      {review?.livro?.foto && (
        <img 
          src={review.livro.foto} 
          alt={review.titulo} 
          className="w-full md:w-48 h-48 md:h-64 object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
        />
      )}

      <div className="flex flex-col justify-center p-4 flex-1">
        <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {review?.titulo}
        </h5>
        <h6 className="text-xl text-gray-900 dark:text-white mb-2">
          Nota: {review?.nota}
        </h6>
        <p className="text-gray-700 dark:text-gray-400 mb-3">
          {review?.conteudo}
        </p>

        {usuario?.id ? (
          <>
            <button
              onClick={() => setMostrarComentarios(!mostrarComentarios)}
              className="mt-4 text-blue-500 hover:text-blue-700 font-medium transition"
            >
              {mostrarComentarios ? 'Ocultar' : 'Ver'} Comentários
            </button>

            {mostrarComentarios && review?.id && (
              <SistemaComentarios 
                reviewId={review.id} 
                usuarioId={usuario.id}
              />
            )}
          </>
        ) : (
          <p className="text-gray-500 mt-4">
            Faça login para ver e adicionar comentários
          </p>
        )}
      </div>
    </section>
  )
}
