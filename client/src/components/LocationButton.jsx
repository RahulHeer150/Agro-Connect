import React from 'react'

const LocationButton = ({onClick}) => {
  return (
    <button onClick={onClick}>
      Use My Current Location
    </button>
  )
}

export default LocationButton