import axios from 'axios';

export const getAllProducts=async()=>{
    
    const res= await axios.get(
        "http://localhost:5000/api/admin/products"
    )

    return res.data;

}


export const getProductById = async(id)=>{
   const res = await axios.get(
      `http://localhost:5000/api/admin/products/${id}`
   );

   return res.data;
}