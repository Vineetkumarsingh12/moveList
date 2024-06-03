import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assest/logo.gif';
import {useNavigate} from 'react-router-dom';
import { server } from '../api/api';
import toast from 'react-hot-toast';



const Navbar = ({exits,setExist}) => {
  
  const [search, setSearch] = useState("");
  const [user,setUser]=useState(null);
  useEffect(()=>{
setUser(JSON.parse(localStorage.getItem('UPlay')))
  },[]);
  const navigate = useNavigate();

  const handleSearch = (event) => {
   
      event.preventDefault(); 
     
      navigate(`/serach/${search}`);
      console.log('Search:', search);
      setSearch(''); 
  };

  const handLogout = async() => {
const toastId = toast.loading("Logging Out...");
    try{
  
    const response = await fetch(`${server}/api/v1/auth/logout`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      localStorage.removeItem("UPlay");
      console.log("Logout Successfully");
      toast.success("Logout Successfully");
   setExist(null);
      navigate('/login');
    }
}
  catch(error){
    toast.error("Logout Failed");
  }finally{
    setTimeout(() => {
      toast.dismiss(toastId);
    }, 2000);
  }
};

  return (
    <div className="flex bg-violet-600 px-4 items-center py-4 ">
      {/* Logo */}
      <div>
        <Link to="/">
          <img src={logo} alt="logo" className="h-10 rounded" />
        </Link>
      </div>

      {/* Search if logged in */}
      {exits && user && (
        <div className="ml-4">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search"
              className="p-2 rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              
            />
            <input type="submit" value="" onClick={handleSearch} /> 
          </form>
        </div>
      )}

      {/* Login/Signup/Name */}
      <div className="ml-auto flex items-center space-x-4">
        {exits && user ? (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4  bg-purple-900 p-2 rounded-md">
            <img src={user.avatar.url} alt="profile"  className=' h-10 rounded'/>
            <h3 className="text-white">{user.name}</h3>
            </div>
            <button className="text-white" onClick={handLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-white">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
