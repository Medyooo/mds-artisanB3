import React from 'react'
import { FaStar } from 'react-icons/fa6'

const Wishlist = () => {
  return (
    <div className=' flex flex-col w-full h-80 bg-white rounded-2xl shadow-lg gap-12 p-5'>
      <div className='flex flex-row items-center  gap-3'>
        <FaStar color='#8392ab' size={20} />
        <div className='text text-[#344767] text-xl font-semibold'>Wishlist</div>
      </div>
      <div className='flex flex-col gap-4 ' />
    </div>
  )
}

export default Wishlist
