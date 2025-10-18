import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ContextProvider } from './context/contextVenda.jsx'
import { createBrowserRouter, RouterProvider, } from 'react-router'
import DetalhesVenda from './DetalhesVenda.jsx'
import Loja from './Loja.jsx'

const router = createBrowserRouter([{
  path: '/',
  element: <App/>
},
{
  path: '/Loja',
  element: <Loja/>
},
{
  path: '/vendas/:id',
  element: <DetalhesVenda/>
}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router = {router}/>
    </ContextProvider>
  </StrictMode>,
)
