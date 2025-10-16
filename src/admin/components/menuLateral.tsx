import { useAdminStore } from "../context/AdminContext"
import { IoExitOutline } from "react-icons/io5"
import { BiSolidDashboard } from "react-icons/bi"
import { BsCashCoin } from "react-icons/bs"
import { FaRegUser } from "react-icons/fa"
import { FaBook } from 'react-icons/fa';

import { Link, useNavigate } from "react-router-dom"

export function MenuLateral() {
  const navigate = useNavigate()
  const { admin, deslogaAdmin } = useAdminStore()

  function adminSair() {
    if (confirm("Confirma Saída?")) {
      deslogaAdmin()
      navigate("/", { replace: true })
    }
  }

  return (
    <aside id="default-sidebar" className="fixed mt-24 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-500 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link to="/admin" className="flex items-center p-2">
              <span className="h-5 text-white text-2xl">
                <BiSolidDashboard />
              </span>
              <span className="text-white ms-2 mt-1">Visão Geral</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/livros" className="flex items-center p-2">
              <span className="h-5 text-white text-2xl">
                <FaBook/>
              </span>
              <span className="text-white ms-2 mt-1">Cadastro de livros</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/denuncias" className="flex items-center p-2 cursor-pointer">
              <span className="h-5 text-white text-2xl">
                <BsCashCoin />
              </span>
              <span className="text-white ms-2 mt-1">Controle de Denuncias</span>
            </Link>
          </li>
          {admin.nivel == 3 &&
            <li>
              <Link to="/admin/cadAdmin" className="flex items-center p-2 cursor-pointer">
                <span className="h-5 text-white text-2xl">
                  <FaRegUser />
                </span>
                <span className="text-white ms-2 mt-1">Cadastro de Admins</span>
              </Link>
            </li>
          }
          <li>
            <span className="flex items-center p-2 cursor-pointer">
              <span className="h-5 text-white text-2xl">
                <IoExitOutline />
              </span>
              <span className="text-white ms-2 mt-1" onClick={adminSair}>Sair do Sistema</span>
            </span>
          </li>
        </ul>
      </div>
    </aside>
  )
}