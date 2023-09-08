import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {
    const {Component}=props;
    const navigate=useNavigate();
    useEffect(()=>{
    let data=localStorage.getItem('loggedInUser');
    if(JSON.parse(data)===false)
    {
        navigate('/login');
    }
    },[])
  return (
    <>
       <Component/>
    </>
  )
}

export default Protected