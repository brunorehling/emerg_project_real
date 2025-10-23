import { useEffect, useState } from "react";
import { CardReview } from "./components/CardReview";
import { InputPesquisa } from "./components/InputPesquisa";
import type { ReviewType } from "./utils/ReviewType";
import { useUsuarioStore } from "./context/ClienteContext";

const apiUrl = import.meta.env.VITE_API_URL;

export default function App() {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const { logaUsuario } = useUsuarioStore();

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${apiUrl}/reviews`);
      const dados = await response.json();
      setReviews(dados);
    }

    async function buscaCliente(id: string) {
      const response = await fetch(`${apiUrl}/usuarios/${id}`);
      const dados = await response.json();
      logaUsuario(dados);
    }

    buscaDados();

    const clienteStr = localStorage.getItem("clienteKey");
    if (clienteStr) {
      try {
        const clienteData = JSON.parse(clienteStr);

        if (typeof clienteData === "object" && clienteData !== null && clienteData.id) {
          logaUsuario(clienteData);
        } else if (typeof clienteData === "string") {
          buscaCliente(clienteData);
        }
      } catch (e) {
        console.error("Erro ao carregar cliente do localStorage:", e);
      }
    }
  }, []);

  const listaReviews = reviews.map((review) => (
    <div key={review.id} className="w-[calc(20%-0.75rem)]">
      <CardReview data={review} />
    </div>
  ));

  return (
    <>
      <InputPesquisa setReviews={setReviews} />
      <div className="max-w-7xl mx-auto">
        <h1 className="mb-4 mx-80 text-3xl font-extrabold leading-none tracking-tight text-black md:text-5xl lg:text-6xl dark:text-white">
          Reviews{" "}
          <span className="underline underline-offset-3 decoration-8 decoration-black dark:decoration-black">
            em destaque
          </span>
        </h1>

        <div className="flex flex-wrap gap-3">
          {listaReviews}
        </div>
      </div>
    </>
  );
}
