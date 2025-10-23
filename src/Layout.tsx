import Titulo from './components/Titulo.tsx'
import { Outlet } from 'react-router-dom'

import { Toaster } from 'sonner'

export default function Layout() {
  return (
    <>
      <div
      style={{ backgroundColor: "#B8BEFF80" }}
      className="w-full h-screen bg-cover"
    >
        <Titulo />
        <Outlet />
        <Toaster richColors position="top-center" />
      </div>
    </>
  )
}
