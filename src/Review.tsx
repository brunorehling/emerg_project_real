import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useUsuarioStore } from "./context/ClienteContext";
import type { LivroType } from "./utils/LivroType";
import { CardLivro } from "./components/cardLivro";

const apiUrl = import.meta.env.VITE_API_URL;

type FormData = {
  titulo: string;
  conteudo?: string;
  nota: number;
  livros_id: number;
};

export default function CriarReview() {
  const { register, handleSubmit, reset } = useForm<FormData>();
   const [livros, setLivros] = useState<LivroType[]>([]);
  const { usuario } = useUsuarioStore();

   useEffect(() => {
    fetch(`${apiUrl}/livros`)
      .then((res) => res.json())
      .then((data) => setLivros(data))
      .catch((err) => console.error("Erro ao carregar livros:", err));
  }, []);

  const listaLivros = livros.map((livro) => (
    <CardLivro data={livro} key={livro.id} />
  ));
  

  async function onSubmit(data: FormData) {
    if (!usuario?.id) {
      alert("Você precisa estar logado para criar uma review.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          nota: Number(data.nota),
          livros_id: Number(data.livros_id),
          userId: usuario.id,
        }),
      });

      if (response.ok) {
        const reviewCriada = await response.json();
        alert(`Review criada com sucesso: ${reviewCriada.titulo}`);
        reset();
      } else {
        const errorData = await response.json();
        console.error("Erro ao criar review:", errorData);
        alert(`Erro ao criar review: ${errorData?.error || JSON.stringify(errorData, null, 2)}`);
      }
    } catch (error) {
      console.error("Erro no fetch:", error);
      alert(`Erro ao criar review: ${error}`);
    }
  }

  return (
    <div className="flex justify-between mx-10 my-10">
      <div className="flex flex-col w-300 h-600 items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 w-1/2 border p-6 bg-white">
          <label>Título</label>
          <input type="text" {...register("titulo", { required: true })} className="border"/>

          <label>Conteúdo</label>
          <textarea {...register("conteudo")} className="border"/>

          <label>Nota (0-5)</label>
          <input type="number" min={0} max={5} {...register("nota", { required: true })} className="border"/>

          <label>ID do Livro</label>
          <input type="number" {...register("livros_id", { required: true })} className="border"/>

          <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 rounded">
            Criar Review
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-2">        
        {listaLivros}
      </div>
    </div>
  );
}
