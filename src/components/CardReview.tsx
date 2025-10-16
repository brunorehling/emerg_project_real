import { Link } from "react-router-dom"
import type { ReviewType } from "../utils/ReviewType"

export function CardReview({ data }: { data: ReviewType }) {
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 w-72 h-96 overflow-hidden">
      {data.livro?.foto && (
        <img
          src={data.livro.foto}
          alt={data.livro.nome || "Livro"}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h5 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
            {data.usuario?.nome}
          </h5>
          <h5 className="mb-2 text-md font-semibold text-gray-900 dark:text-white">
            {data.titulo}
          </h5>
        </div>
        <p className="font-bold text-gray-700 dark:text-gray-400">Nota: {Number(data.nota)}</p>
      </div>
      <Link
        to={`/detalhes/${data.id}`}
        className="block text-center bg-white hover:bg-blue-800 font-medium rounded-b-lg px-4 py-2"
      >
        Ver Detalhes
      </Link>
    </div>
  )
}
