import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
   
  return (

    <div className="bg-white rounded-lg overflow-hidden  shadow-indigo-600 shadow-md w-[200px] text-center relative">
      <Link to={`/add/:${movie.imdbID}`} className=' absolute w-[40px] h-[40px] flex justify-center  bg-black text-white rounded-full font-bold  text-[25px] m-1 z-50 '  >
          +
      </Link>
      <Link to={`/video/${movie.imdbID}`}>
      {/* Movie Poster */}
      <img
        className="w-[200px] h-64 object-cover rounded-t-lg hover:scale-105 transition duration-300  "
        src={movie.Poster}
        alt={movie.Title}
      />
      {/* Movie Details */}
      <div className="p-4">
        {/* Movie Title */}
        <h3 className="text-lg font-semibold text-gray-900">{movie.Title}</h3>
        {/* Movie Year */}
        <p className="text-gray-600 text-sm mt-1">Year: {movie.Year}</p>
        {/* Additional Details */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <p className="text-gray-700 font-medium">Type:</p>
          <p className="text-gray-600">{movie.Type}</p>
          <p className="text-gray-700 font-medium">IMDb ID:</p>
          <p className="text-gray-600 truncate">{movie.imdbID}</p>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default MovieCard;
