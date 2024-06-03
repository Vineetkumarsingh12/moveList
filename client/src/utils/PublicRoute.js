import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const PublicRoute = ({Component,setExist,exits}) => {
  console.log("UPlay",exits);
    const navigate=useNavigate();
  useEffect(() => {
    if(exits){
        navigate("/"); 
        return;
    }
}, [exits]);
  return <Component  setExist={setExist}/>
}

export default PublicRoute;
