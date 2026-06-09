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

export const deleteProduct=async(id)=>{
    const res= await axios.delete(
         `http://localhost:5000/api/admin/products/${id}`
    )

    return res.data;

}

export const updateProductApproval=async(id,status)=>{
    const res= await axios.put(
      `http://localhost:5000/api/admin/products/${id}/approval`,{
        status,
      }   
    );

    return res.data;
}