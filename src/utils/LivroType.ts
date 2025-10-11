import type { AutorType } from "./AutorType"
import type { ReviewType } from "./ReviewType"

export type LivroType = {
    id: number
    nome: string
    dataLancamento: Date
    foto: string
    descricao: string
    createdAt: Date
    updatedAt: Date
    genero?: "ACAO" | "DRAMA" | "FICCAO" | "TERROR" | "ROMANCE" | "COMEDIA"
    autor_id?: number
    autor?: AutorType
    reviews?: ReviewType[]
  }
  