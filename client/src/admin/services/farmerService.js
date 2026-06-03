import axios from 'axios';

export const getAllFarmers= async()=>{
    const res= await axios.get(
    "http://localhost:5000/api/admin/farmers"
    );

    return res.data;
}

export const getFarmerById=async(id)=>{
    const res= await axios.get(
          `http://localhost:5000/api/admin/farmers/${id}`
    )
    return res.data;

}

export const toggleFarmerStatus= async(id)=>{
    const res= await axios.put(
    `http://localhost:5000/api/admin/farmers/${id}/toggle-status`    
    )

    return res.data;
}

export const deleteFarmer=async(id)=>{
    const res= await axios.delete(
        `http://localhost:5000/api/admin/farmers/${id}`
    )
    return res.data;
}