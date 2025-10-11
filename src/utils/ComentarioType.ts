import type { UsuarioType } from "./UsuarioType"

export type ComentarioType = {
    id: number
    usuario: UsuarioType
    conteudo:  string
    usuarioId: number
    createdAt: string
  }
  