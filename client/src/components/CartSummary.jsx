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
      CartSummary</div>
  )
}

export default CartSummary