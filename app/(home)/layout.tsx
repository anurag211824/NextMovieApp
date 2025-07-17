"use client";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { Switch, Theme } from "@radix-ui/themes";

import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import { ListCollapse } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const context = useContext(AppContext);
  if (!context) throw new Error("MovieContext must be used within AppProvider");

  const { theme, toggleTheme } = context;

  return (
    <Theme appearance={theme === "light" ? "light" : "dark"}>
      <header className="h-[10vh] border-b flex justify-between items-center px-10">
        <div>
          <h1><Link href="/">MoviesMod</Link></h1>
        </div>
       <SearchBox/>
        <Switch checked={theme === "dark"} onClick={toggleTheme} />
      </header>

      <main className="flex relative">
        <div className="sticky top-0 left-0 w-80 border-r h-[90vh] flex flex-col gap-5 px-5 pt-10">
          <Link className="flex gap-2 w-full" href="/favmovie">
            <button className="w-full bg-blue-400 hover:bg-gray-300 px-4 py-2 rounded flex items-center gap-2">
             WatchList <ListCollapse />
            </button>
          </Link>

          <Link className="flex gap-2 w-full" href="/genres">
            <button className="w-full bg-blue-400 hover:bg-gray-300 px-4 py-2 rounded flex items-center gap-2">
             Movie By Genres
            </button>
          </Link>
        </div>
        {children}
      </main>
    </Theme>
  );
}
