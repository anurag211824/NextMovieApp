/* eslint-disable @next/next/no-img-element */
"use client";
import AddToFavMovieBtn from "@/components/AddToFavMovieBtn";
import { AppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Link from "next/link";
interface Movie {
  Title: string;
  Year: string;
  Genre: string;
  Director: string;
  Actors: string;
  Language: string;
  Runtime: string;
  Poster: string;
  Plot: string;
  imdbRating: string;
  Response: string;
}

interface PageProps {
  params: { movieID: string };
}

const MovieDetailPage = ({ params }: PageProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { theme } = useContext(AppContext);
  const { movieID } = params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=5ea7ba01&i=${movieID}`
        );
        const data: Movie = await response.json();

        if (data.Response === "False") {
          setError("Movie not found.");
        } else {
          setMovie(data);
        }
      } catch (err) {
        console.log(err);

        setError("Failed to fetch movie data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieID]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-start justify-center text-lg">
        Loading movie details...
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        {error || "Movie not found."}
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-8 flex flex-col lg:flex-row items-center lg:items-start gap-8 ${
        theme === "dark" ? "bg-black" : "bg-white-100"
      }`}
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.jpg"}
        alt={movie.Title}
        className="w-full max-w-sm rounded shadow-md"
      />
      <div className="flex-1 space-y-4">
        <h1
          className={`text-3xl font-bold ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {movie.Title}
        </h1>
        <p
          className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
        >
          {movie.Plot}
        </p>
        <ul
          className={`${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          } space-y-1`}
        >
          <li>
            <strong>Year:</strong> {movie.Year}
          </li>
          <li>
            <strong>Genre:</strong> {movie.Genre}
          </li>
          <li>
            <strong>Director:</strong> {movie.Director}
          </li>
          <li>
            <strong>Actors:</strong> {movie.Actors}
          </li>
          <li>
            <strong>Language:</strong> {movie.Language}
          </li>
          <li>
            <strong>Runtime:</strong> {movie.Runtime}
          </li>
          <li>
            <strong>IMDb Rating:</strong> {movie.imdbRating}
          </li>
        </ul>
     <Link href={`/favmovie`}><AddToFavMovieBtn movie={movie}/></Link>
      </div>
    </div>
  );
};

export default MovieDetailPage;
