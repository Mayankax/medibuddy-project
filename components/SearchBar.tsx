"use client";

import { FormEvent, useState } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

export default function SearchBar({
  onSearch,
  loading,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    onSearch(trimmedQuery);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-2xl gap-2"
    >
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by medicine brand name..."
        className="h-11 bg-white"
      />

      <Button
        type="submit"
        disabled={loading}
        className="h-11 px-5"
      >
        <Search className="mr-2 h-4 w-4" />

        {loading ? "Searching..." : "Search"}
      </Button>
    </form>
  );
}