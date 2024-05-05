import { useCart } from '../../contexts/CartContext'
import { RiShoppingCart2Line } from 'react-icons/ri'

const CartIcon = () => {
  const { state: { items } } = useCart()
  return (
    <div className=''>
      <RiShoppingCart2Line size={30} />
      <span className='badge'>{items.length}</span>
    </div>
  )
}

export default CartIcon
