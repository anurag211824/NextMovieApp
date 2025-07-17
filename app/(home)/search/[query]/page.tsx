/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
//@ts-nocheck

import React from "react";
import Link from "next/link";
import AddToFavMovieBtn from "@/components/AddToFavMovieBtn";
type PageProps = {
  searchParams?: { movie?: string };
};

const MovieSearchPage = async ({ searchParams }: PageProps) => {
  const movie = searchParams?.movie || "batman"; 
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=5ea7ba01&s=${movie}`
  );
  const data = await response.json();
  console.log(data.Search);


  const movies = data.Search || [];
  if (movies.length === 0) {
    return <p>No availabel movies</p>;
  }
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie, index: number) => (
        <Link href={`/movie/${movie.imdbID}`} key={index}>
        <div
          key={index}
          className="bg-white h-auto  shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105"
        >
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.jpg"}
            alt={movie.Title}
            className="w-full h-72 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold text-red-500">
              {movie.Title}
            </h2>
            <p className="text-sm text-gray-600">Year: {movie.Year}</p>
            <p className="text-sm text-gray-600">Type: {movie.Type}</p>
            <Link href={`/favmovie`}>
              {" "}
             <AddToFavMovieBtn movie= {movie}/>
            </Link>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default MovieSearchPage;
