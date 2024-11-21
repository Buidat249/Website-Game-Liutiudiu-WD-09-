import React from 'react'
import Sidebar from './_components/Sidebar'
import Security from './_components/Security'

const SecuritySettings = () => {
  return (
    <div className='flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-max'>
      <Sidebar />
      <Security />
    </div>
  )
}

export default SecuritySettings
