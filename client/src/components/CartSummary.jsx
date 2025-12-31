import React from 'react'
import { useCart } from '../context/CartContext'


const CartSummary = () => {
  const {cart}=useCart();

  const totalPrice=cart.reduce(
    (sum,item)=>sum+item.price,0
    )
  return (
    <div className='bg-white p-6 rounded-xl shadow-sm h-fit'>
      
      <h3 className='font-semibold text-lg mb-4'>
        Price Summary

      </h3>
      <div className='flex justify-between text-sm mb-2'>
        <span>
          Total Items
        </span>
        <span>{cart.length}</span>
      </div>

      <div className='flex justfy-between font-semibold text-lg mb-6'>
      <span>Total</span>
      <span>₹{totalPrice}</span>
      </div>

      <button className='w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition'>
Proceed to CheckOut
      </button>

      </div>
  )
}

export default CartSummary;