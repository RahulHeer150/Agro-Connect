import React from 'react'
import AddProduct from '../components/AddProduct'
import MyProduct from '../components/MyProduct'
import Order from '../components/Order'
import Dashboard from '../components/Dashboard'

const FarmerDashBoard = () => {
  return (
    <div>
      <Dashboard/>
        <AddProduct/>
        <MyProduct/>
        <Order/>
    </div>
  )
}

export default FarmerDashBoard