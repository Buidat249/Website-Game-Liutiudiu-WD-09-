import React from 'react'
import Favoritelist from './_components/Favoritelist'
import Sidebar from '../layoutUser'

const Wishlist = () => {
  return (
     <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-[1048px]">
      <Sidebar />
      <Favoritelist />
    </div>
  )
}

export default Wishlist
