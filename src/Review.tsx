import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useUsuarioStore } from "./context/ClienteContext";
import type { LivroType } from "./utils/LivroType";

const apiUrl = import.meta.env.VITE_API_URL;

type FormData = {
  titulo: string;
  conteudo?: string;
  nota: number;
  livroId: number;
};

export default function CriarReview() {
  const { register, handleSubmit, reset, setValue } = useForm<FormData>();
  const [livros, setLivros] = useState<LivroType[]>([]);
  const { usuario } = useUsuarioStore();

  useEffect(() => {
    fetch(`${apiUrl}/livros`)
      .then((res) => res.json())
      .then((data) => setLivros(data))
      .catch((err) => console.error("Erro ao carregar livros:", err));
  }, []);

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
          titulo: data.titulo,
          conteudo: data.conteudo,
          nota: Number(data.nota),
          livros_id: Number(data.livroId),
          usuarioId: usuario.id,
        }),
      });

      if (response.ok) {
        const reviewCriada = await response.json();
        alert(`Review criada com sucesso: ${reviewCriada.titulo}`);
        reset();
      } else {
        const errorData = await response.json();
        alert(`Erro ao criar review: ${errorData?.error || JSON.stringify(errorData, null, 2)}`);
      }
    } catch (error) {
      console.error("Erro no fetch:", error);
      alert(`Erro ao criar review: ${error}`);
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 mx-6 my-10">
      
      {/* Formulário */}
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Criar Review</h2>

        <label className="text-gray-700 dark:text-gray-300">Título</label>
        <input 
          type="text" 
          {...register("titulo", { required: true })} 
          className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />

        <label className="text-gray-700 dark:text-gray-300">Conteúdo</label>
        <textarea 
          {...register("conteudo")} 
          className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />

        <label className="text-gray-700 dark:text-gray-300">Nota (0-5)</label>
        <input 
          type="number" 
          min={0} 
          max={5} 
          {...register("nota", { required: true })} 
          className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />

        <label className="text-gray-700 dark:text-gray-300">Livro</label>
        <input 
          type="text" 
          list="livros-list" 
          onChange={(e) => {
            const livroSelecionado = livros.find(l => l.nome === e.target.value);
            if (livroSelecionado) setValue("livroId", livroSelecionado.id);
          }}
          placeholder="Digite o nome do livro"
          className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <datalist id="livros-list">
          {livros.map(livro => (
            <option key={livro.id} value={livro.nome} />
          ))}
        </datalist>

        <button 
          type="submit" 
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition mt-2"
        >
          Criar Review
        </button>
      </form>

      {/* Lista de livros */}
      <div className="flex-1 max-w-3xl">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Livros</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 justify-start">
          {livros.map((livro) => (
            <div 
              key={livro.id} 
              className="border rounded-lg p-1 bg-white dark:bg-gray-700 shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex flex-col items-center w-28"
            >
              {livro.foto && (
                <img 
                  src={livro.foto} 
                  alt={livro.nome} 
                  className="w-20 h-28 object-cover rounded mb-1"
                />
              )}
              <span className="text-center text-gray-900 dark:text-white font-medium text-sm">{livro.nome}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
