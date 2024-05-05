import React from 'react'

const Confirm = ({ onClickQuit, onClickDelete, message }) => {
  return (
    <>
      <div className='fixed flex items-center justify-center z-50 inset-0 bg-black bg-opacity-20 w-full h-full'>
        <div className='flex flex-col justify-center items-center  gap-20 bg-white/[0.5] backdrop-blur-xl shadow-md rounded-xl w-3/12 px-6 h-2/6 text-center '>
          <div className='flex flex-row  justify-around items-center gap-5  '>

            <p className='text text-lg'>{message}</p>
          </div>
          <div className='flex flex-row justify-center gap-16 '>
            <button onClick={onClickDelete} className='p-3 rounded-2xl bg-gradient-to-r from-primary to-[#344767] text-white text-xl  hover:shadow-lg'>Supprimer</button>
            <button onClick={onClickQuit} className='text-dark px-6 py-1 rounded-2xl border-2 border-primary text-primary text-xl bg-white hover:shadow-lg'>Annuler</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Confirm
