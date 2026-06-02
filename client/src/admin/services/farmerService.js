import axios from 'axios';

export const getAllFarmers= async()=>{
    const res= await axios.get(
    "http://localhost:5000/api/admin/farmers"
    );

    return res.data;
}