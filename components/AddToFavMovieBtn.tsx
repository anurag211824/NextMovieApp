"use client";
import { AppContext } from "@/context/AppContext";
import React from "react";
import { useContext } from "react";

//@ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const AddToFavMovieBtn = ({ movie }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { handleAddFavMovie, theme } = useContext(AppContext);

  return (
    //@ts-nocheck
    <button
      onClick={() => handleAddFavMovie(movie)}
      className={`px-4 py-1 rounded-md mt-3 ${
        theme === "dark"
          ? "bg-blue-700 text-white hover:bg-blue-600"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
    >
      WatchList +
    </button>
  );
};

export default AddToFavMovieBtn;
