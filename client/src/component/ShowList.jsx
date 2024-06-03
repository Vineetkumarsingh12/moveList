import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import MovieCard from './MovieCard';
import { server } from '../api/api';

const ShowList = () => {
    const {id}=useParams();
    const [data,setData]=useState([]);
    useEffect(() => {
      async function fetchData() {
        try {
          const ids = await axios.get(`${server}/user/listDetails/${id}`, {
            withCredentials: true,
          });
          console.log("ids", ids);
  
          const fetchMovieData = async (id) => {
            const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apiKey=30ee3e33`);
            return response.data;
          };
  
          const dataPromises = ids.data.data.map(fetchMovieData);
          const moviesData = await Promise.all(dataPromises);
  
          setData(moviesData);
          console.log("data", moviesData);
        } catch (err) {
          console.log(err);
          toast.error(err.response.data.message || 'Failed to fetch list');
        }
      }
  
      setData([]);
      fetchData();
    }, [id]);

  return (
    <div className=' flex gap-5 flex-wrap  justify-center p-5'>
      {
        data.map((movie,index) => (
        
            <MovieCard key={index} movie={movie} />
        
        ))
      }
    </div>
  )
}

export default ShowList
