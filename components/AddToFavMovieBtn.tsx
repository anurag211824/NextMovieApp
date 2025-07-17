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
  const { handleAddFavMovie } = useContext(AppContext);

  return (
    //@ts-nocheck
    <button
      onClick={() => handleAddFavMovie(movie)}
      className="bg-blue-500 px-2 py-1 rounded-md mt-3"
    >
      Favourite +
    </button>
  );
};

export default AddToFavMovieBtn;
