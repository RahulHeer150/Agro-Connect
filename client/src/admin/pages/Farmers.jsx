import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getAllFarmers } from '../services/farmerService'
import Loader from '../../components/Loader';

const Farmers = () => {
  const[farmers,setFarmers]=useState([]);
  const[loading,setLoading]=useState(true);
  const [searchTerm,setSearchterm]=useState("");

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

  const filteredFarmers=farmers.filter((farmer)=>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase())||
    farmer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if(loading){
    return <Loader size='large'/>
  }
  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>
        Farmer Management

      </h1>

      <div className='mb-6'>
        <input type="text"
        placeholder='Search farmer by name or email'
        value={searchTerm}
        onChange={(e)=>setSearchterm(e.target.value)}
        className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
         />
      </div>

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
            {filteredFarmers.map((farmer)=>(
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