import axios from "axios";

export const getBuyerById= async(id)=>{
   const res= await axios.get(
    `http://localhost:5000/api/admin/buyers/${id}`
   )

   return res.data;
}

export const toggleBuyerStatus= async(id)=>{
   const res= await axios.put(
    `http://localhost:5000/api/admin/buyers/${id}/toggle-status`
   )

   return res.data;
}

export const getBuyers= async(id)=>{
   const res= await axios.get(
    `http://localhost:5000/api/admin/buyers`
   )

   return res.data;
}

export const deleteBuyer= async(id)=>{
   const res= await axios.delete(
    `http://localhost:5000/api/admin/farmers/${id}`
   )

   return res.data;
}

