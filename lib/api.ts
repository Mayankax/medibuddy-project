import { FDAResponse } from "@/types/medicine";

const FDA_API_URL = "https://api.fda.gov/drug/label.json";

export async function searchMedicines(
  query: string
): Promise<FDAResponse> {
  const url = new URL(FDA_API_URL);

  url.searchParams.set(
    "search",
    `openfda.brand_name:"${query}"`
  );

  url.searchParams.set("limit", "20");

  const response = await fetch(url.toString());

  if (response.status === 404) {
    return { results: [] };
  }

  if (!response.ok) {
    throw new Error("FDA API request failed");
  }

  return response.json();
}