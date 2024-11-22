import React, { useState } from 'react'
import CartBoxLeft from './_components/cart'
import CheckoutBoxRight from './_components/pay'
import { CartProvider } from './_components/cartcontext';

const PageCart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  return (
    <div className='flex flex-col lg:flex-row bg-gray-100 p-6 mx-auto w-[1048px]'>
      <CartProvider>
        <CartBoxLeft setTotalPrice={setTotalPrice} setTotalQuantity={setTotalQuantity} />
        <CheckoutBoxRight totalPrice={totalPrice} totalQuantity={totalQuantity} />
      </CartProvider>
    </div>
  )
}

export default PageCart
