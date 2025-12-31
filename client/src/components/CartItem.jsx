import React from 'react'

const CartItem = ({item}) => {
  return (
    <div className='bg-white p-5 rounded-xl shadow-sm flex justify-between items-center'>
      <div>
        <h3 className='font-semibold text-lg'>
          {item.name}
        </h3>
        <p className='text-sm text-gray-600'>
          Farmer:{item.farmer}
        </p>

      </div>
      <p className='font-semibold text-gray-700'>
{item.price}
      </p>
    </div>
   
  )
}

export default CartItem