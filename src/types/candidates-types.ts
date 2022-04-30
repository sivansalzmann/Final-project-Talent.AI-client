export enum candidateFields {
  _id = "id",
  full_name = "full_name",
  first_name = "first_name",
  last_name = "last_name",
  gender = "gender",
  birth_year = "birth_year",
  birth_date = "birth_date",
  industry = "industry",
  job_title = "job_title",
  job_title_role = "job_title_role",
  job_title_sub_role = "job_title_sub_role",
  job_title_levels = "job_title_levels",
  job_company_id = "job_company_id",
  job_company_name = "job_company_name",
  job_start_date = "job_start_date",
  interests = "interests",
  skills = "skills",
  experience = "experience",
}

export interface Candidate {
  _id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  gender: string;
  birth_year: string;
  birth_date: string;
  industry: string;
  job_title: string;
  job_title_role: string;
  job_title_sub_role: string;
  job_title_levels: string[];
  job_company_id: string;
  job_company_name: string;
  job_start_date: string;
  interests: string[];
  skills: string[];
  experience: experience[];
  education: education[];
}

export interface CandidateResponseObject {
  candidate: Candidate;
}

export enum companyFields {}

export interface location {
  name: string;
  locality: string;
  region: string;
  metro: string;
  country: string;
  continent: string;
  street_address: string;
  address_line_2: string;
  postal_code: string;
  geo: string;
}

export interface Company {
  _id: string;
  name: string;
  size: string;
  employee_count: string;
  founded: string;
  industry: string;
  location: location;
  linkedin_id: string;
  linkedin_url: string;
  facebook_url: string;
  twitter_url: string;
  profiles: string[];
  website: string;
  ticker: string;
  type: string;
  summary: string;
  tags: string[];
  headline: string;
  alternative_names: string[];
  alternative_domains: string[];
  affiliated_profiles: string[];
}

export interface JobOffer {
  _id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  gender: string;
  birth_year: string;
  birth_date: string;
  industry: string;
  job_title: string;
  job_title_role: string;
  job_title_sub_role: string;
  job_title_levels: string[];
  job_company_id: string;
  job_company_name: string;
  job_start_date: string;
  interests: string[];
  skills: string[];
  experience: experience[];
  education: education[];
  candidates_id: string[];
  status: string;
  job_offer_ID: string;
  job_description: string;
}

export interface experience {
  company_id: string;
  company_name: string;
  company_founded: string;
  company_industry: string;
  company_size: string;
  current_job: boolean;
  company_location_name: string;
  company_location_country: string;
  company_location_continent: string;
  end_date: string;
  start_date: string;
  title_name: string;
  title_role: string;
  title_levels: string[];
}
export interface education {
  school_name: string;
  school_type: string;
  degrees: string[];
  start_date: string;
  end_date: string;
  majors: string[];
  minors: string[];
  gpa: string;
}

export interface JobOffers {
  jobOffers: JobOffer[];
}
