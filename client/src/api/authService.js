import api from './axios';


export const forgotPassword=async(email)=>{

    const res= await api.post(
        "/api/auth/forgot-password",
        {email}

    )

    return res.data;
}

export const resetPassword=async(token,newPassword)=>{
    const res= await api.post(
        `/api/auth/reset-password/${token}`,
        {newPassword}

    )

    return res.data;
}