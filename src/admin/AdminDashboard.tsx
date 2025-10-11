import './AdminDashboard.css'
import { useEffect, useState } from "react";
import { VictoryPie, VictoryLabel, VictoryTheme } from "victory";

const apiUrl = import.meta.env.VITE_API_URL

type graficoAdminDenuncias = {
  admin: string
  num: number
}

type graficoLivrosMaisComentados = {
  livro: string
  num: number
}

type geralDadosType = {
  livros: number;
  reviews: number
  denuncias: number
}

export default function AdminDashboard() {
  const [AdminDenuncia, setAdminDenuncia] = useState<graficoAdminDenuncias[]>([])
  const [livrosReviews, setLivrosReviews] = useState<graficoLivrosMaisComentados[]>([])
  const [dados, setDados] = useState<geralDadosType>({} as geralDadosType)

  useEffect(() => {
    async function getDadosGerais() {
      const response = await fetch(`${apiUrl}/dashboard/gerais`)
      const dados = await response.json()
      setDados(dados)
    }
    getDadosGerais()

    async function getDadosGraficoMarca() {
      const response = await fetch(`${apiUrl}/dashboard/admDenuncias`)
      const dados = await response.json()
      setAdminDenuncia(dados)
    }
    getDadosGraficoMarca()

    async function getDadosGraficoCliente() {
      const response = await fetch(`${apiUrl}/dashboard/LivrosReviews`)
      const dados = await response.json()
      setLivrosReviews(dados)
    }
    getDadosGraficoCliente()

  }, [])

  const listaAdminsPorDenuncia = AdminDenuncia.map(item => (
    { x: item.admin, y: item.num }
  ))

  const listalivrosComMaisReviews = livrosReviews.map(item => (
    { x: item.livro, y: item.num }
  ))

  return (
    <div className="container mt-24">
      <h2 className="text-3xl mb-4 font-bold">Visão Geral do Sistema</h2>

      <div className="w-2/3 flex justify-between mx-auto mb-5">
        <div className="border-blue-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-blue-100 text-blue-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-blue-900 dark:text-blue-300">
            {dados.livros}</span>
          <p className="font-bold mt-2 text-center">Nº livros cadastrados</p>
        </div>
        <div className="border-red-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-red-100 text-red-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-red-900 dark:text-red-300">
            {dados.reviews}</span>
          <p className="font-bold mt-2 text-center">Nº Reviews</p>
        </div>
        <div className="border-green-600 border rounded p-6 w-1/3">
          <span className="bg-green-100 text-green-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-green-900 dark:text-green-300">
            {dados.denuncias}</span>
          <p className="font-bold mt-2 text-center">Nº de denuncias dos usuarios</p>
        </div>
      </div>

      <div className="div-graficos">
        <svg viewBox="30 55 400 400">
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={listaAdminsPorDenuncia}
            innerRadius={50}
            labelRadius={80}
            theme={VictoryTheme.clean}
            style={{
              labels: {
                fontSize: 10,
                fill: "#fff",
                fontFamily: "Arial",
                fontWeight: "bold"
              }
            }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{
              fontSize: 12,
              fill: "#f00",
              fontFamily: "Arial",
              fontWeight: "bold"
            }}
            x={200}
            y={200}
            text={["Veículos", "por Marca"]}
          />
        </svg>

        <svg viewBox="30 55 400 400">
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={listalivrosComMaisReviews}
            innerRadius={50}
            labelRadius={80}
            theme={VictoryTheme.clean}
            style={{
              labels: {
                fontSize: 10,
                fill: "#fff",
                fontFamily: "Arial",
                fontWeight: "bold"
              }
            }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{
              fontSize: 12,
              fill: "#f00",
              fontFamily: "Arial",
              fontWeight: "bold"
            }}
            x={200}
            y={200}
            text={["Clientes", "por Cidade"]}
          />
        </svg>

      </div>
    </div>
  )
}