import { TiDeleteOutline } from "react-icons/ti"
import type { LivroType } from "../../utils/LivroType"
import { useAdminStore } from "../context/AdminContext"

type ListaLivroProps = {
  livro: LivroType
  livros: LivroType[]
  setLivros: React.Dispatch<React.SetStateAction<LivroType[]>>
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemLivro({ livro, livros, setLivros }: ListaLivroProps) {
  const { admin } = useAdminStore()

  async function excluirLivro() {
    if (!admin || admin.nivel == 1) {
      alert("Você não tem permissão para excluir livros.")
      return
    }

    if (confirm(`Confirma a exclusão do livro "${livro.nome}"?`)) {
      const response = await fetch(`${apiUrl}/livros/${livro.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin.token}`,
        },
      })

      if (response.ok) {
        const livros2 = livros.filter(x => x.id !== livro.id)
        setLivros(livros2)
        alert("Livro excluído com sucesso!")
      } else {
        alert("Erro: o livro não foi excluído.")
      }
    }
  }

  return (
    <tr key={livro.id} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700">
      <td className="px-6 py-4">
        <img
          src={livro.foto}
          alt={`Capa do livro ${livro.nome}`}
          className="w-28 rounded-lg shadow-sm"
        />
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
        {livro.nome}
      </td>
      <td className="px-6 py-4">{livro.autor?.nome ?? "Autor desconhecido"}</td>
      <td className="px-6 py-4">{livro.genero ?? "-"}</td>
      <td className="px-6 py-4">{new Date(livro.dataLancamento).toLocaleDateString()}</td>
      <td className="px-6 py-4">{livro.descricao ?? "Este livro não possui nenhuma descrição"}</td>
      <td className="px-6 py-4">
        <TiDeleteOutline
          className="text-3xl text-red-600 inline-block cursor-pointer hover:scale-110 transition"
          title="Excluir"
          onClick={excluirLivro}
        />
      </td>
    </tr>
  )
}
