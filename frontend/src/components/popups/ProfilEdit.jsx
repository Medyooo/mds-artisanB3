import React, { useState } from 'react'

const ProfilEdit = ({ onClickQuit, onSave, initialInfo }) => {
  const [values, setValues] = useState(initialInfo)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }))
  }

  const handleSaveClick = () => {
    onSave(values)
    onClickQuit()
  }

  return (
    <>
      <div className='fixed flex items-center justify-center z-50 inset-0 bg-black bg-opacity-20 w-full h-full'>
        <div className='flex flex-col justify-center  gap-20 bg-white/[0.5] backdrop-blur-xl shadow-md rounded-xl w-5/12 px-6 h-3/6 text-center '>
          <div className='flex flex-row  justify-around items-center gap-5 pl-28 '>

            <div className='flex flex-col gap-7  items-start '>
              <div className='text font-bold text-[#344767] text-lg'>Prénom : </div>
              <div className='text font-bold text-[#344767] text-lg'>Nom : </div>
              <div className='text font-bold text-[#344767] text-lg'>E-mail : </div>
              <div className='text font-bold text-[#344767] text-lg'>Nom d'utilisateur : </div>

            </div>
            <div className='flex flex-col gap-4 items-start w-1/2'>

              <input className='text-white border-2 border-[#344767] w-2/3 h-10 rounded-full px-5 py-2 bg-[#344767]' name='firstName' value={values.firstName} onChange={handleInputChange} />

              <input className='text-white border-2 border-[#344767] w-2/3 h-10 rounded-full px-5 py-2 bg-[#344767]' name='lastName' value={values.lastName} onChange={handleInputChange} />
              <input className=' text-white border-2 border-[#344767] w-2/3 h-10 rounded-full px-5 py-2 bg-[#344767]' name='email' value={values.email} onChange={handleInputChange} />
              <input className=' text-white border-2 border-[#344767] w-2/3 h-10 rounded-full px-5 py-2 bg-[#344767]' name='username' value={values.username} onChange={handleInputChange} />
            </div>

          </div>
          <div className='flex flex-row justify-center gap-16 '>
            <button onClick={handleSaveClick} className='p-3 rounded-2xl bg-gradient-to-r from-primary to-[#344767] text-white text-xl  hover:shadow-lg'>Sauvegarder</button>
            <button onClick={onClickQuit} className='text-dark px-6 py-1 rounded-2xl border-2 border-primary text-primary text-xl bg-white hover:shadow-lg'>Annuler</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilEdit
