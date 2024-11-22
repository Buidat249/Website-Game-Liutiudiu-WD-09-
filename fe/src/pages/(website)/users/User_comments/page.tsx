import React from 'react'
import Comment from './_components/Comment'
import Sidebar from '../layoutUser'

const Mycomment = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-[1048px]">
      <Sidebar />
      <Comment />
    </div>
  )
}

export default Mycomment
