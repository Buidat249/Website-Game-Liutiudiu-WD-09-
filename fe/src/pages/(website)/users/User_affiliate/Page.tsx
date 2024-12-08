import React from 'react'
import ReferralPage from './_components/affiliate'
import Sidebar from '../layoutUser'

const PageAffiliate = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-[1048px]">
      <Sidebar />
      <ReferralPage />
    </div>
  )
}

export default PageAffiliate
