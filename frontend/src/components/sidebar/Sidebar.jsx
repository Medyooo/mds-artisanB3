import { FaUser } from 'react-icons/fa'

import { MdDashboardCustomize, MdAddToPhotos } from 'react-icons/md'
import { Link } from 'react-router-dom'

import SidebarItem from './sideBarItems/SidebarItem'
import { useAuth } from '../../contexts/authContext'

const Sidebar = ({ profilSelected, dashboardSelected, addProductsSelected }) => {
  const { state: { user, isLoggedIn } } = useAuth() // Assuming 'user' now includes 'isArtisan' or similar attribute

  return (
    <div className='fixed flex flex-col gap-2 bg-[#f7f9fb] w-48 py-10'>
      <div className='w-full h-1 bg-gradient-to-r from-cyan-300 to-primary mb-8' />

      {/* Render Dashboard link only if the user is logged in and is an artisan */}
      {isLoggedIn && (
        <>

          <div className='text text-[#828fa2] font-bold text-lg'>Gestion</div>

          <Link to='/dashboard'>
            <SidebarItem title='Dashboard' icon={MdDashboardCustomize} isSelected={dashboardSelected} />
          </Link>
        </>
      )}

      {/* Render Add Products link only if the user is logged in and is an artisan */}
      {isLoggedIn && (
        <Link to='/addProduct'>
          <SidebarItem title='Add Products' icon={MdAddToPhotos} isSelected={addProductsSelected} />
        </Link>
      )}

      <div className='text text-[#828fa2] font-bold text-lg'>Compte</div>
      <Link to='/profile'>
        <SidebarItem title='Profil' icon={FaUser} isSelected={profilSelected} />
      </Link>

    </div>
  )
}

export default Sidebar
