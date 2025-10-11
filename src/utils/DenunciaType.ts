export type DenunciaType = {
  id: number
  motivo: string
  status: string
  createdAt: string
  resolvidoPor?: string | null
  comentario: {
    id: number
    texto: string
    usuario: {
      id: number
      nome: string
    }
  }
  usuario: {
    id: number
    nome: string
  }
}
