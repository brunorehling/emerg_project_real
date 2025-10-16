import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useUsuarioStore } from "./context/ClienteContext"

type Inputs = {
    nome: string
    email: string
    senha: string
    confirmaSenha: string
    manter: boolean
}

const apiUrl = import.meta.env.VITE_API_URL

function Cadastro() {
    const { register, handleSubmit} = useForm<Inputs>()
    const { logaUsuario } = useUsuarioStore()
    const navigate = useNavigate()

    async function registraUsuario(data: Inputs) {
        if (data.senha !== data.confirmaSenha) {
            toast.error("As senhas não conferem")
            return
        }

        const response = await fetch(`${apiUrl}/usuarios`, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                nome: data.nome,
                email: data.email,
                senha: data.senha
            })
        })

        if (response.status === 201) {
            const dados = await response.json()
            logaUsuario(dados)

            if (data.manter) {
                localStorage.setItem("clienteKey", JSON.stringify(dados))
            }

            toast.success("Cadastro realizado com sucesso!")
            navigate("/")
        } else {
            toast.error("Erro ao cadastrar usuário")
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <p style={{ height: 48 }}></p>
            <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Cadastro de Cliente
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(registraUsuario)}>
                            <div>
                                <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Nome Completo
                                </label>
                                <input type="text" id="nome"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    {...register("nome")} />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Email
                                </label>
                                <input type="email" id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    {...register("email")} />
                            </div>
                            <div>
                                <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Senha
                                </label>
                                <input type="password" id="senha"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    {...register("senha")} />
                            </div>
                            <div>
                                <label htmlFor="confirmaSenha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Confirme a Senha
                                </label>
                                <input type="password" id="confirmaSenha"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    {...register("confirmaSenha")} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            {...register("manter")} />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Manter Conectado</label>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Cadastrar
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Já possui conta? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Faça Login</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cadastro