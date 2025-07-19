/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useContext } from 'react';
import Link from "next/link";
import { AppContext } from "@/context/AppContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Film, Calendar } from "lucide-react";
import AddToFavMovieBtn from '@/components/AddToFavMovieBtn';

const genres = [
  { name: "Action", query: "action" },
  { name: "Comedy", query: "comedy" },
  { name: "Drama", query: "drama" },
  { name: "Horror", query: "horror" },
  { name: "Romance", query: "romance" },
  { name: "Thriller", query: "thriller" },
  { name: "Sci-Fi", query: "science fiction" },
  { name: "Adventure", query: "adventure" },
  { name: "Animation", query: "animation" },
  { name: "Crime", query: "crime" },
];
export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}
const GenrePage = () => {
  const appContext = useContext(AppContext);
  const theme = appContext?.theme || "light";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(genres[0]);

  const fetchMoviesByGenre = async (genreQuery: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=5ea7ba01&s=${genreQuery}&type=movie`
      );
      const data = await response.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesByGenre(selectedGenre.query);
  }, [selectedGenre]);

  const handleGenreClick = (genre: typeof genres[0]) => {
    setSelectedGenre(genre);
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${theme === "dark" ? "bg-black" : "bg-white"} p-4`}>
        <div className="mb-6">
          <h1 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Movie Genres
          </h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {genres.map((genre) => (
              <Button
                key={genre.name}
                variant={selectedGenre.name === genre.name ? "default" : "outline"}
                size="sm"
                disabled
              >
                {genre.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <Card key={index} className="overflow-hidden p-0">
              <Skeleton className="w-full h-[200px]" />
              <div className="p-2">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-black" : "bg-white"} p-4`}>
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {genres.map((genre) => (
            <Button
              key={genre.name}
              variant={selectedGenre.name === genre.name ? "default" : "outline"}
              size="sm"
              onClick={() => handleGenreClick(genre)}
              className="transition-all duration-200"
            >
              {genre.name}
            </Button>
          ))}
        </div>
      </div>

      {movies.length === 0 ? (
        <div className="flex items-center justify-center h-[400px]">
          <div className="text-center">
            <Film className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h2 className={`text-xl font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              No movies found
            </h2>
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Try selecting a different genre
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie: Movie, index: number) => (
            <Link href={`/movie/${movie.imdbID}`} key={index}>
              <Card className="group h-[300px] hover:shadow-xl dark:hover:shadow-gray-800 transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden border-2 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.jpg"}
                    alt={movie.Title}
                    className="w-full h-[200px] object-fill group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Badge className="absolute top-2 right-2 bg-blue-600 text-white shadow-lg text-xs">
                    {selectedGenre.name}
                  </Badge>
                </div>

                <CardContent className="p-2">
                  <h2 className={`text-sm font-bold mb-1 line-clamp-2 ${theme === "dark" ? "text-white" : "text-gray-900"} group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors`}>
                    {movie.Title}
                  </h2>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-gray-500" />
                      <span className={`text-xs ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                        {movie.Year}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Film className="h-3 w-3 text-gray-500" />
                      <span className={`text-xs ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                        {movie.Type}
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-2 pt-0 mt-auto">
                  <div className="w-full" onClick={(e) => e.preventDefault()}>
                    <AddToFavMovieBtn movie={movie} />
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};



export default GenrePage;
