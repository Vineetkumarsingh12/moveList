import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/login";
import Navbar from "./component/Navbar";
import Uvideo from "./component/Uvideo";
import Serach from "./component/Serach";

import Protected from "./utils/Protected";
import PublicRoute from "./utils/PublicRoute";

import {  useEffect, useState } from "react";
import AddInList from "./component/AddInList";
import AllList from "./component/AllList";
import ShowList from "./component/ShowList";

function App() {
  const [exits, setExist] = useState(false);
  useEffect(() => {
    if (!exits) {
      setExist(JSON.parse(localStorage.getItem("UPlay")));
    }
  }, []); 


  console.log("in app", exits);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar exits={exits} setExist={setExist} />
      <Link
        to="/list"
        className="rounded-full aspect-[1] absolute top-40 right-1 p-5 animate-bounce bg-purple-600 font-bold text-white flex items-center z-50"
      >
        PlayLists
      </Link>
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Protected Component={Serach} exits={exits} />} />
          <Route path="/login" element={<PublicRoute Component={Login} setExist={setExist}  exits={exits}/>} />
          <Route path="/video/:id" element={<Protected Component={Uvideo} exits={exits} />} />
          <Route path="/serach/:serachKey" element={<Protected Component={Serach} exits={exits} />} />
          <Route path="/add/:id" element={<Protected Component={AddInList}  exits={exits}/>} />
          <Route path="/list" element={<Protected Component={AllList}  exits={exits}/>} />
          <Route path="/list/:id" element={<Protected Component={ShowList}  exits={exits}/>} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </div>
      <footer className="bg-gray-800 text-white text-center p-4  w-full  animate-pulse">
        Made with ❤️ by <Link to="https://www.linkedin.com/in/vineet-singh-272614243/" className=" text-purple-400 "> Vineet</Link>
      </footer>
    </div>
  );
}

export default App;
