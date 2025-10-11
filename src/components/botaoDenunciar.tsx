import { useState } from "react";

interface BotaoDenunciarProps {
  comentarioId: number;
  usuarioId: number;
}

const apiUrl = import.meta.env.VITE_API_URL


export function BotaoDenunciar({ comentarioId, usuarioId }: BotaoDenunciarProps) {
  const [abrir, setAbrir] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [mensagem, setMensagem] = useState("");

  const denunciar = async () => {
    if (motivo.trim().length < 5) {
      setMensagem("Informe um motivo com pelo menos 5 caracteres.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/denuncias`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comentarioId, usuarioId, motivo }),
      });
      if (response.status == 200){      
        setMensagem("Comentário denunciado com sucesso!");
        setMotivo("");
        setAbrir(false);}
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao enviar denúncia.");
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setAbrir(!abrir)}
        className="text-sm text-red-500 hover:underline"
      >
        Denunciar
      </button>

      {abrir && (
        <div className="absolute top-full left-0 mt-1 w-72 bg-white border rounded shadow-lg z-50 p-3">
          <h4 className="font-semibold mb-2">Motivo da denúncia</h4>
          <textarea
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            rows={3}
            className="w-full p-2 border rounded mb-2"
            placeholder="Digite o motivo"
          />
          {mensagem && (
            <p className="text-sm text-red-500 mb-2">{mensagem}</p>
          )}
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setAbrir(false)}
              className="px-3 py-1 border rounded"
            >
              Cancelar
            </button>
            <button
              onClick={denunciar}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
