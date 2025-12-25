import React from 'react'
import AddProduct from '../components/AddProduct'
import MyProduct from '../components/MyProduct'
import Order from '../components/Order'

const FarmerDashBoard = () => {
  return (
    <div>
        <AddProduct/>
        <MyProduct/>
        <Order/>
    </div>
  )
}

export default FarmerDashBoard