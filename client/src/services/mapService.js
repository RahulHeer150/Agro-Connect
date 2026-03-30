import axios from "axios";

export const getNearbyFarmers= async (lat, lng, distance)=>{
    const res= await axios.get(
`/api/map/nearby?lat=${lat}&lng=${lng}&distance=${distance}`
    );
    return res.data;

}