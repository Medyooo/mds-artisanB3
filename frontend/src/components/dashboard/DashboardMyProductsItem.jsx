import React, { useState } from 'react'
import { FaPen } from 'react-icons/fa6'
import { MdDelete } from 'react-icons/md'
import Confirm from '../popups/Confirm'
import { useAuth } from '../../contexts/authContext'
import { useProduct } from '../../contexts/productsContext'
import { toast } from 'react-toastify'

const DashboardMyProductsItem = ({ product }) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const { name, description, price, picture } = product.attributes
  const imgUrl = process.env.REACT_APP_IMAGES_URL + picture?.data[0]?.attributes?.url

  const { deleteProduct } = useProduct()
  const { state: user } = useAuth()

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id, user.jwt)
      toast.success('Produit supprimé avec succès')
      window.location.reload()
    } catch (error) {
      toast.error('Erreur lors de la suppression du produit')
    }
  }

  return (
    <>
      {
      showConfirm && <Confirm message='Êtes-vous sûr(e) que vous voulez supprimer ce produit ?' onClickDelete={handleDelete} onClickQuit={() => setShowConfirm(false)} />
    }
      <div className='flex flex-row justify-between w-full px-4 py-6 '>
        <div className='flex flex-row gap-5'>

          <img src={imgUrl} alt='' className='w-40 h-40 rounded-2xl shadow-lg' />

          <div className='flex flex-col  gap-2'>
            <div className='text text-darkBlue font-bold text-xl'>{name}</div>
            <div className='text text-gray-400 text-md'>{description}</div>
            <div className='text text-darkBlue text-lg font-bold '> {price} EUR</div>
          </div>
        </div>
        <div className='flex flex-row justify-center  gap-5'>
          <button className='flex flex-row justify-center gap-1 text text-[#8392ab] text-md font-semibold'><FaPen size={18} color='#8392ab' />Modifier </button>

          <button className='flex flex-row justify-center gap-1 text text-[#d42525] font-semibold' onClick={() => setShowConfirm(true)}><MdDelete size={20} color='red' />Supprimer</button>

        </div>
      </div>
    </>
  )
}

export default DashboardMyProductsItem
