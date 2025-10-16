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
      const response = await fetch(`${apiUrl}/reviews/${params.reviewId}`)
      const dados = await response.json()
      setReview(dados)
    }
    buscaDados()
  }, [])

  return (
    <>
      <section className="flex mt-6 mx-auto flex-col justify-center items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className="flex flex-col justify-center p-4 leading-normal">
          <img src={review?.livro?.foto} alt="" className="w-200 h-200"/>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {review?.titulo}
          </h5>
          <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            Nota: {review?.nota}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {review?.conteudo}
          </p>
          {usuario.id ? (
            <>
              <button
                onClick={() => setMostrarComentarios(!mostrarComentarios)}
                className="mt-4 text-blue-500 hover:text-blue-700 font-medium"
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
    </>
  )
}