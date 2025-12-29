import React from 'react'
import { FaLeaf, FaMapMarkedAlt, FaBalanceScale  } from 'react-icons/fa'


const ByuerBenefits = () => {
  return (
<section className='bg-green-50 py-20'>
    <div className='max-w-7xl mx-auto px-6 text-center'>
        <h2 className='text-3xl font-bold mb-12'>
            Benefits for Buyers
        </h2>

        <div className='grid md:grid-cols-3 gap-10'>
            <div className='bg-white p-6 rounded-xl shadow-sm'>
                <FaLeaf className='text-green-700 text-4xl mx-auto mb-4'/>
                <h3 className='font-semibold'>Fresh Produce</h3>

            </div>

            <div className='bg-white p-6 rounded-xl shadow-sm'>
                <FaMapMarkedAlt className='text-green-700 text-4xl mx-auto mb-4'/>
                <h3 className='font-semibold'>Local Farmers</h3>

            </div>

            <div className='bg-white p-6 rounded-xl shadow-sm'>
                <FaBalanceScale className='text-green-700 text-4xl mx-auto mb-4'/>
                <h3 className='font-semibold'>Fair Pricing</h3>

            </div>
        </div>
    </div>

</section>
  )
}

export default ByuerBenefits