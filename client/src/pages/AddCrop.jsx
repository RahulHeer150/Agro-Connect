import React from 'react'
import { useState } from 'react' 
import { motion } from 'framer-motion'

const AddCrop = () => {
  return (
    <div className='min-screen bg-gray-900 flex items-center justify-center px-4 '>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-2xl bg-gray-800 p-8 rounded-2xl shadow-xl mt-20'>
          <h2 className='text-3xl font-bold text-white mb-6 text-center'>
Add Crop
          </h2>
          <form action="" className='space-y-4'>

            <input type="text"
            name='name'
            placeholder='Crop Name'
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            />

             <input type="text"
            name='category'
            placeholder='Crop Category'
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            />

            <div className='grid grid-cols-2 gap-4 '>
              <input type="number"
            name='price'
            placeholder='Price'
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            />

             <input type="number"
            name='qunatity'
            placeholder='Quantity'
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            />

            </div>

            <div className='grid grid-cols-2 gap-4 '>
               <input type="text"
            name='unit'
            placeholder='Unit'
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            />

             <input type="text"
            name='location'
            placeholder='Location'
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            />



            </div>

            <input type="file"
            multiple 
            className='w-full text-gray-300'/>

           <motion.button
           whileTap={{scale:0.95}}
           type='submit'
           className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
           >
            
           </motion.button>
           

             
          </form>

      </motion.div>
    </div>
  )
}

export default AddCrop