import { NextUIProvider } from '@nextui-org/react'
import Header from './components/header/Header'
import { AuthProvider } from './contexts/authContext.jsx'
import Router from './navigation/Router.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ProductProvider } from './contexts/productsContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'

function App () {
  return (
    <div className=' bg-[#f7f9fb]'>
      <NextUIProvider>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <Header />
              <Router />
            </CartProvider>
          </ProductProvider>
          <ToastContainer />
        </AuthProvider>
      </NextUIProvider>
    </div>
  )
}

export default App
