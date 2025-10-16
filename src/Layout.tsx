import Titulo from './components/Titulo.tsx'
import { Outlet } from 'react-router-dom'

import { Toaster } from 'sonner'

export default function Layout() {
  return (
    <>
      <div
      className="w-full h-screen bg-blue-900 bg-cover bg-center"
    >
        <Titulo />
        <Outlet />
        <Toaster richColors position="top-center" />
      </div>
    </>
  )
}
