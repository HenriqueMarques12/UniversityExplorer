export interface University {
    id: string;
    name: string;
    country: string;
    alpha_two_code: string;
    domains: string[];
    web_pages: string[];
    state_province?: string;
    lastQuoteValue?: number;
    lastQuoteUpdate?: string;
  }
  
  export interface UniversityQuote {
    universityId: string;
    universityName: string;
    value: number;
    updatedAt: string;
  }
  
  export interface SearchParams {
    name?: string;
    country?: string;
    page?: number;
    limit?: number;
  }
  
  export interface University {
    id: string;
    _id: string;
    name: string;
    country: string;
    alpha_two_code: string;
    domains: string[];
    web_pages: string[];
    state_province?: string;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    limit: number;
    total: number;
  }
  