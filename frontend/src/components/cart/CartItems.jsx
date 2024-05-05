import { RiShoppingCartFill } from 'react-icons/ri'
import { useCart } from '../../contexts/CartContext'
import CartItem from './CartItem'

const CartItems = () => {
  const { state: { items } } = useCart()

  // Output to console for debugging
  console.log(items)

  return (
    <>
      <div className='relative flex flex-col w-8/12 h-[800px] bg-white rounded-2xl shadow-lg gap-12 p-5'>
        <div className='flex flex-row items-center gap-3'>
          <RiShoppingCartFill color='#344767' size={28} />
          <div className='text text-darkBlue text-2xl font-semibold'>Mon panier</div>
        </div>
        <div className='flex flex-col gap-4 overflow-y-auto overscroll-contain scrollbar'>
          {items.length > 0
            ? (
                items.map(cartItem => (
                  <CartItem key={cartItem.item.id} cartItem={cartItem} />
                ))
              )
            : (
              <div className='text-center text-gray-600 text-xl'>
                Votre panier est vide.
              </div>
              )}
        </div>
      </div>
    </>
  )
}

export default CartItems
