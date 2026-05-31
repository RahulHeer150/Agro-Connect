import React from 'react'
import {Navigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import Loader from '../components/Loader'

const AdminProtectedRoute = () => {
    const {use,isLoggedIn,loading}  = useAuth();

    if(loading){
        return <Loader size='large'/>
    }

    if(!isLoggedIn){
        return <Navigate to='/login' replace/>
    }

    if(user?.role !== 'admin'){
        return <Navigate to='/' replace/>
    }

    return children;


  
}

export default AdminProtectedRoute;