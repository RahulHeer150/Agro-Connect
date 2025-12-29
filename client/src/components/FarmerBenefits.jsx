import React from 'react'
import { FaRupeeSign, FaMobileAlt, FaHandshake } from 'react-icons/fa'

const FarmerBenefits = () => {
  return (
    <section className='bg-white py-20'>
        <div className='max-w-7xl mx-auto px-6 text-center'>
            <h2 className='text-3xl font-bold m-12'>
Benefits for Farmers
            </h2>
            <div className='grid md:grid-cols-3 gap-10'>
                <div>
                    <FaRupeeSign className='text-green-700 text-4xl mx-auto mb-4'/>
                    <h3 className='font-semibold mb-2'>Better Income</h3>
                    <p className='text-gray-600 text-sm'></p>
                </div>
            </div>



        </div>

    </section>
  )
}

export default FarmerBenefits