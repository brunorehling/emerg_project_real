import { useEffect, useState } from "react";
import type { ReviewType } from "./utils/ReviewType";
import { useUsuarioStore } from "./context/ClienteContext";

const apiUrl = import.meta.env.VITE_API_URL;

export default function MinhasReviews() {
  const { usuario } = useUsuarioStore();
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!usuario) return; // espera o usuário ser carregado

    console.log("Usuario logado:", usuario);

    if (!usuario.id) return; // se não tiver ID, não faz fetch

    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/reviews/minhasReviews?usuarioId=${usuario.id}`);
        if (!res.ok) throw new Error("Erro ao buscar reviews");
        const data = await res.json();
        console.log("Reviews recebidas:", data);
        setReviews(data);
      } catch (err) {
        console.error("Erro ao buscar reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [usuario]);

  if (!usuario) {
    return <p className="p-4">Você precisa estar logado para ver suas reviews.</p>;
  }

  if (loading) {
    return <p className="p-4">Carregando suas reviews...</p>;
  }

  if (reviews.length === 0) {
    return <p className="p-4">Você ainda não fez nenhuma review.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Minhas Reviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-700 flex flex-col items-center"
          >
            {review.livro?.foto && (
              <img
                src={review.livro.foto}
                alt={review.livro.nome}
                className="w-24 h-32 object-cover rounded mb-2"
              />
            )}
            <h3 className="font-semibold text-gray-900 dark:text-white text-center">{review.titulo}</h3>
            {review.conteudo && (
              <p className="text-gray-700 dark:text-gray-300 mt-1 text-center">{review.conteudo}</p>
            )}
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Nota: {review.nota}</p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 text-center">
              Livro: {review.livro?.nome || "Não especificado"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
