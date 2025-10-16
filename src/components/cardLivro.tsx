import type { LivroType } from "../utils/LivroType"

export function CardLivro({data}: {data: LivroType}) {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 h-100 w-50">
            <div className="p-5">
                <img src={data.foto} alt="" className="w-50 h-50"/>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {data.nome}
                </h5>
                <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Id do Livro: {Number(data.id)}</p>
            </div>
        </div>
    )
}