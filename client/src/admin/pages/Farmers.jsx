import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getAllFarmers } from '../services/farmerService'
import Loader from '../../components/Loader';

const Farmers = () => {
  const[farmers,setFarmers]=useState([]);
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    fetchFarmers();

  },[]);

  const fetchFarmers=async()=>{
    try {
      const data= await getAllFarmers();

      setFarmers(data.farmers);
      
    } catch (error) {
      console.error(error);
      
    }finally{
      setLoading(false);
    }

  };

  if(loading){
    return <Loader size='large'/>
  }
  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>
        Farmer Management

      </h1>

      <div className='bg-white rounded-xl shadow overflow-hidden'>
        <table className='w-full'>
          <thead className='bg-green-700 text-white'>
            <tr>
              <th className='p-4 text-left'>
                Name

              </th>
              <th className='p-4 text-left'>
                Email

              </th>
              <th className='p-4 text-left'>
                Phone

              </th>
              <th className='p-4 text-left'>
                Farm

              </th>
              <th className='p-4 text-left'>
                Status

              </th>
            </tr>

          </thead>
          <tbody>
            {farmers.map((farmer)=>(
              <tr 
              key={farmer._id}
              className='border-b hover:bg-gray-50'>
                <td className='p-4'>
                  {farmer.name}
                </td>

                <td className='p-4'>
                  {farmer.email}
                </td>

                <td className='p-4'>
                  {farmer.phone}
                </td>

                <td className='p-4'>
                  {farmer.farmDetails?.farmName || 
                  "N/A"}
                </td>

                <td className='p-4'>
                  <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    farmer.isBlocked
                    ? "bg-red-100 text-red-700"
                    :"bg-green-100 text-green-700"
                  }`}
                  >
                    {farmer.isBlocked
                    ? "Blocked"
                    : "Active"
                  }

                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Farmers