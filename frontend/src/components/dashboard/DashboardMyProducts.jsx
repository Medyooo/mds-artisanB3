import PropTypes from 'prop-types'

import { CiShoppingTag } from 'react-icons/ci'
import DashboardMyProductsItem from './DashboardMyProductsItem'

/**
 *
 * @param {Array} products
 * @returns {React.Component} ProductList
 */
const DashboardMyProducts = ({ products }) => {
  if (!products || products.length < 1) return 'No data'
  return (
    <>
      <div className='relative flex flex-col w-full h-[650px]  bg-white rounded-2xl shadow-lg gap-12 p-5'>
        <div className='flex flex-row items-center  gap-3'>
          <CiShoppingTag color='#344767' size={28} />
          <div className='text text-darkBlue text-2xl font-semibold'>Mes Produits</div>
        </div>
        <div className=' flex flex-col gap-4 overflow-y-auto overscroll-contain scrollbar'>
          {

        products.data.map(product => (
          <DashboardMyProductsItem key={product.id} product={product} />
        ))

      }

        </div>
      </div>
    </>
  )
}
DashboardMyProducts.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object)
}

export default DashboardMyProducts
