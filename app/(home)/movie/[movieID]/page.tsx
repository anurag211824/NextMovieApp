/* eslint-disable @next/next/no-img-element */

import React from 'react';
interface PageProps {
  params: { movieID: string };
}

const MovieDetailPage = async ({ params }: PageProps) => {
  const { movieID } = params;

  const response = await fetch(`https://www.omdbapi.com/?apikey=5ea7ba01&i=${movieID}`);
  const movie = await response.json();

  if (movie.Response === "False") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        Movie not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col lg:flex-row items-center lg:items-start gap-8">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.jpg"}
        alt={movie.Title}
        className="w-full max-w-sm rounded shadow-md"
      />
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold">{movie.Title}</h1>
        <p className="text-gray-700">{movie.Plot}</p>
        <ul className="text-gray-600 space-y-1">
          <li><strong>Year:</strong> {movie.Year}</li>
          <li><strong>Genre:</strong> {movie.Genre}</li>
          <li><strong>Director:</strong> {movie.Director}</li>
          <li><strong>Actors:</strong> {movie.Actors}</li>
          <li><strong>Language:</strong> {movie.Language}</li>
          <li><strong>Runtime:</strong> {movie.Runtime}</li>
          <li><strong>IMDb Rating:</strong> {movie.imdbRating}</li>
        </ul>
      </div>
    </div>
  );
};

export default MovieDetailPage;
