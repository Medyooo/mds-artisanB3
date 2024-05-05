const DashboardHeaderItem = ({ title, number, percentage, isPrice, icon: FaCircleDollarToSlot }) => {
  return (
    <div className=' h-20 flex flex-row justify-between items-center w-full bg-white shadow-lg p-4 rounded-2xl'>
      <div className='flex flex-col gap-1'>
        <div className='text text-greyPrimary font-bold'>{title} </div>
        <div className='flex flex-row items-center gap-2'>
          <div className='text text-darkBlue text-2xl font-bold'>{number}{isPrice ? '€' : ''}</div>
          <div className={percentage > 0 ? 'text text-md font-bold text-[#82d616]' : 'text text-md font-bold text-[#ea0606]'}>{percentage < 0 ? '' : '+'}{percentage}% </div>
        </div>
      </div>
      <div className='flex justify-center items-center w-12 h-12 bg-gradient-to-r from-cyan-200 to-cyan-500 rounded-xl'> {FaCircleDollarToSlot && <FaCircleDollarToSlot color='white' size={24} />} </div>
    </div>
  )
}

export default DashboardHeaderItem
