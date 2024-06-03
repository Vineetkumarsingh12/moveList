import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Protected = ({Component,exits}) => {
    const navigate=useNavigate();
    useEffect(() => {
        if(!exits){
            navigate("/login");
            return;
        }
    }, [exits]);
    
    return  exits?<Component/>:null;
}

export default Protected
