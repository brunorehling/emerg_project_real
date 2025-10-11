import { useEffect, useState } from "react"

import ItemCarro from './components/itemLivro'
import type { LivroType } from "../utils/LivroType"
import { Link } from "react-router-dom"

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminCarros() {
  const [livros, setLivros] = useState<LivroType[]>([])

  useEffect(() => {
    async function getCarros() {
      const response = await fetch(`${apiUrl}/livros`)
      const dados = await response.json()
      setLivros(dados)
    }
    getCarros()
  }, [])

  const listaCarros = livros.map(livro => (
    <ItemCarro key={livro.id} livro={livro} livros={livros} setLivros={setLivros} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Cadastro de livros
        </h1>
        <Link to="/admin/livros/novo" 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Novo Livro
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto do livro
              </th>
              <th scope="col" className="px-6 py-3">
                Titulo do Livro
              </th>
              <th scope="col" className="px-6 py-3">
                Genero
              </th>
              <th scope="col" className="px-6 py-3">
                Autor
              </th>
              <th scope="col" className="px-6 py-3">
                Ano de lançamento
              </th>
              <th scope="col" className="px-6 py-3">
                descrição
              </th>
            </tr>
          </thead>
          <tbody>
            {listaCarros}
          </tbody>
        </table>
      </div>
    </div>
  )
}