// Exemplo em React (com useEffect)
import { useEffect, useState } from "react"
import type { ReviewType } from "./utils/ReviewType"


function MinhasReviews({ usuarioId }: { usuarioId?: number }) {
const [reviews, setReviews] = useState<ReviewType[]>([])


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:3000/reviews/minhasReviews?usuarioId=${usuarioId}`)
        if (!res.ok) throw new Error("Erro ao buscar reviews")
        const data = await res.json()
        setReviews(data)
      } catch (err) {
        console.error(err)
      }
    }

    if (usuarioId) fetchReviews()
  }, [usuarioId])

  return (
    <div>
      <h2>Minhas Reviews</h2>
      {reviews.length === 0 ? (
        <p>Você ainda não fez nenhuma review.</p>
      ) : (
        reviews.map((review) => (
          <div>
            <h3>{review.titulo}</h3>
            <p>{review.conteudo}</p>
            <p>Nota: {review.nota}</p>
            <p>Livro: {review.livro?.nome}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default MinhasReviews
