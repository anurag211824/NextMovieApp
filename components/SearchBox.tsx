"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchBox = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.trim()) return;

    console.log("Searching for movie:", query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full relative"
    >
      <Input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 pr-8 h-8 md:h-9 text-sm"
      />
      <Link href={`/search?movie=${query}`}>
        <Button 
          type="submit" 
          size="sm" 
          variant="ghost"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 h-6 w-6 md:h-7 md:w-7 p-0"
        >
          <Search className="h-3 w-3 md:h-4 md:w-4" />
        </Button>
      </Link>
    </form>
  );
};

export default SearchBox;
