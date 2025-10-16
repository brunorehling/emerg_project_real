import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'
import Login from './Login.tsx'
import Detalhes from './Detalhes.tsx'
import Review from './Review.tsx'

import AdminLayout from './admin/AdminLayout.tsx';
import AdminLogin from './admin/AdminLogin.tsx';            
import AdminDashboard from './admin/AdminDashboard.tsx';    
import AdminLivros from './admin/AdminLivros.tsx';                   
import AdminCadAdmin from './admin/AdminCadAdmin.tsx';
import AdminNovoLivro from './admin/AdminNovoLivro.tsx';  
import ListaDenuncias from './admin/AdminDenuncias.tsx';            


import Layout from './Layout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MinhasReviews from './minhasReviews.tsx'
import Cadastro from './Cadastro.tsx'

const rotas = createBrowserRouter([
  {
    path: "/admin/login",
    element: <AdminLogin />,   // rota do form de login sem o Layout da Área Administrativa
  },
  {
    path: "/admin",
    element: <AdminLayout />,  // layout principal do admin com menus e outlet
    children: [
      { index: true, element: <AdminDashboard /> },          // rota /admin
      { path: "livros", element: <AdminLivros /> },          // rota /admin/carros  /
      { path: "cadAdmin", element: <AdminCadAdmin /> },
      { path: "livros/novo", element: <AdminNovoLivro /> },
           { path: "denuncias", element: <ListaDenuncias /> },  // ...
    ],
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'login', element: <Login /> },
      { path: 'cadastro', element: <Cadastro /> },
      { path: 'detalhes/:reviewId', element: <Detalhes /> },
      { path: 'review', element: <Review /> },
      { path: 'minhasReviews', element: <MinhasReviews /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)