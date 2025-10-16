import type { LivroType } from "./LivroType"
import type { UsuarioType } from "./UsuarioType"

export type ReviewType = {
    destaque: any
    id: number
    titulo: string
    conteudo?: string
    nota : number
    createdAt: Date
    updatedAt: Date
    usuarioId?: number
    livros_id?: number
    usuario?: UsuarioType
    livro?: LivroType
  }
  