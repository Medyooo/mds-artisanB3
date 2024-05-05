import { MdDelete } from 'react-icons/md'
import { useCart } from '../../contexts/CartContext'
import PropTypes from 'prop-types'

const CartItem = ({ cartItem }) => {
  const { removeFromCart } = useCart()
  console.log(cartItem)
  const imageUrl = process.env.REACT_APP_IMAGES_URL + cartItem.item.attributes.picture.data[0].attributes.url
  console.log(imageUrl)
  if (!cartItem || !cartItem.item) {
    return <div>Item not available</div> // or handle this case appropriately
  }

  return (
    <div className='flex flex-row justify-between w-full px-4 py-6 rounded-2xl border-b-1 shadow-sm'>
      <div className='flex flex-row gap-5'>
        <img src={imageUrl} alt='photo' className='w-40 h-40 rounded-2xl shadow-lg' />
        <div key={cartItem.item.id} className='flex flex-col gap-2'>
          <div className='text text-darkBlue font-bold text-xl'>{cartItem.item.attributes.name}</div>
          <div className='text text-gray-400 text-md'>{cartItem.item.attributes.description}</div>
          <div className='text text-darkBlue text-lg font-bold '>{cartItem.qty}</div>
          <div className='text text-darkBlue text-lg font-bold '>{cartItem.item.attributes.price}</div>
          <div className='text text-darkBlue text-lg font-bold '>{(cartItem.qty * cartItem.item.attributes.price).toFixed(2)} EUR</div>
        </div>
      </div>
      <div className='flex flex-row justify-center gap-5'>
        <button onClick={() => removeFromCart(cartItem.item.id)} className='flex flex-row justify-center gap-1 text text-[#d42525] font-semibold'>
          <MdDelete size={20} color='red' />Supprimer
        </button>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      attributes: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number
      }).isRequired
    }).isRequired,
    qty: PropTypes.number.isRequired
  }).isRequired
}

export default CartItem
