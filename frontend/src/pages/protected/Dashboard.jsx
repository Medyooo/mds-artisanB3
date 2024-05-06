import { useEffect, useState } from 'react'
import DashboardHeader from '../../components/dashboard/DashboardHeader'
import DashboardMyProducts from '../../components/dashboard/DashboardMyProducts'
import Sidebar from '../../components/sidebar/Sidebar'
import { useAuth } from '../../contexts/authContext'
import { useFetch } from '../../hooks/Api'

function Dashboard () {
  const { state: { user } } = useAuth()
  const [artisanSlug, setArtisanSlug] = useState('')
  const [products, setProducts] = useState(null)
  const [isProductsLoading, setProductsLoading] = useState(false)
  const [productsError, setProductsError] = useState(null)

  // Inside your existing useEffect for artisanResponse

  const { response: artisanResponse, loading: artisanLoading } = useFetch(`/artisans?filters[user][id][$eq]=${user.id}&populate=*`)
  useEffect(() => {
    if (artisanResponse && artisanResponse.length > 0) {
      const artisanSlug = artisanResponse[0].attributes.name
      console.log(artisanSlug)
      setArtisanSlug(artisanSlug)
    }
  }, [artisanResponse])

  useEffect(() => {
    if (artisanSlug) {
      const fetchProducts = async () => {
        setProductsLoading(true)
        try {
          const response = await fetch(process.env.REACT_APP_API_URL + `/products?filters[artisan][name][$eq]=${artisanSlug}&populate=*`)
          const data = await response.json()
          setProducts(data)
        } catch (error) {
          setProductsError(error)
        } finally {
          setProductsLoading(false)
        }
      }

      fetchProducts()
    }
  }, [artisanSlug])
  // console.log(products)

  if (artisanLoading || isProductsLoading) {
    return <h1>Chargement...</h1>
  }

  if (productsError) {
    return <pre>{JSON.stringify(productsError, null, 2)}</pre>
  }
  return (
    <div className=' flex flex-row  px-10 py-5 w-full h-screen'>

      <div className='relative w-2/12'>
        <Sidebar dashboardSelected={1} profilSelected={0} />
      </div>
      <div className='flex flex-col w-10/12  gap-12'>
        <DashboardHeader />

        <div className='flex flex-row justify-start items-center gap-8' />
        <DashboardMyProducts products={products} />
      </div>
    </div>
  )
}

export default Dashboard
