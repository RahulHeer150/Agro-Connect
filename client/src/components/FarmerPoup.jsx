import React from 'react'

const FarmerPoup = ({ farmer }) => {
  return (
    <div className='text-sm'>
        <h3 className='font-semibold text-lg text-green-700'>
            {farmer.name}
        </h3>
        <p>
            Products: {farmer.products?.length||0} 
        </p>

    </div>
  )
}

export default FarmerPoup;