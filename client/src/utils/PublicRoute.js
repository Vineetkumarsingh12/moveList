import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const PublicRoute = ({Component,setExist}) => {
  const exits=Cookies.get('UPlay');
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
