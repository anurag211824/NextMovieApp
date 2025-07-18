/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import Link from "next/link";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const movieTitles = [
  "Batman",
  "Avengers",
  "Inception",
  "Titanic",
  "Matrix",
  "Spiderman",
  "Interstellar",
  "The Dark Knight",
  "Iron Man",
  "The Godfather",
  "Jurassic Park",
  "Forrest Gump",
  "Gladiator",
  "The Shawshank Redemption",
  "Pulp Fiction",
  "The Lion King",
  "Harry Potter",
  "Avatar",
  "The Lord of the Rings",
  "Frozen",
  "Black Panther",
  "Doctor Strange",
  "The Social Network",
  "Deadpool",
  "The Prestige",
  "Fight Club",
  "Django Unchained",
  "The Wolf of Wall Street",
  "The Revenant",
  "La La Land",
];

export default async function Home() {
  const randomTitle =
    movieTitles[Math.floor(Math.random() * movieTitles.length)];

  // Fetch movies from OMDb API
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=5ea7ba01&s=${randomTitle}`
  );
  const data = await response.json();
  const movies = data.Search || [];


  return (
    <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-hidden min-h-screen bg-white dark:bg-black">
      {movies.length > 0 ? (
        //@ts-expect-error
        movies.map((movie, index) => (
          <Link href={`/movie/${movie.imdbID}`} key={index}>
            <Card className="border-gray-300 dark:border-gray-600 border-2 h-[350px] hover:shadow-lg dark:hover:shadow-gray-800 transition-shadow duration-300 cursor-pointer group overflow-hidden p-0">
              <div className="relative overflow-hidden">
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full h-[300px] object-fill group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                  {movie.Type?.toUpperCase()}
                </Badge>
              </div>
              <CardContent className="p-3">
                <h2 className="text-xl font-semibold line-clamp-2 mb-1">
                  {movie.Title.slice(0,55)}
                </h2>
              </CardContent>
              <CardFooter className="p-3 pt-1">
                <Badge variant="secondary" className="text-xs">{movie.Year}</Badge>
              </CardFooter>
            </Card>
          </Link>
        ))
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
}


