export interface OpenFDA {
  brand_name?: string[];
  generic_name?: string[];
  manufacturer_name?: string[];
  product_type?: string[];
  route?: string[];
  [key: string]: string[] | undefined;
}

export interface Medicine {
  id?: string;
  openfda?: OpenFDA;
}

export interface FDAResponse {
  results?: Medicine[];
  error?: {
    code?: string;
    message?: string;
  };
}