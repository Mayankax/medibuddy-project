// export interface OpenFDA {
//   brand_name?: string[];
//   generic_name?: string[];
//   manufacturer_name?: string[];
//   product_type?: string[];
//   route?: string[];
//   [key: string]: string[] | undefined;
// }

// export interface Medicine {
//   id?: string;
//   openfda?: OpenFDA;
// }

// export interface FDAResponse {
//   results?: Medicine[];
//   error?: {
//     code?: string;
//     message?: string;
//   };
// }


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

  // Basic label information
  purpose?: string[];
  description?: string[];
  statement_of_identity?: string[];

  // Ingredients and dosage
  active_ingredient?: string[];
  dosage_forms_and_strengths?: string[];
  dosage_and_administration?: string[];
  inactive_ingredient?: string[];

  // Uses
  indications_and_usage?: string[];

  // Safety information
  warnings?: string[];
  warnings_and_cautions?: string[];
  contraindications?: string[];
  do_not_use?: string[];
  ask_doctor?: string[];
  ask_doctor_or_pharmacist?: string[];
  pregnancy_or_breast_feeding?: string[];
  stop_use?: string[];
  when_using?: string[];
  keep_out_of_reach_of_children?: string[];

  // Other FDA information
  adverse_reactions?: string[];
  drug_interactions?: string[];
  overdosage?: string[];
  pharmacokinetics?: string[];
  pharmacodynamics?: string[];
  mechanism_of_action?: string[];
  clinical_pharmacology?: string[];

  // FDA identifiers
  application_number?: string[];
  product_ndc?: string[];
  package_ndc?: string[];
  substance_name?: string[];
  rxcui?: string[];
  spl_id?: string[];
  spl_set_id?: string[];
  effective_time?: string[];
  version?: string[];

  // Allow other FDA fields that may appear
  [key: string]: string[] | OpenFDA |string | undefined;
}

export interface FDAResponse {
  results?: Medicine[];

  error?: {
    code?: string;
    message?: string;
  };
}