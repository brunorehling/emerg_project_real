import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import type { AutorType } from "../utils/AutorType"
import { useAdminStore } from "./context/AdminContext"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
    id: number
    nome: string
    dataLancamento: Date
    foto: string
    descricao: string
    createdAt: Date
    updatedAt: Date
    genero?: "ACAO" | "DRAMA" | "FICCAO" | "TERROR" | "ROMANCE" | "COMEDIA"
    autorNome?: string
    autor?: AutorType
    adminId?: string
}

export default function AdminNovoLivro() {
  const [autores, setAutores] = useState<AutorType[]>([])
  const { admin } = useAdminStore()

  const { register, handleSubmit, reset, setFocus } = useForm<Inputs>()

  useEffect(() => {
    async function getAutores() {
      const response = await fetch(`${apiUrl}/autores`)
      const dados = await response.json()
      setAutores(dados)
    }
    getAutores()
    setFocus("nome")
  }, [])

  const optionsAutores = autores.map(autor => (
    <option key={autor.id} value={autor.nome}>{autor.nome}</option>
  ))

  async function incluirLivro(data: Inputs) {
    const novoLivro: Inputs = {
      ...data,
      dataLancamento: new Date(data.dataLancamento),
      adminId: admin.id
    }

    const response = await fetch(`${apiUrl}/livros`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${admin.token}`
      },
      body: JSON.stringify(novoLivro)
    })

    if (response.status === 201) {
      toast.success("Livro cadastrado com sucesso")
      reset()
    } else {
      const errorData = await response.json()
      toast.error("Erro no cadastro do livro: " + (errorData.error?.message || ""))
    }
  }

  return (
    <>
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white me-56">
        Inclusão de Livros
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirLivro)}>
        <div className="mb-3">
          <label htmlFor="nome" className="block mb-2 text-sm font-medium">
            Título do Livro
          </label>
          <input
            type="text"
            id="nome"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            {...register("nome")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="autorNome" className="block mb-2 text-sm font-medium ">
            Autor
          </label>
          <select
            id="autorNome"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            {...register("autorNome")}
          >
            {optionsAutores}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="dataLancamento" className="block mb-2 text-sm font-medium  ">
            Data de Lançamento
          </label>
          <input
            type="date"
            id="dataLancamento"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            {...register("dataLancamento")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="descricao" className="block mb-2 text-sm font-medium ">
            Descrição
          </label>
          <textarea
            id="descricao"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            {...register("descricao")}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="foto" className="block mb-2 text-sm font-medium ">
            URL da Capa
          </label>
          <input
            type="text"
            id="foto"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            {...register("foto")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="genero" className="block mb-2 text-sm font-medium ">
            Gênero
          </label>
          <select
            id="genero"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            {...register("genero")}
          >
            <option value="">Selecione</option>
            <option value="ACAO">Ação</option>
            <option value="DRAMA">Drama</option>
            <option value="FICCAO">Ficção</option>
            <option value="TERROR">Terror</option>
            <option value="ROMANCE">Romance</option>
            <option value="COMEDIA">Comédia</option>
          </select>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Incluir
        </button>
      </form>
    </>
  )
}
