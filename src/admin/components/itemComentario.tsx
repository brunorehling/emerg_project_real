import { TiDeleteOutline } from "react-icons/ti"
import type { ComentarioType } from "../../utils/ComentarioType"
import { useAdminStore } from "../context/AdminContext"

type listaPropostaProps = {
  comentario: ComentarioType,
  comentarios: ComentarioType[],
  setComentarios: React.Dispatch<React.SetStateAction<ComentarioType[]>>
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemProposta({ comentario, comentarios, setComentarios }: listaPropostaProps) {

  const { admin } = useAdminStore()

  async function excluirComentario() {

    if (confirm(`Confirma Exclusão da Proposta "${comentario.conteudo}"?`)) {
      const response = await fetch(`${apiUrl}/propostas/${comentario.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin.token}`
          },
        },
      )

      if (response.status == 200) {
        const comentarios2 = comentarios.filter(x => x.id != comentario.id)
        setComentarios(comentarios2)
        alert("Comentario excluída com sucesso")
      } else {
        alert("Erro... Proposta não foi excluída")
      }
    }
  }


  return (
    <tr key={comentario.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className={"px-6 py-4"}>
        {comentario.usuario?.nome}
      </td>
      <td className={`px-6 py-4`}>
        {comentario.conteudo}
      </td>
      <td className="px-6 py-4">
          <>
            <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
              onClick={excluirComentario} />&nbsp;
          </>
      </td>

    </tr>
  )
}