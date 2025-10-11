import { TiDeleteOutline } from "react-icons/ti"

import type { ReviewType } from "../../utils/ReviewType"
import { useAdminStore } from "../context/adminContext"

type listaCarroProps = {
  review: ReviewType;
  reviews: ReviewType[];
  setReviews: React.Dispatch<React.SetStateAction<ReviewType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemCarro({ review, reviews, setReviews }: listaCarroProps) {
  const { admin } = useAdminStore()

  async function excluirReview() {
    if (!admin || admin.nivel == 1) {
      alert("Você não tem permissão para excluir veículos");
      return;
    }

    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${apiUrl}/reviews/${review.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin.token}`
          },
        },
      )

      if (response.status == 200) {
        const reviews2 = reviews.filter(x => x.id != review.id)
        setReviews(reviews2)
        alert("Carro excluído com sucesso")
      } else {
        alert("Erro... Carro não foi excluído")
      }
    }
  }



  return (
    <tr key={review.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={review.livro?.foto} alt={`Foto do livro ${review.livro?.nome}`}
          style={{ width: 200 }} />
      </th>
      <td className={`px-6 py-4 ${review.destaque ? "font-extrabold" : ""}`}>
        {review.titulo}
      </td>
      <td className={`px-6 py-4 ${review.destaque ? "font-extrabold" : ""}`}>
        {review.livro?.nome}
      </td>
      <td className={`px-6 py-4 ${review.destaque ? "font-extrabold" : ""}`}>
        {review.conteudo}
      </td>
      <td className={`px-6 py-4 ${review.destaque ? "font-extrabold" : ""}`}>
        {Number(review.nota)}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirReview} />&nbsp;
      </td>
    </tr>
  )
}