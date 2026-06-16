import axios from "axios"

export const getAllOrders=async()=>{

    const res= await axios.get(
         `http://localhost:5000/api/admin/orders`
    )
    return res.data;
}