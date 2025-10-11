import { TiDeleteOutline } from "react-icons/ti"
import type { DenunciaType } from "../../utils/DenunciaType"
import { useAdminStore } from "../context/AdminContext"

type ItemDenunciaProps = {
  denuncia: DenunciaType
  denuncias: DenunciaType[]
  setDenuncias: React.Dispatch<React.SetStateAction<DenunciaType[]>>
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemDenuncia({ denuncia, denuncias, setDenuncias }: ItemDenunciaProps) {
  const { admin } = useAdminStore()

  async function excluirComentario() {
    if (!admin) {
      alert("Você precisa estar logado como admin.")
      return
    }

    if (confirm(`Deseja realmente apagar o comentário denunciado?`)) {
      const response = await fetch(`${apiUrl}/comentarios/${denuncia.comentario.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin.token}`,
        },
      })

      if (response.ok) {
        const novas = denuncias.filter(d => d.id !== denuncia.id)
        setDenuncias(novas)
        alert("Comentário apagado com sucesso!")
      } else {
        alert("Erro: o comentário não foi excluído.")
      }
    }
  }

  return (
    <tr key={denuncia.id} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700">
      <td className="px-6 py-4">
        <p className="font-medium text-gray-900 dark:text-white">{denuncia.comentario.texto}</p>
        <p className="text-sm text-gray-500">Autor: {denuncia.comentario.usuario.nome}</p>
      </td>
      <td className="px-6 py-4">
        <p className="text-gray-900">{denuncia.usuario.nome}</p>
        <p className="text-sm text-gray-500">Motivo: {denuncia.motivo}</p>
      </td>
      <td className="px-6 py-4">{new Date(denuncia.createdAt).toLocaleDateString()}</td>
      <td className="px-6 py-4">
        <TiDeleteOutline
          className="text-3xl text-red-600 inline-block cursor-pointer hover:scale-110 transition"
          title="Excluir comentário denunciado"
          onClick={excluirComentario}
        />
      </td>
    </tr>
  )
}
