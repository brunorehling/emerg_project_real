import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { ReviewType } from "../utils/ReviewType";

const apiUrl = import.meta.env.VITE_API_URL;

type Inputs = {
  termo: string;
};

type InputPesquisaProps = {
  setReviews: React.Dispatch<React.SetStateAction<ReviewType[]>>;
};

export function InputPesquisa({ setReviews }: InputPesquisaProps) {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  // Função que envia a pesquisa
  async function enviaPesquisa(data: Inputs) {
    if (data.termo.length > 0 && data.termo.length < 2) {
      toast.error("Informe, no mínimo, 2 caracteres");
      return;
    }

    if (data.termo.length === 0) {
      await buscaTodasReviews();
      return;
    }

    const response = await fetch(`${apiUrl}/reviews/pesquisa/${data.termo}`);
    const dados = await response.json();
    setReviews(dados);
  }

  // Função que busca todas as reviews
  async function buscaTodasReviews() {
    const response = await fetch(`${apiUrl}/reviews`);
    const dados = await response.json();
    setReviews(dados);
    reset(); // limpa o input
  }

  return (
    <div className="flex justify-center mt-3">
      <form
        className="w-full max-w-3xl flex gap-2"
        onSubmit={handleSubmit(enviaPesquisa)}
      >
        <input
          type="search"
          placeholder="Informe o livro ou o título da review"
          {...register("termo")}
          className="flex-1 p-3 ps-4 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-r-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition"
        >
          Pesquisar
        </button>
        <button
          type="button"
          onClick={buscaTodasReviews}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
        >
          Voltar
        </button>
      </form>
    </div>
  );
}
