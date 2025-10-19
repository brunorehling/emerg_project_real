import { useForm } from "react-hook-form"

import { useNavigate } from "react-router-dom";

import { toast } from "sonner"
import { useUsuarioStore } from "./context/ClienteContext"
import "./index.css"

type Inputs = {
    email: string
    senha: string
    manter: boolean
}

const apiUrl = import.meta.env.VITE_API_URL

export default function Login() {
    const { register, handleSubmit } = useForm<Inputs>()    
    const { logaUsuario } = useUsuarioStore()

    const navigate = useNavigate()

    async function verificaLogin(data: Inputs) {
        const response = await 
          fetch(`${apiUrl}/usuarios/login`, {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify({ email: data.email, senha: data.senha })
          })
        
        if (response.status == 200) {           
            const dados = await response.json()

            logaUsuario(dados)
            
            if (data.manter) {
                localStorage.setItem("clienteKey", JSON.stringify(dados))
            } else {
                if (localStorage.getItem("clienteKey")) {
                    localStorage.removeItem("clienteKey")
                }
            }

            navigate("/")
        } else {
            toast.error("Erro... Login ou senha incorretos")
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center">
  <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Dados de Acesso do Cliente
      </h1>
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(verificaLogin)}>
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seu Email</label>
          <input
            type="email"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
            {...register("email")}
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha de Acesso</label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
            {...register("senha")}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-orange-300"
                {...register("manter")}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="remember" className="text-gray-500">Manter Conectado</label>
            </div>
          </div>
          <a href="#" className="text-sm font-medium text-orange-600 hover:underline">Esqueceu sua senha?</a>
        </div>
        <button type="submit" className="w-full text-white !bg-orange-600 !hover:bg-orange-700 !focus:ring-4 !focus:outline-none !focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Entrar
        </button>
        <p className="text-sm font-light text-gray-500">
          Ainda não possui conta? <a href="/cadastro" className="font-medium text-orange-600 hover:underline">Cadastre-se</a>
        </p>
      </form>
    </div>
  </div>
</section>

    )
}