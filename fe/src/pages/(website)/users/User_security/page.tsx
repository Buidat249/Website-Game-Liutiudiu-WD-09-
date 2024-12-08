import React from 'react'
import Security from './_components/Security'
import Sidebar from '../layoutUser'

const SecuritySettings = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-[1048px]">
      <Sidebar />
      <Security />
    </div>
  )
}

export default SecuritySettings
