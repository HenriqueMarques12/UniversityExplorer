import api from './api.client';
import { PaginatedResponse, SearchParams, University } from '../types/university.types';

export const universityApi = {
  getUniversities: async (params: SearchParams): Promise<PaginatedResponse<University>> => {
    try {
      const response = await api.get<PaginatedResponse<University>>('/universities', { params });
      return response.data;
    } catch (error) {
      console.error('Erro na requisição da API:', error);
      throw error;
    }
  },

  getUniversityById: async (id: string): Promise<University> => {
    const response = await api.get<University>(`/universities/${id}`);
    return response.data;
  },

  updateQuote: async (id: string, value: number): Promise<University> => {
    const response = await api.put<University>(`/universities/${id}/quote`, { value });
    return response.data;
  },

  getLatestQuotes: async () => {
    const response = await api.get('/universities/quotes/latest');
    return response.data;
  },
};
