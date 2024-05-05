import React from 'react'
import { FaHouse } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

const ProfileHeader = () => {
  const { state: { user } } = useAuth()
  return (
    <div className=' relative w-full h-72 bg-[url("/src/assets/curved0.jpg")] bg-cover  rounded-2xl shadow-2xl p-5 '>
      <div className='flex flex-row items-center  gap-3'>
        <Link to='/'>
          <FaHouse color='white' />
        </Link>
        <div className='text text-white'>/</div>
        <Link to='/profile'>
          <div className='text text-white font-bold'>Profil</div>
        </Link>
      </div>
      <div className=' relative top-48 flex flex-row justify-start items-center gap-4 w-full h-28  bg-slate-50/[.6] backdrop-blur-xl rounded-xl shadow-lg px-5 '>
        <div className=' h-20 w-20 bg-slate-600 rounded-xl'>
          <img
            src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
            alt='profilePicture'
            className='rounded-lg'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='text font-semibold  text-[#344767]'> {user.firstName}  {user.lastName}</div>
          <div className='text font-regular text-[#67748e]'> Utilisateur</div>

        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
