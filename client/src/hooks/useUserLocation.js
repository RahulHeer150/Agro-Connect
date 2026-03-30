import React from 'react'
import { useState } from 'react'

const useUserLocation=()=>{
    const[location,setLocation]=useState(null);
    const[error,setError]=useState(null);

    const getLocation=()=>{
        if(!navigator.geolocation){
            setError("Geolocation not supported");
            return;
        }
    }
}