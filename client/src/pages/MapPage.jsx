import React from 'react'
import { useEffect, useState } from 'react'
import useUserLocation from '../hooks/useUserLocation'
import { getNearbyFarmers } from '../services/mapService'
import MapContainer from '../components/MapContainer'
import LocationButton from '../components/LocationButton'
import DistanceFilter from '../components/DistanceFilter'


const MapPage = () => {
  const {location, getLocation}= useUserLocation();
  const [farmers, setFarmers]= useState([]);
  const [distance, setDistance]= useState(10);

  useEffect(()=>{
    if(location){
      fetchFarmers();
    }
  }, [location, distance]);

  const fetchFarmers = async () => {
    try {
      const farmersData = await getNearbyFarmers(location.lat, location.lng, distance);
      setFarmers(farmersData);
    } catch (error) {
      console.error('Error fetching nearby farmers:', error);
    }
  };


  return (
    <div classname='p-6 max-w-6xl mx-auto'>
      <h2 className='text-2xl font-bold text-green-700'>
        Find Farmers Near You

      </h2>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4'>
        <LocationButton onClick={getLocation} />
        <DistanceFilter distance={distance} setDistance={setDistance}/>

      </div>
      <MapContainer location={location} farmers={farmers}/>

    </div>
  )
}

export default MapPage