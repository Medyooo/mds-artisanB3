import ProfileHeader from '../../components/profile/ProfileHeader'
import ProfileInfos from '../../components/profile/ProfileInfos'
import Sidebar from '../../components/sidebar/Sidebar'
import Wishlist from '../../components/wishlist/Wishlist'

function ProfilePage () {
  return (
    <div className=' flex flex-row  px-10 py-5 w-full h-screen'>

      <div className='relative w-2/12'>
        <Sidebar profilSelected={1} dashboardSelected={0} />
      </div>
      <div className='flex flex-col w-10/12  gap-24'>
        <ProfileHeader />
        <div className='flex flex-row justify-start items-center gap-8'>
          <ProfileInfos />
          <Wishlist size='small' />

        </div>

      </div>
    </div>

  )
}

export default ProfilePage
