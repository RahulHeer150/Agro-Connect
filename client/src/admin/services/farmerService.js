import axios from 'axios';

export const getAllFarmers= async()=>{
    const res= await axios.get(

    );

    return res.data;
}