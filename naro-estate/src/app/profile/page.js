'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const page = () => {

  const [profileData,setProfileData]=useState({});
  const [loading,setLoading]=useState(false);

 

  const getProfileData=async (token) => {
    try {

      setLoading(true);

      const response= await axios.get('/api/user/profile',{
        headers:{
          'Authorization': `Bearer ${token}`, 
          'Content-Type':'application/json'
        }
      })

      console.log(response.data);
      setProfileData(response.data?.user);
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    const token=localStorage.getItem('authToken');
    console.log(token)
    getProfileData(token);
  },[])

  return (
    <div>
      This is profile page
    </div>
  )
}

export default page
