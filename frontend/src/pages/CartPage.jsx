import CartItems from '../components/cart/CartItems'
import CartDetails from '../components/cart/CartDetails'
import { useCart } from '../contexts/CartContext'

const CartPage = () => {
  const { state: { items } } = useCart()

  return (

    <div className='flex flex-row justify-between px-6 pt-12 pb-20 gap-4'>

      <CartItems items={items} />
      <CartDetails />
    </div>
  )
}

export default CartPage
