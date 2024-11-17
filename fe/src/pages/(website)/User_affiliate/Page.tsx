import React from 'react'
import Sidebar from './_components/Sidebar'
import ReferralPage from './_components/affiliate'

const PageAffiliate = () => {
  return (
    <div className='flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-max'>
      <Sidebar />
      <ReferralPage />
    </div>
  )
}

export default PageAffiliate
