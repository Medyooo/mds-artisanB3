import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import PropTypes from 'prop-types'
import ArtisanAvatar from '../ArtisanAvatar'
import { useCart } from '../../contexts/CartContext'
import { FaCartPlus } from 'react-icons/fa6'

function ProductsListItem ({ product }) {
  const { name, description, price, picture, artisan } = product.attributes
  const imgUrl = process.env.REACT_APP_IMAGES_URL + picture?.data[0]?.attributes?.url
  const showArtisan = artisan && artisan.data && artisan.data.attributes && artisan?.data?.attributes?.profilePicture

  const { addToCart } = useCart()

  const handleClick = () => {
    addToCart(product)
  }
  return (
    <Card className='max-w-[400px] min-h-[600px] flex flex-col flex-grow'>
      <CardHeader className='p-0'>
        <img
          src={imgUrl}
        />
      </CardHeader>
      <CardBody className='flex flex-col gap-4 justify-between'>
        <div className='flex flex-row justify-between'>
          <h3 className='font-semibold text-xl'>{name}</h3>
          <FaCartPlus size={25} onClick={handleClick} />

        </div>
        <p>{description}</p>
      </CardBody>
      <CardFooter className='flex flex-row justify-between'>
        {
          showArtisan && <ArtisanAvatar artisan={artisan} />
        }
        <p className={`w-${showArtisan ? '1/6' : 'full'} flex justify-end text-right text-xl font-semibold`}>{price} €</p>
      </CardFooter>
    </Card>
  )
}

ProductsListItem.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductsListItem
