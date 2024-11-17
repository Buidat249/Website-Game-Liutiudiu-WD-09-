import React from 'react'
import Sidebar from './_components/Sidebar'
import Favoritelist from './_components/Favoritelist'

const Wishlist = () => {
  return (
    <div className='flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-max'>
      <Sidebar />
      <Favoritelist />
    </div>
  )
}

export default Wishlist
