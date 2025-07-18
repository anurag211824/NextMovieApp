/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";
import React from "react";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Film, Trash2 } from "lucide-react";
import Link from "next/link";

const FavMoviePage = () => {
  const { favMovie, removeFavMovie, theme } = useContext(AppContext);

  if (favMovie.length === 0) {
    return (
      <div
        className={`min-h-[60vh] flex flex-col items-center justify-center p-8 ${
          theme === "dark" ? "bg-black" : "bg-white"
        }`}
      >
        <div className="text-center">
          <div
            className={`w-24 h-24 mx-auto mb-6 ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            } rounded-full flex items-center justify-center`}
          >
            <svg
              className={`w-12 h-12 ${
                theme === "dark" ? "text-gray-500" : "text-gray-400"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h2
            className={`text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-800"
            } mb-2`}
          >
            No Favorite Movies
          </h2>
          <p
            className={`${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            } max-w-md`}
          >
            You haven&#39;t added any movies to your favorites yet. Browse and
            add some movies to see them here!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-black" : "bg-white"
      } p-4`}
    >
      <div className="mb-6">
        <h1
          className={`text-2xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          } mb-2`}
        >
          My Favorite Movies
        </h1>
        <p
          className={`${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          You have {favMovie.length} favorite movie
          {favMovie.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favMovie.map((movie, index) => (
          <Card
            key={index}
            className="group hover:shadow-xl dark:hover:shadow-gray-800 transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden border-2 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 p-0"
          >
            <Link href={`/movie/${movie.imdbID}`}>
              <div className="relative overflow-hidden">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.jpg"}
                  alt={movie.Title}
                  className="w-full h-[200px] object-fill group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Badge className="absolute top-2 right-2 bg-red-600 text-white shadow-lg text-xs">
                  FAVORITE
                </Badge>
              </div>

              <CardContent className="p-2">
                <h2
                  className={`text-sm font-bold mb-1 line-clamp-2 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  } group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors`}
                >
                  {movie.Title}
                </h2>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-gray-500" />
                    <span
                      className={`text-xs ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {movie.Year}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Film className="h-3 w-3 text-gray-500" />
                    <span
                      className={`text-xs ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {movie.Type}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Link>

            <CardFooter className="p-2 pt-0">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavMovie(movie.imdbID);
                }}
                variant="destructive"
                size="sm"
                className="w-full flex items-center gap-2"
              >
                <Trash2 className="h-3 w-3" />
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};


export default FavMoviePage;
