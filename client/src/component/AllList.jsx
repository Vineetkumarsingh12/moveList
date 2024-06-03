import React, { useEffect, useState } from 'react';
import List from './List';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { server } from '../api/api';

const AllList = () => {
  const [myList, setMyList] = useState(true);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (myList) {
          const data = await axios.get(`${server}/user/showAllPersonalList`, {
            withCredentials: true,
          });
          setListData(data.data.data);
        } else {
          const data = await axios.get(`${server}/user/showAllList`, {
            withCredentials: true,
          });
          setListData(data.data.data);
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message || 'Failed to fetch list');
      }
    }
    fetchData();
  }, [myList]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center border-b-2 mb-4">
        <button
          onClick={() => setMyList(true)}
          className={`py-2 px-4 ${myList ? 'border-b-2 border-blue-500' : ''}`}
        >
          My List
        </button>
        <div className=' w-[3px] h-6 mt-4 bg-gray-400'></div>
        <button
          onClick={() => setMyList(false)}
          className={`py-2 px-4 ${!myList ? 'border-b-2  border-blue-500' : '' } `}
        >
          All List
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {listData.map((list) => (
          <Link to={`/list/${list._id}`} key={list._id}>
            <List key={list._id} list={list} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllList;
