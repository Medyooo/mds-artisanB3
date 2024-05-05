import confetti from 'canvas-confetti'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'

const CartDetails = () => {
  const { state, resetCart } = useCart()
  console.log(state.total)
  const navigate = useNavigate()
  const handleConfetti = () => {
    confetti({
      particleCount: 700,
      spread: 700,
      origin: { y: 0 }
    })

    navigate('/')
    resetCart()
  }
  return (
    <div className=' flex flex-col w-4/12 h-full justify-center items-center bg-white rounded-2xl shadow-md gap-12 px-6 py-12'>

      <div className='flex flex-row items-center  gap-3'>

        <div className='text font-bold text-darkBlue text-2xl'>Total :</div>
        <div className='text font-bold  text-2xl'>{(state.total).toFixed(2)} €</div>

      </div>

      <button onClick={handleConfetti} className='p-6 rounded-2xl bg-gradient-to-r from-primary to-[#344767] text-white text-xl font-bold hover:shadow-lg'>Passer la commande</button>

    </div>

  )
}

export default CartDetails
