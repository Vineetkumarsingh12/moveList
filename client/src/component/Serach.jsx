import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import MovieCard from './MovieCard'; 
const Serach = () => {
    const [movies, setMovieData] = useState([]);
// serach prams 
  const {serachKey}=useParams();
    
    useEffect(() => {   
        const fetchMovie = async () => {
          const response = await fetch(
            `https://www.omdbapi.com/?s=${serachKey||"avengers"}&apiKey=30ee3e33`
          );
          const data = await response.json();
          if(data.Response)setMovieData(data.Search);
         else{
          setMovieData([]);
         }
           
        };
        fetchMovie();
      }, [serachKey]);
    return (
        <div className="container flex gap-5 flex-wrap mx-auto p-5 justify-center">
         {
 movies?
 ( movies.map((movie) => (
   <MovieCard key={movie.imdbID} movie={movie} />
 )))  :<p> Not Found</p>
         } 
        </div>
      );
}

export default Serach;
