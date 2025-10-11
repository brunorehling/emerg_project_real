import { useEffect, useState } from "react"
import ItemDenuncia from "./components/itemDenuncia"
import type { DenunciaType } from "../utils/DenunciaType"

const apiUrl = import.meta.env.VITE_API_URL

export default function ListaDenuncias() {
  const [denuncias, setDenuncias] = useState<DenunciaType[]>([])

  useEffect(() => {
    async function getDenuncias() {
      const response = await fetch(`${apiUrl}/denuncias`)
      const dados = await response.json()
      setDenuncias(dados)
    }
    getDenuncias()
  }, [])

  const listaDenuncias = denuncias.map(denuncia => (
    <ItemDenuncia
      key={denuncia.id}
      denuncia={denuncia}
      denuncias={denuncias}
      setDenuncias={setDenuncias}
    />
  ))

  return (
    <div className="m-4 mt-24">
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Denúncias de Comentários
        </h1>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 w-2/5">
                Comentário e Autor
              </th>
              <th scope="col" className="px-6 py-3 w-2/5">
                Denunciante e Motivo
              </th>
              <th scope="col" className="px-6 py-3">
                Data
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {denuncias.length > 0 ? (
              listaDenuncias
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  Nenhuma denúncia encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
