import React from 'react'

const SidebarItem = ({ title, icon: FaHome, isSelected }) => {
  return (

    <div className={isSelected ? 'bg-[#ffffff] shadow-gray-400/50 shadow  rounded-lg flex flex-row justify-start items-center px-3 py-2 gap-4 w-full h-22 ' : 'flex flex-row justify-start items-center px-3 py-2 gap-4 w-full h-22'}>
      <div className={isSelected ? ' bg-[#17c1e8] flex flex-col justify-center items-center rounded-lg  w-8 h-8  shadow-gray-400/50 shadow' : 'flex flex-col justify-center items-center rounded-lg  w-8 h-8 bg-[#e9ecef] shadow-gray-400/50 shadow '}>
        <div className={isSelected ? 'text-white' : ''}>
          {FaHome && <FaHome />}
        </div>

      </div>
      <div className='text text-lg text-[#67748e] tracking-wide group-active:font-semibold'>{title}</div>
    </div>
  )
}

export default SidebarItem
