import React, { useEffect, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import ProfilEdit from '../popups/ProfilEdit'
import { useAuth } from '../../contexts/authContext'

const ProfileContainer = () => {
  const { state: { user, jwt }, updateUserInfo } = useAuth()
  const [showEdit, setShowEdit] = useState(false)
  const [editText, setEditText] = useState('')
  const [currentInfo, setCurrentInfo] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username

  })

  useEffect(() => {
    setCurrentInfo({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.user
    })
  }, [])

  const handleUserInfoSave = (newInfo) => {
    let fieldToUpdate = editText.replace(' :', '').toLowerCase() // "Prénom :" devient "prénom"
    fieldToUpdate = fieldToUpdate === 'prénom' ? 'firstName' : fieldToUpdate // Traduire en clé d'API
    fieldToUpdate = fieldToUpdate === 'nom' ? 'lastName' : fieldToUpdate // Traduire en clé d'API
    fieldToUpdate = fieldToUpdate === 'e-mail' ? 'email' : fieldToUpdate // Traduire en clé d'API
    fieldToUpdate = fieldToUpdate === 'username' ? 'username' : fieldToUpdate // Traduire en clé d'API

    const userInfo = { [fieldToUpdate]: newInfo }
    const userId = user.id
    updateUserInfo(userInfo, userId, jwt)
  }

  const handleEditClick = (text, currentValue) => {
    setEditText(text)
    setCurrentInfo(currentValue)
    setShowEdit(true)
  }

  return (
    <>
      {
      showEdit && <ProfilEdit onSave={handleUserInfoSave} editText={editText} initialInfo={currentInfo} onClickQuit={() => setShowEdit(false)} />
    }
      <div className=' flex flex-col bg-primary  xl:w-[1600px] lg:w-[900px] md:w-[720px] xs:w-[300px]  py-14 px-20 gap-14  rounded-lg shadow-xl h-80'>
        <div className='flex text-white text-3xl font-bold tracking-wide '>Informations Personnelles :</div>
        <div className='flex flex-row flex-wrap justify-around'>
          <div className='flex flex-row ext text-white text-2xl tracking-wide gap-4'>
            <p> Prénom : </p>
            <div>{currentInfo.firstName}</div>
            <FaPencilAlt onClick={() => handleEditClick(user.firstName)} />

          </div>
          <div className='flex flex-row ext text-white text-2xl tracking-wide gap-4'>
            <p> Nom : </p>
            <div>{user.lastName} </div>
            <FaPencilAlt onClick={() => handleEditClick(user.lastName)} />

          </div>
        </div>
        <div className='flex flex-row justify-around flex-wrap'>
          <div className='flex flex-row ext text-white text-2xl tracking-wide gap-4'>
            <p> E-mail : </p>
            <div>{user.email}</div>
            <FaPencilAlt onClick={() => handleEditClick(user.email)} />

          </div>
          <div className='flex flex-row ext text-white text-2xl tracking-wide gap-4'>
            <p> Username : </p>
            <div>{user.username} </div>
            <FaPencilAlt onClick={() => handleEditClick(user.username)} />

          </div>

        </div>
      </div>
    </>
  )
}

export default ProfileContainer
