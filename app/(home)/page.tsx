/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
// app/page.tsx (or app/page.jsx)
// eslint-disable-next-line @next/next/no-img-element
import Link from "next/link";
import React from "react";
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
    <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {movies.length > 0 ? (
        //@ts-expect-error
        movies.map((movie, index) => (
          <Link href={`/movie/${movie.imdbID}`} key={index}>
            <div
              key={movie.imdbID}
              className="border p-2 rounded shadow h-auto"
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full object-fill h-[300px] mb-2"
              />
              <h2 className="text-lg font-semibold">{movie.Title}</h2>
              <p>{movie.Year}</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
}
