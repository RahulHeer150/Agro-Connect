import axios from "axios";

export const getDashboardStats=async()=>{
    const res= await axios.get(
        "https://agro-connect-8yjz.onrender.com"
    );
    return res.data;
}