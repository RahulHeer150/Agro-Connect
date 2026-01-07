import React from 'react'
import AddProduct from '../components/AddProduct'
import MyProduct from '../components/MyProduct'
import Orders from '../components/Orders'
import Dashboard from '../components/Dashboard'

const FarmerDashBoard = () => {
  return (
    <div>
      <Dashboard/>
        <AddProduct/>
        <MyProduct/>
        <Orders/>
    </div>
  )
}

export default FarmerDashBoard