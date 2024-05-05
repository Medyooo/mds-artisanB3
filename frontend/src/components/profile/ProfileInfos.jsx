import React, { useState } from 'react'
import { FaPen } from 'react-icons/fa'
import { useAuth } from '../../contexts/authContext'
import ProfilEdit from '../popups/ProfilEdit'

const ProfileInfos = () => {
  const { state: { user, jwt }, updateUserInfo } = useAuth()

  const [showEdit, setShowEdit] = useState(false)

  const [currentInfo, setCurrentInfo] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    location: 'France'

  })

  const handleUserInfoSave = (newInfo) => {
    updateUserInfo(newInfo, user.id, jwt).then(() => {
      setCurrentInfo(newInfo) // Met à jour l'état local après la sauvegarde
      setShowEdit(false) // Ferme le popup d'édition
    }).catch(error => {
      console.error("Erreur lors de la mise à jour des informations de l'utilisateur:", error)
    })
  }
  const handleEditClick = () => {
    setShowEdit(true)
  }

  return (
    <>

      {
        showEdit && <ProfilEdit onSave={handleUserInfoSave} initialInfo={currentInfo} onClickQuit={() => setShowEdit(false)} />
      }
      <div className=' flex flex-col w-full h-80 bg-white rounded-2xl shadow-lg gap-12 p-5'>
        <div className='flex flex-row items-center justify-between'>
          <div className='text text-[#344767] text-xl font-semibold'>Informations Personnelles </div>
          <FaPen color='#8392ab' onClick={() => handleEditClick()} />
        </div>
        <div className='flex flex-col gap-4 '>
          <div className='flex flex-row gap-2'>
            <div className='text text-[#344767] font-bold'>Prénom :</div>
            <div className='text text-[#67748e]'>{currentInfo.firstName}</div>
          </div>
          <div className='flex flex-row gap-2'>
            <div className='text text-[#344767] font-bold'>Nom :</div>
            <div className='text text-[#67748e]'>{currentInfo.lastName}</div>
          </div>
          <div className='flex flex-row gap-2'>
            <div className='text text-[#344767] font-bold'>Nom d'utilisateur :</div>
            <div className='text text-[#67748e]'>{currentInfo.username}</div>
          </div>
          <div className='flex flex-row gap-2'>
            <div className='text text-[#344767] font-bold'>E-mail :</div>
            <div className='text text-[#67748e]'>{currentInfo.email}</div>
          </div>
          <div className='flex flex-row gap-2'>
            <div className='text text-[#344767] font-bold'>Location :</div>
            <div className='text text-[#67748e]'>{currentInfo.location}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileInfos
