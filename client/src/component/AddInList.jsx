import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import List from './List';
import { server } from '../api/api';

const AddInList = () => {
  const [listName, setListName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [meList, setMeList] = useState([]);
  const {id:url}=useParams();


  const fetchList = async () => {
    try {
      const res = await axios.get(`${server}/user/showAllPersonalList`, {
        withCredentials: true,
      });
      console.log(res.data);
      setMeList(res.data.data);
    } catch (error) {
      console.error(error);
        toast.error(error.response.data.message || 'Failed to fetch list');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${server}/user/createList`,
        {
          listName,
          isPrivate,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
         setIsPrivate(false);
        setListName('');
        toast.success(res.data.message);
        fetchList();
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || 'Failed to create list');
    }
    console.log({ listName, isPrivate });
  };

  useEffect(() => {
    fetchList();
  }, []);
const handleClick = async (e,id) => {
    e.preventDefault();
    try{
        const res=await axios.post(`${server}/user/addItem/${id}`,
        {
  url: url,
        },{
            withCredentials:true,
        });
    toast.success(res.data.message);
    fetchList();

    } catch (error) {
        console.error(error);
        toast.error(error.response.data.message || 'Failed to fetch list');
    }

    console.log(id);
};
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Create a list */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-xs mb-8">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter list name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="private"
            name="private"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            className="mr-2 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="private" className="text-gray-700">Private</label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Create List
        </button>
      </form>

      {/* Show all lists */}
      <div className="w-full max-w-xs">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">My Lists</h2>
        <ul >
          {meList.map((list) => (
   <List key={list._id} list={list} handleClick={handleClick} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddInList;
