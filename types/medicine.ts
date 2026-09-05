export interface OpenFDA {
  brand_name?: string[];
  generic_name?: string[];
  manufacturer_name?: string[];
  product_type?: string[];
  route?: string[];
}

export interface Medicine {
  id?: string;
  openfda?: OpenFDA;

  // Basic information
  purpose?: string[];
  description?: string[];
  statement_of_identity?: string[];

  // Ingredients and dosage
  active_ingredient?: string[];
  dosage_forms_and_strengths?: string[];
  dosage_and_administration?: string[];

  // Uses
  indications_and_usage?: string[];

  // Safety
  warnings?: string[];
  contraindications?: string[];
  do_not_use?: string[];
  ask_doctor?: string[];
  stop_use?: string[];
  when_using?: string[];
  pregnancy_or_breast_feeding?: string[];

  // Other useful information
  adverse_reactions?: string[];
  drug_interactions?: string[];
}

export interface FDAResponse {
  results?: Medicine[];
  error?: {
    code?: string;
    message?: string;
  };
}