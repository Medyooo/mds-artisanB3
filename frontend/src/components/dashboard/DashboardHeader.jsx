import React, { useEffect, useState } from 'react'
import { FaHouse } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import DashboardState from './DashboardState'
import { useFetch } from '../../hooks/Api'
import { useAuth } from '../../contexts/authContext'

const DashboardHeader = ({ artisanImg }) => {
  const { state: { user } } = useAuth()

  const [profilePictureUrl, setProfilePictureUrl] = useState('')
  const [artisanName, setArtisanName] = useState('')

  const { response: artisanResponse } = useFetch(`/artisans?filters[user][id][$eq]=${user.id}&populate=*`)

  useEffect(() => {
    if (artisanResponse && artisanResponse.length > 0) {
      const artisanData = artisanResponse[0]
      const profilePictureUrl = process.env.REACT_APP_IMAGES_URL + artisanData.attributes.profilePicture.data.attributes.url // Adjust path as necessary based on your data structure
      setArtisanName(artisanData.attributes.name)
      setProfilePictureUrl(profilePictureUrl) // Assume you have a state to hold this URL
    }
  }, [artisanResponse])
  return (

    <>

      <div className=' relative w-full h-72 bg-[url("/src/assets/curved14.jpg")] bg-cover bg-bottom rounded-2xl shadow-2xl p-5 '>
        <div className='flex flex-row items-center  gap-3'>
          <Link to='/'>
            <FaHouse color='white' />
          </Link>
          <div className='text text-white'>/</div>
          <Link to='/dashboard'>
            <div className='text text-white font-bold'>Dashboard</div>
          </Link>
        </div>
        <div className=' relative top-48 flex flex-row justify-start items-center gap-4 w-full h-32  bg-slate-50/[.6] backdrop-blur-xl rounded-xl shadow-lg px-5 '>
          <div className=' flex items-center h-20 w-20 rounded-xl'>
            <img
              src={profilePictureUrl}
              alt='profilePicture'
              className='rounded-lg '
            />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='text font-semibold  text-[#344767]'>{artisanName}</div>
            <div className='text font-regular text-[#67748e]'>Artisan</div>

          </div>

          <DashboardState />
        </div>

      </div>
    </>

  )
}

export default DashboardHeader
