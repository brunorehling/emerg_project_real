import type { UsuarioType } from '../utils/UsuarioType'
import { create } from 'zustand'

type UsuarioStore = {
    usuario: UsuarioType
    logaUsuario: (UsuarioLogado: UsuarioType) => void
    deslogaUsuario: () => void
}

export const useUsuarioStore = create<UsuarioStore>((set) => ({
    usuario: {} as UsuarioType,
    logaUsuario: (UsuarioLogado) => set({usuario: UsuarioLogado}),
    deslogaUsuario: () => set({usuario: {} as UsuarioType})
}))