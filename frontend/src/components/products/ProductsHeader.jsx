import React from 'react'
import { FaHouse } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const ProductsHeader = () => {
  return (
    <div className='flex flex-col gap-1'>
      <div className='flex flex-row items-center  gap-3'>
        <Link to='/'>
          <FaHouse color='grey' />
        </Link>
        <div className='text text-grey'>/</div>
        <Link to='/addProduct'>
          <div className='text text-darkBlue font-normal '>Add Products</div>
        </Link>
      </div>
      <div className=' text text-darkBlue font-bold'>Add Products</div>
    </div>
  )
}

export default ProductsHeader
