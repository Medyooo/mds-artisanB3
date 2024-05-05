import React, { useEffect, useRef, useState } from 'react'
import { IoAddCircle } from 'react-icons/io5'
import { RiImageAddFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../contexts/authContext'
import { useFetch } from '../../hooks/Api'

const AddProductContainer = () => {
  const [productInfo, setProductInfo] = useState({
    name: '',
    description: '',
    price: '',
    picture: null
  })
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setProductInfo(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }))
    if (files) {
      setImagePreview(URL.createObjectURL(files[0]))
    }
  }

  const handleIconClick = () => {
    fileInputRef.current.click()
  }

  const [artisanInfo, setArtisanInfo] = useState('')
  const { state: { jwt, user } } = useAuth()
  const navigate = useNavigate()
  const { response: artisanResponse } = useFetch(`/artisans?filters[user][id][$eq]=${user.id}&populate=*`)

  useEffect(() => {
    if (artisanResponse && artisanResponse.length > 0) {
      const artisanInfo = artisanResponse[0]
      setArtisanInfo(artisanInfo)
    }
  }, [artisanResponse])

  const handleSubmit = async (event) => {
    event.preventDefault()
    // tous les champs sont requis
    if (!productInfo.name || !productInfo.description || !productInfo.price || !productInfo.picture) {
      toast.error('Veuillez remplir tous les champs avant de soumettre le formulaire.')
      return
    }

    const priceValue = parseFloat(productInfo.price)
    if (isNaN(priceValue) || priceValue <= 0) {
      toast.error('Le prix du produit doit être supérieur à 0.')
      return
    }

    // objet pour les données
    const formData = new FormData()
    formData.append('files.picture', productInfo.picture)
    formData.append('data', JSON.stringify({
      name: productInfo.name,
      description: productInfo.description,
      price: parseFloat(productInfo.price),
      artisan: artisanInfo
    }))

    try {
      const response = await fetch('http://localhost:1337/api/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt} `
        },
        body: formData
      })

      if (response.ok) {
        toast.success('Produit ajouté avec succès!')
        navigate('/dashboard')
      }

      // const result = await response.json();
      // console.log('Réponse de l\'API : ', result);
    } catch (error) {
      toast.error('Il y a eu un problème avec l\'ajout du produit: ' + error.message)
    }
  }
  /*

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!productInfo.name || !productInfo.description || !productInfo.price || !productInfo.picture) {
      toast.error('Veuillez remplir tous les champs avant de soumettre le formulaire.')
      return
    }

    try {
      await createProduct(productInfo)
      toast.success('Produit ajouté avec succès!')
    } catch (error) {
      console.error('Error submitting product:', error)
      toast.error('Erreur lors de la création du produit: ' + error.message)
    }
  }
*/
  return (
    <div className='flex flex-row justify-between w-full h-[650px] bg-white rounded-2xl shadow-lg gap-28 p-5'>
      <div className='relative flex flex-col gap-12 p-5'>
        <div className='flex flex-row items-center gap-3'>
          <IoAddCircle color='#344767' size={28} />
          <div className='text text-darkBlue text-2xl font-semibold'>Ajouter un produit</div>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <div className='text text-xl text-[#344767] font-semibold'>
            Nom de produit:
          </div>
          <input
            className='text-lg text-[#768197] border rounded-full py-3 px-2'
            value={productInfo.name}
            name='name'
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-row items-center gap-4'>
          <div className='text text-xl text-[#344767] font-semibold'>
            Description:
          </div>
          <textarea
            className='text-lg text-[#768197] border rounded-full py-3 px-8 h-32 w-[400px]'
            value={productInfo.description}
            placeholder='Description'
            name='description'
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-row items-center gap-4'>
          <div className='text text-xl text-[#344767] font-semibold'>
            Prix:
          </div>
          <input
            className='text-xl text-[#768197] border rounded-full py-3 px-2'
            value={productInfo.price}
            name='price'
            onChange={handleChange}
            type='number'
          />
          <span>EUR</span>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <RiImageAddFill size={256} color='#344767' onClick={handleIconClick} style={{ cursor: 'pointer' }} />
        <input
          type='file'
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleChange}
          name='picture'
          accept='image/*'
        />
        {imagePreview && <img src={imagePreview} alt='Preview' style={{ width: '100px', height: '100px' }} />}
      </div>
      <div className='flex flex-col justify-end items-end'>
        <button
          className='p-6 rounded-2xl bg-gradient-to-r from-primary to-[#344767] text-white text-xl font-bold hover:shadow-lg'
          onClick={handleSubmit}
        >
          Ajouter
        </button>
      </div>
    </div>
  )
}

export default AddProductContainer
