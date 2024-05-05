import DashboardHeaderItem from './DashboardHeaderItem'
import { FaCircleDollarToSlot, FaShopLock, FaUsers } from 'react-icons/fa6'
import { FaShoppingBasket } from 'react-icons/fa'

const DashboardState = () => {
  return (
    <div className=' w-full flex flex-row  gap-8 '>
      <DashboardHeaderItem title={'Revenue d\'aujourd\'hui'} number='5,500' isPrice percentage={55} icon={FaCircleDollarToSlot} />
      <DashboardHeaderItem title={'Commandes  d\'aujourd\'hui'} number='36' percentage={25} icon={FaShopLock} />
      <DashboardHeaderItem title='Nouveaux clients' number='102' percentage={12.4} icon={FaUsers} />
      <DashboardHeaderItem title='Ventes' number='64,430' isPrice percentage={-8} icon={FaShoppingBasket} />
    </div>
  )
}

export default DashboardState
