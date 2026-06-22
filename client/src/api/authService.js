import api from './axios';
import axios from 'axios';


export const forgotPassword=async(email)=>{

      const res= await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {email}

    )

    return res.data;
}

export const resetPassword=async(token,newPassword)=>{
     const res= await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {newPassword}

    )

    return res.data;
}