import React from 'react'
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';
import Loader from './Loader';
import FarmerMarker from './FarmerMarker';


const MapContainer = ({location,farmers}) => {

  if(!location){
    return   <p className='text-center mt-10'> <Loader/>Loading map...</p>
  }
  return (
    <div className='w-full h-[500px] rounded-xl overflow-hidden shadow-lg mt-5'>
      <LeafletMap
      center={[location.lat,location.lng]}
      zoom={13}
      className='w-full h-full'
      >
        <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />

      {farmers.map((farmer)=>(
        <FarmerMarker key={farmer._id} farmer={farmer}/>
      ))}
      </LeafletMap>

    </div>
  )
}

export default MapContainer