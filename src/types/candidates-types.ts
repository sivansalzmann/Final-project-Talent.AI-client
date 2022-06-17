export interface Candidate {
  _id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  gender: string;
  birth_year: number;
  birth_date: Date;
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
  personalInfo: string;
  email: string;
}

export interface experience {
  company_name: string;
  company_size: string;
  company_id: string;
  company_founded: number;
  company_industry: string;
  end_date: string;
  start_date: string;
  current_job: boolean;
  company_location_name: string;
  company_location_country: string;
  company_location_continent: string;
  title_name: string;
  title_role: string;
  title_levels: string[];
}
export interface education {
  school_name: string;
  school_type: string;
  end_date: string;
  start_date: string;
  gpa: string;
  degrees: string[];
  majors: string[];
  minors: string[];
}

export interface MatchCompaniesData {
  name: string;
  data: number;
}
