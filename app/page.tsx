"use client";

import { useState } from "react";

import SearchBar from "@/components/SearchBar";
import { searchMedicines } from "@/lib/api";
import { Medicine } from "@/types/medicine";
import MedicineCard from "@/components/MedicineCard";


export default function Home() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch(query: string) {
    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const data = await searchMedicines(query);

      setMedicines(data.results ?? []);
    } catch (error) {
      console.error(error);
      setMedicines([]);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-10 sm:px-6 lg:px-8">
        
        <section className="flex flex-col items-center text-center">
          <p className="mb-3 text-sm font-medium text-primary">
            FDA Drug Label Search
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Find your medicine
          </h1>

          <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
            Search medicines by brand name and explore information
            from the FDA drug label database.
          </p>

          <div className="mt-8 w-full flex justify-center">
            <SearchBar
              onSearch={handleSearch}
              loading={loading}
            />
          </div>
        </section>

        <section className="mt-12">
          {loading && (
            <div className="py-12 text-center">
              <p className="text-sm text-slate-500">
                Searching for medicines...
              </p>
            </div>
          )}

          {error && !loading && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
              <h2 className="font-semibold text-red-900">
                Something went wrong
              </h2>

              <p className="mt-1 text-sm text-red-700">
                Please try your search again.
              </p>
            </div>
          )}

          {!loading && !error && !hasSearched && (
            <div className="rounded-xl border border-dashed bg-white p-10 text-center">
              <h2 className="text-lg font-semibold text-slate-900">
                Search for a medicine
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Enter a brand name above to see available medicines.
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            hasSearched &&
            medicines.length === 0 && (
              <div className="rounded-xl border border-dashed bg-white p-10 text-center">
                <h2 className="text-lg font-semibold text-slate-900">
                  No results found
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Try searching with a different medicine brand name.
                </p>
              </div>
            )}

          {medicines.length > 0 && (
            <div>
              <h2 className="mb-5 text-xl font-semibold text-slate-900">
                Search results
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {medicines.map((medicine, index) => (
                  <MedicineCard
                    key={index}
                    medicine={medicine}
                    onClick={() => {
                      console.log("Selected medicine:", medicine);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}