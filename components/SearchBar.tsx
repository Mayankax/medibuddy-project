"use client";

import { FormEvent, useState } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery || loading) {
      return;
    }

    onSearch(trimmedQuery);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-2xl flex-col gap-3 rounded-2xl border bg-white p-2 shadow-lg shadow-slate-200/60 sm:flex-row sm:gap-2"
    >
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by medicine brand name..."
          aria-label="Search medicine by brand name"
          className="h-11 border-0 bg-transparent pl-10 shadow-none focus-visible:ring-0"
        />
      </div>

      <Button type="submit" disabled={loading} className="h-11 rounded-xl px-6">
        {loading ? "Searching..." : "Search"}
      </Button>
    </form>
  );
}
