
import React, { useEffect, useState } from 'react'
import Card from './Card'
import { useParams } from 'react-router-dom';

const  Uvideo= () => {
    const [movieData, setMovieData] = useState([]);
    const { id } = useParams();

    useEffect(() => {   
        const fetchMovie = async () => {
          const response = await fetch(
            `https://www.omdbapi.com/?i=${id}&apiKey=30ee3e33`
          );
          const data = await response.json();

          if(data.Response){
            setMovieData(data);
            console.log("eer",data);
          }
          
        
        };
        fetchMovie();
      }, [id]);
    return (
        <div className="container mx-auto px-4">
          {

      movieData?(
      <><h1 className="text-2xl font-bold mt-8 mb-4">Movie Details</h1>
<Card movie={movieData} />
</>):
<p>
  Not Found
</p>
          }
       
        </div>
      );
}


export default Uvideo





