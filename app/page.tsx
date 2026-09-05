"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
  Database,
  FileText,
  Pill,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import SearchBar from "@/components/SearchBar";
import MedicineCard from "@/components/MedicineCard";
import MedicineCardSkeleton from "@/components/MedicineCardSkeleton";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

import { searchMedicines } from "@/lib/api";
import { Medicine } from "@/types/medicine";

export default function Home() {
  const router = useRouter();

  const abortControllerRef = useRef<AbortController | null>(null);

  // Ref for the results section
  const resultsRef = useRef<HTMLElement | null>(null);

  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  async function handleSearch(query: string) {
    const cleanQuery = query.trim();

    if (!cleanQuery) {
      return;
    }

    abortControllerRef.current?.abort();

    const controller = new AbortController();

    abortControllerRef.current = controller;

    setLoading(true);
    setError("");
    setHasSearched(true);
    setSearchQuery(cleanQuery);

    /*
     * Scroll to the results section immediately after
     * the user starts a search.
     *
     * requestAnimationFrame allows React to process the
     * hasSearched/loading state before scrolling.
     */
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    try {
      const data = await searchMedicines(cleanQuery, controller.signal);

      setMedicines(data.results ?? []);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      console.error(error);

      setMedicines([]);

      setError("Something went wrong. Please try again.");
    } finally {
      if (abortControllerRef.current === controller) {
        setLoading(false);
        abortControllerRef.current = null;
      }
    }
  }

  return (
    <main className="medi-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="medi-header-inner">
          {/* Brand */}

          <div className="flex items-center gap-3">
            <div
              className="relative flex h-10 w-10 shrink-0 items-center
                justify-center
                overflow-hidden
                rounded-xl
                bg-gradient-to-br
                from-blue-600
                to-blue-700
                text-white
                shadow-[0_7px_22px_rgba(37,99,235,0.24)]
              "
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent" />

              <Pill className="relative h-[19px] w-[19px]" />
            </div>

            <div className="leading-none">
              <p className="text-[15px] font-bold tracking-[-0.025em] text-slate-950">
                MediSearch
              </p>

              <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.13em] text-slate-400">
                FDA medicine lookup
              </p>
            </div>
          </div>

          {/* FDA badge */}

          <Badge
            variant="secondary"
            className="
              hidden
              rounded-full
              border
              border-slate-200
              bg-slate-50
              px-3.5
              py-1.5
              text-[11px]
              font-semibold
              tracking-wide
              text-slate-600
              shadow-none
              sm:inline-flex
            "
          >
            <ShieldCheck className="mr-1.5 h-3.5 w-3.5 text-blue-600" />
            FDA Drug Labels
          </Badge>
        </div>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="medi-hero">
        {/* Background */}

        <div className="medi-hero-glow">
          <div className="medi-glow-blue" />
          <div className="medi-glow-cyan" />
          <div className="medi-glow-indigo" />
          <div className="medi-grid-background" />
        </div>

        <div className="medi-hero-inner">
          <div className="medi-hero-content">
            {/* Eyebrow */}

            <Badge
              variant="outline"
              className="
                mb-6
                rounded-full
                border-blue-200
                bg-white/80
                px-4
                py-1.5
                text-[11px]
                font-semibold
                tracking-wide
                text-blue-700
                shadow-sm
                backdrop-blur
              "
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Search medicines with confidence
            </Badge>

            {/* Main heading */}

            <h1
              className="
                medi-title
                text-[2.8rem]
                font-bold
                leading-[1.02]
                tracking-[-0.055em]
                text-slate-950
                sm:text-6xl
                lg:text-[4.35rem]
              "
            >
              Medicine information,
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-blue-600
                  via-blue-700
                  to-cyan-600
                  bg-clip-text
                  text-transparent
                "
              >
                without the guesswork.
              </span>
            </h1>

            {/* Description */}

            <p
              className="
                medi-description
                mt-6
                text-[15px]
                leading-7
                text-slate-600
                sm:text-[17px]
                sm:leading-8
              "
            >
              Search by brand name and explore structured medicine information
              directly from FDA drug label data.
            </p>

            {/* Search */}

            <div className="medi-search-area">
              <div
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-1.5
                  shadow-[0_18px_50px_rgba(15,23,42,0.10)]
                  ring-1
                  ring-slate-900/[0.025]
                "
              >
                <SearchBar onSearch={handleSearch} loading={loading} />
              </div>
            </div>

            {/* Popular searches */}

            <div className="medi-popular text-xs text-slate-500">
              <span className="font-medium text-slate-400">
                Popular searches
              </span>

              <button
                type="button"
                onClick={() => handleSearch("Advil")}
                disabled={loading}
                className="
                  group
                  inline-flex
                  items-center
                  gap-1
                  font-semibold
                  text-blue-600
                  hover:text-blue-700
                  hover:underline
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                Advil
                <ArrowRight
                  className="
                    h-3
                    w-3
                    opacity-0
                    transition-all
                    group-hover:translate-x-0.5
                    group-hover:opacity-100
                  "
                />
              </button>

              <span className="text-slate-300">•</span>

              <button
                type="button"
                onClick={() => handleSearch("Tylenol")}
                disabled={loading}
                className="
                  group
                  inline-flex
                  items-center
                  gap-1
                  font-semibold
                  text-blue-600
                  hover:text-blue-700
                  hover:underline
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                Tylenol
                <ArrowRight
                  className="
                    h-3
                    w-3
                    opacity-0
                    transition-all
                    group-hover:translate-x-0.5
                    group-hover:opacity-100
                  "
                />
              </button>

              <span className="text-slate-300">•</span>

              <button
                type="button"
                onClick={() => handleSearch("Aspirin")}
                disabled={loading}
                className="
                  group
                  inline-flex
                  items-center
                  gap-1
                  font-semibold
                  text-blue-600
                  hover:text-blue-700
                  hover:underline
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                Aspirin
                <ArrowRight
                  className="
                    h-3
                    w-3
                    opacity-0
                    transition-all
                    group-hover:translate-x-0.5
                    group-hover:opacity-100
                  "
                />
              </button>
            </div>
          </div>

          {/* =================================================
              TRUST STRIP
          ================================================= */}

          <div className="medi-trust">
            <div className="medi-trust-item">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Database className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900">FDA sourced</p>

                <p className="mt-0.5 text-[11px] text-slate-500">
                  Structured drug labels
                </p>
              </div>
            </div>

            <div className="medi-trust-item">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                <Zap className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900">Fast lookup</p>

                <p className="mt-0.5 text-[11px] text-slate-500">
                  Results in seconds
                </p>
              </div>
            </div>

            <div className="medi-trust-item">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <ShieldCheck className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900">
                  Reliable source
                </p>

                <p className="mt-0.5 text-[11px] text-slate-500">
                  Official label information
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          RESULTS
      ===================================================== */}

      <section ref={resultsRef} className="medi-results scroll-mt-28">
        {/* ---------------------------------------------------
            LOADING
        --------------------------------------------------- */}

        {loading && (
          <div>
            <div className="mb-7 flex items-end justify-between gap-4">
              <div className="space-y-2.5">
                <Skeleton className="h-3 w-28" />

                <Skeleton className="h-8 w-56" />
              </div>

              <Skeleton className="h-7 w-20 rounded-full" />
            </div>

            <div className="medi-result-grid">
              {Array.from({ length: 4 }).map((_, index) => (
                <MedicineCardSkeleton key={index} />
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------
            ERROR
        --------------------------------------------------- */}

        {error && !loading && (
          <div className="medi-empty">
            <div
              className="
                overflow-hidden
                rounded-3xl
                border
                border-red-200/80
                bg-white
                shadow-[0_12px_40px_rgba(15,23,42,0.06)]
              "
            >
              <div className="p-8 text-center sm:p-10">
                <div
                  className="
                    mx-auto
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-red-50
                    text-red-600
                    ring-8
                    ring-red-50/60
                  "
                >
                  <span className="text-xl font-bold">!</span>
                </div>

                <h2 className="mt-6 text-xl font-bold tracking-tight text-slate-900">
                  Something went wrong
                </h2>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  We couldn't load the medicine data. Please try searching
                  again.
                </p>

                <button
                  type="button"
                  onClick={() => handleSearch(searchQuery)}
                  className="
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_8px_20px_rgba(37,99,235,0.2)]
                    hover:bg-blue-700
                    hover:shadow-[0_10px_24px_rgba(37,99,235,0.25)]
                  "
                >
                  Try again
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------
            INITIAL STATE
        --------------------------------------------------- */}

        {!loading && !error && !hasSearched && (
          <div className="medi-empty">
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.05)]">
              <div className="relative px-6 py-12 text-center sm:px-10 sm:py-14">
                <div
                  className="
                      pointer-events-none
                      absolute
                      left-1/2
                      top-0
                      h-32
                      w-64
                      -translate-x-1/2
                      rounded-full
                      bg-blue-50
                      blur-3xl
                    "
                />

                <div
                  className="
                      relative
                      mx-auto
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-blue-50
                      text-blue-600
                      ring-8
                      ring-blue-50/50
                    "
                >
                  <Search className="h-6 w-6" />
                </div>

                <h2
                  className="
                      relative
                      mt-6
                      text-xl
                      font-bold
                      tracking-tight
                      text-slate-900
                      sm:text-2xl
                    "
                >
                  Start with a medicine name
                </h2>

                <p
                  className="
                      relative
                      mx-auto
                      mt-2
                      max-w-lg
                      text-sm
                      leading-6
                      text-slate-500
                    "
                >
                  Enter a brand name above to explore available FDA drug label
                  information.
                </p>
              </div>

              <div className="grid border-t border-slate-100 sm:grid-cols-3">
                <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5 sm:border-b-0 sm:border-r">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Database className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">FDA data</p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Structured labels
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5 sm:border-b-0 sm:border-r">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                    <Zap className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">Up to 20</p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Results per search
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-6 py-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <ShieldCheck className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Reliable source
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      FDA label data
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------
            NO RESULTS
        --------------------------------------------------- */}

        {!loading && !error && hasSearched && medicines.length === 0 && (
          <div className="medi-empty">
            <div
              className="
                  rounded-3xl
                  border
                  border-slate-200/80
                  bg-white
                  p-10
                  text-center
                  shadow-[0_12px_40px_rgba(15,23,42,0.05)]
                "
            >
              <div
                className="
                    mx-auto
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-slate-100
                    text-slate-400
                  "
              >
                <Search className="h-6 w-6" />
              </div>

              <h2 className="mt-6 text-xl font-bold tracking-tight text-slate-900">
                No medicines found
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                We couldn't find a medicine matching{" "}
                <span className="font-semibold text-slate-700">
                  "{searchQuery}"
                </span>
                . Try searching for another brand name.
              </p>

              <div
                className="
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-slate-200
                    bg-slate-50
                    px-3.5
                    py-2
                    text-xs
                    font-medium
                    text-slate-500
                  "
              >
                <FileText className="h-3.5 w-3.5" />
                Try a common brand name such as Advil
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------
            SEARCH RESULTS
        --------------------------------------------------- */}

        {!loading && !error && medicines.length > 0 && (
          <div>
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <div className="mb-2.5 flex items-center gap-2">
                  <span
                    className="
                        h-1.5
                        w-1.5
                        shrink-0
                        rounded-full
                        bg-blue-600
                        shadow-[0_0_0_4px_rgba(37,99,235,0.08)]
                      "
                  />

                  <p
                    className="
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        text-blue-600
                      "
                  >
                    Search results
                  </p>
                </div>

                <h2
                  className="
                      text-2xl
                      font-bold
                      tracking-[-0.025em]
                      text-slate-950
                      sm:text-3xl
                    "
                >
                  Medicines matching{" "}
                  <span className="text-slate-400">"{searchQuery}"</span>
                </h2>

                <p className="mt-1.5 text-sm text-slate-500">
                  Browse structured information from available drug labels.
                </p>
              </div>

              <div
                className="
                    flex
                    shrink-0
                    items-center
                    gap-2
                    self-start
                    rounded-full
                    border
                    border-slate-200
                    bg-white
                    px-3.5
                    py-2
                    text-xs
                    font-semibold
                    text-slate-600
                    shadow-sm
                    sm:self-auto
                  "
              >
                <span
                  className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-emerald-500
                      shadow-[0_0_0_3px_rgba(16,185,129,0.1)]
                    "
                />
                {medicines.length}{" "}
                {medicines.length === 1 ? "result" : "results"}
              </div>
            </div>

            <div className="medi-result-grid">
              {medicines.map((medicine, index) => (
                <MedicineCard
                  key={medicine.id ?? index}
                  medicine={medicine}
                  onClick={() => {
                    if (!medicine.id) {
                      return;
                    }

                    router.push(`/medicine/${encodeURIComponent(medicine.id)}`);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-slate-200/70 bg-white">
        <div className="medi-footer-inner">
          <div className="flex items-center justify-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Pill className="h-3.5 w-3.5" />
            </div>

            <span className="text-xs font-semibold text-slate-600">
              MediSearch
            </span>
          </div>

          <p className="text-[11px] leading-5 text-slate-400">
            Medicine information sourced from FDA drug label data.
          </p>
        </div>
      </footer>
    </main>
  );
}
