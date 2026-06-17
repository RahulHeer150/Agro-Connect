import axios from "axios"

export const getAllOrders=async()=>{

    const res= await axios.get(
         `http://localhost:5000/api/admin/orders`
    )
    return res.data;
}

export const getOrderById=async(id)=>{
    const res= await axios.get(
            `http://localhost:5000/api/admin/orders/${id}`

    )

    return res.data;
}