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
  experience: Experience[];
  education: Education[];
  candidates_id: string[];
  status: string;
  job_offer_ID: string;
  job_description: string;
}

export interface Experience {
  company_id: string;
  company_name: string;
  company_founded: string;
  company_industry: string;
  company_size: string;
  current_job: boolean;
  company_location_name: string;
  company_location_country: string;
  company_location_continent: string;
  end_date: Date | null;
  start_date: Date | null;
  title_name: string;
  title_role: string;
  title_levels: string[];
}

export interface ExperienceInput {
  company_name: string;
  current_job: boolean;
  end_date: string;
  start_date: string;
  title_name: string;
  title_role: string;
  title_levels: string[];
}
export interface Education {
  school_name: string;
  school_type: string;
  start_date: string;
  end_date: string;
  degrees: string[];
  majors: string[];
  minors: string[];
  gpa: string;
}

export interface JobOffers {
  jobOffers: JobOffer[];
}
