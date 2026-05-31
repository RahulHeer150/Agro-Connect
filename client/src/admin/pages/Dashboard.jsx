import { Package, ShoppingCart, Tractor, Users } from 'lucide-react'
import React from 'react'
import StatCard from '../components/dashboard/StatCard'
import { useState } from 'react'
import { useEffect } from 'react'
import { getDashboardStats } from '../services/AdminService'

const Dashboard = () => {
  const[stats, setStats]=useState({
    farmers:0,
    buyers:0,
    products:0,
    orders:0,
  })

  useEffect(()=>{
    fetchStats();
  },[]);

  const fetchStats=async()=>{
    try {
      const data= await getDashboardStats();
      setStats(data);
      
    } catch (error) {

      console.error(error.message);
      
    }
  }

  const data=[
    {
      title:"Total Farmers",
      value:stats.farmers,
      icon:Tractor,
      color:"bg-green-600"
    },
    {
      title:"Total Buyers",
      value:stats.buyers,
      icon:Users,
      color:"bg-green-600"
    },
    {
      title:"Total Products",
      value:stats.products,
      icon:Package,
      color:"bg-green-600"
    },
    {
      title:"Total Orders",
      value:stats.orders,
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
        {data.map((item)=>(
          <StatCard key={item.title}
          {...item}
          />
        ))}

      </div>

      
    </div>
  )
}

export default Dashboard