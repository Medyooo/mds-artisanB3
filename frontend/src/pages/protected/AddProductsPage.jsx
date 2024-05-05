import AddProductContainer from '../../components/products/AddProductContainer'
import ProductsHeader from '../../components/products/ProductsHeader'
import Sidebar from '../../components/sidebar/Sidebar'

function AddProductPage () {
  return (
    <div className=' flex flex-row  px-10 py-5 w-full h-screen'>

      <div className='relative w-2/12'>
        <Sidebar dashboardSelected={0} profilSelected={0} addProductsSelected={1} />
      </div>
      <div className='flex flex-col w-10/12  gap-24'>
        <ProductsHeader />
        <div className='flex flex-row justify-start items-center gap-8'>
          <AddProductContainer />

        </div>

      </div>
    </div>
  )
}

export default AddProductPage
