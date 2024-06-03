import React from 'react';

const Card = ({ movie }) => {
  return (
    <div className="movie-card bg-white shadow-md rounded-xl overflow-hidden ">
      <div className=" flex justify-center">
        <img
          className="object-cover "
          src={movie.Poster}
          alt={movie.Title}
        />
      </div>
      <div className="movie-card-content p-4">
        <div className="movie-card-title">
          <h3 className="text-lg font-semibold text-indigo-600 uppercase tracking-wide">
            {movie.Title}
          </h3>
        </div>
        <div className="movie-card-details">
          <p className="text-gray-700">{movie.Plot}</p>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <p className="text-sm text-gray-500">
              <span className="font-medium text-indigo-600">Director:</span> {movie.Director}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-indigo-600">Actors:</span> {movie.Actors}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-indigo-600">Genre:</span> {movie.Genre}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-indigo-600">Runtime:</span> {movie.Runtime}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-indigo-600">Language:</span> {movie.Language}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-indigo-600">Country:</span> {movie.Country}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <p className="text-sm text-gray-500">
              <span className="font-medium text-indigo-600">IMDb Rating:</span> {movie.imdbRating}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-indigo-600">Metascore:</span> {movie.Metascore}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-indigo-600">Awards:</span> {movie.Awards}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-indigo-600">Box Office:</span> {movie.BoxOffice}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-indigo-600">DVD Release:</span> {movie.DVD}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-indigo-600">Production:</span> {movie.Production}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
