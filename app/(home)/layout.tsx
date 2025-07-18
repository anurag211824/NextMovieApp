"use client";
import { useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { Theme } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon, User } from "lucide-react";

import Link from "next/link";
import SearchBox from "@/components/SearchBox";

export default function Layout({ children }: { children: React.ReactNode }) {
  const context = useContext(AppContext);
  if (!context) throw new Error("MovieContext must be used within AppProvider");

  const { theme, toggleTheme } = context;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Theme appearance={theme === "light" ? "light" : "dark"}>
      <div className={`min-h-screen ${theme === "dark" ? "bg-black" : "bg-white"}`}>
        <header className={`h-[10vh] border-b-2 flex justify-between items-center px-2 sm:px-4 md:px-10 ${theme === "dark" ? "bg-black border-gray-600" : "bg-white border-black"}`}>
          <div className="flex-shrink-0">
            <h1 className="text-sm sm:text-base md:text-lg font-bold">
              <Link href="/">MoviesMod</Link>
            </h1>
          </div>
          <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md mx-2 sm:mx-4">
            <SearchBox />
          </div>
          <div className="flex-shrink-0 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </Button>
          </div>
        </header>

        <main className={`flex relative overflow-x-hidden ${theme === "dark" ? "bg-black" : "bg-white"}`}>
          {/* Floating hamburger button for mobile */}
          <button
            className="fixed top-20 left-4 z-50 md:hidden p-3 bg-blue-500 text-white rounded-full shadow-lg"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Backdrop for mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden w-full"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`
          fixed md:sticky top-0 left-0 w-screen md:w-80 border-r-2 h-[90vh] flex flex-col gap-5 px-5 pt-10 z-50 bg-white dark:bg-black
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${theme === "dark" ? "border-gray-600" : "border-black"}
        `}
          >
            {/* Close button for mobile */}
            <button
              className="md:hidden self-start mb-4 p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>


            <Link
              className="flex gap-2 w-full"
              href="/favmovie"
              onClick={() => setSidebarOpen(false)}
            >
              <button className="w-full bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded flex items-center gap-2">
                WatchList
              </button>
            </Link>

            <Link
              className="flex gap-2 w-full"
              href="/genre"
              onClick={() => setSidebarOpen(false)}
            >
              <button className="w-full bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded flex items-center gap-2">
                Genres
              </button>
            </Link>
          </div>

          {/* Main content */}
          <div className={`flex-1 md:ml-0 overflow-x-hidden ${theme === "dark" ? "bg-black" : "bg-white"}`}>{children}</div>
        </main>



        
      </div>
    </Theme>
  );
}
