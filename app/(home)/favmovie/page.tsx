/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";
import React from "react";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
const FavMoviePage = () => {
  const { favMovie, removeFavMovie } = useContext(AppContext);
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
      {favMovie.map((movie, index) => (
        <div
          key={index}
          className="bg-white w-[300px] h-[60vh] shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 duration-300 flex flex-col"
        >
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.jpg"}
            alt={movie.Title}
            className="w-full h-72 object-cover"
          />
          <div className="p-4 flex flex-col justify-between flex-grow">
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-1">
                {movie.Title}
              </h2>
              <p className="text-sm text-gray-600">Year: {movie.Year}</p>
              <p className="text-sm text-gray-600 mb-3">Type: {movie.Type}</p>
            </div>
            <button
              onClick={() => removeFavMovie(movie.imdbID)}
              className="mt-auto bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavMoviePage;
