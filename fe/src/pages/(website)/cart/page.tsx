import React from 'react'
import CartBoxLeft from './_components/cart'
import CheckoutBoxRight from './_components/pay'

const PageCart = () => {
  return (
    <div className='flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-4/5'>
      <CartBoxLeft />
      <CheckoutBoxRight />
    </div>
  )
}

export default PageCart
