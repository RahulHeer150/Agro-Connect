import { Package, ShoppingCart, Tractor, Users } from 'lucide-react'
import React from 'react'
import StatCard from '../components/dashboard/StatCard'

const Dashboard = () => {

  const stats=[
    {
      title:"Total Farmers",
      value:0,
      icon:Tractor,
      color:"bg-green-600"
    },
    {
      title:"Total Buyers",
      value:0,
      icon:Users,
      color:"bg-green-600"
    },
    {
      title:"Total Products",
      value:0,
      icon:Package,
      color:"bg-green-600"
    },
    {
      title:"Total Orders",
      value:0,
      icon:ShoppingCart,
      color:"bg-green-600"
    },
  ]
  return (
    <div>
      <h1 className='text-3xl font-bold mb-8'>
        DashBoard Overview
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
        {stats.map((item)=>(
          <StatCard key={item.title}
          {...item}
          />
        ))}

      </div>

      
    </div>
  )
}

export default Dashboard