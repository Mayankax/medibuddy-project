import { FDAResponse, Medicine } from "@/types/medicine";

const FDA_API_URL = "https://api.fda.gov/drug/label.json";

const searchCache = new Map<string, FDAResponse>();

export async function searchMedicines(
  query: string,
  signal?: AbortSignal
): Promise<FDAResponse> {
  const cacheKey = query.trim().toLowerCase();

  const cachedResult = searchCache.get(cacheKey);

  if (cachedResult) {
    return cachedResult;
  }

  const url = new URL(FDA_API_URL);

  url.searchParams.set(
    "search",
    `openfda.brand_name:"${query}"`
  );

  url.searchParams.set("limit", "20");

  const response = await fetch(url.toString(), {
    signal,
  });

  if (response.status === 404) {
    const emptyResult: FDAResponse = { results: [] };

    searchCache.set(cacheKey, emptyResult);

    return emptyResult;
  }

  if (!response.ok) {
    throw new Error("FDA API request failed");
  }

  const data: FDAResponse = await response.json();

  searchCache.set(cacheKey, data);

  return data;
}

export async function getMedicineById(
  id: string
): Promise<Medicine | null> {
  const url = new URL(FDA_API_URL);

  url.searchParams.set("search", `id:"${id}"`);

  const response = await fetch(url.toString());

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("FDA API request failed");
  }

  const data: FDAResponse = await response.json();

  return data.results?.[0] ?? null;
}