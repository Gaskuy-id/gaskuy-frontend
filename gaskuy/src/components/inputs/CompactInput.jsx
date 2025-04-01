import React, { useState } from 'react'

const CompactInput = ({value, onChange, placeholder, label}) => {

  return (
    <div className='flex flex-col mx-4 my-2 px-3 py-1 rounded-md border-solid border-2 border-gray-300 bg-gray-100 gap-0'>
        <label className='text-sm text-gray-500'>{label}</label>
        <div>
            <input
                type='text'   
                placeholder={placeholder}
                className='w-full outline-none text-sm'
                value={value}
                onChange={(e) => onChange(e)} 
            />
        </div>
    </div>
  )
}

export default CompactInput

