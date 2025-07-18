"use client";
import { ReactNode, useState, useEffect, createContext } from "react";

// --- Types ---
export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}
export interface AppContextType {
  theme: string;
  toggleTheme: () => void;
  favMovie: Movie[];
  setfavMovie: React.Dispatch<React.SetStateAction<Movie[]>>;
  handleAddFavMovie: (movie: Movie) => void;
  removeFavMovie: (id: string) => void;
}

// --- Context ---
export const AppContext = createContext<AppContextType | null>(null);

// --- Provider ---
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("light");
  const [favMovie, setfavMovie] = useState<Movie[]>([]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const storedFavMovies = localStorage.getItem("favMovie");

    if (storedTheme) setTheme(storedTheme);
    if (storedFavMovies) setfavMovie(JSON.parse(storedFavMovies));
  }, []);


  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);


  useEffect(() => {
    localStorage.setItem("favMovie", JSON.stringify(favMovie));
  }, [favMovie]);

  const handleAddFavMovie = (movie: Movie) => {
    if (favMovie.findIndex((m) => m.Title === movie.Title) === -1) {
      setfavMovie((prev) => [...prev, movie]);
    }
  };

  const removeFavMovie = (id: string) => {
    setfavMovie((prev) => prev.filter((m) => m.imdbID !== id));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        favMovie,
        setfavMovie,
        handleAddFavMovie,
        removeFavMovie,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
