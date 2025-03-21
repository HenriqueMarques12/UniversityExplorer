import { useState, useEffect, useCallback } from 'react';
import { universityApi } from '../api/university.api';
import { University } from '../types/university.types';
import { useDebounce } from '../hooks/useDebounce';

export const useUniversityList = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [country, setCountry] = useState<string>('Brazil');
  const [totalItems, setTotalItems] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const debouncedSearchText = useDebounce(searchText, 500);
  const debouncedCountry = useDebounce(country, 500);
  
  const fetchUniversities = useCallback(async (
    pageNum = 1, 
    searchQuery = searchText, 
    countryQuery = country
  ) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      const params = {
        page: pageNum,
        limit: 10,
        name: searchQuery,
        country: countryQuery,
      };
      
      const data = await universityApi.getUniversities(params);

      if (data && data.data) {
        const normalizedData = data.data.map((uni: any) => ({
          ...uni,
          id: uni.id || uni._id
        }));
        
        if (pageNum === 1) {
          setUniversities(normalizedData);
        } else {
          setUniversities(prev => [...prev, ...normalizedData]);
        }

        setTotalItems(data.total || 0);
        setPage(pageNum);
      } else {
        if (pageNum === 1) {
          setUniversities([]);
        }
        setTotalItems(0);
      }
    } catch (error) {
      console.error('Erro ao buscar universidades:', error);
      setError('Falha ao carregar universidades. Tente novamente.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  }, [searchText, country]);
  
  useEffect(() => {
    fetchUniversities();
  }, []);
  
  useEffect(() => {
    if (debouncedSearchText !== undefined || debouncedCountry !== undefined) {
      fetchUniversities(1, debouncedSearchText, debouncedCountry);
    }
  }, [debouncedSearchText, debouncedCountry, fetchUniversities]);
  
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUniversities(1);
  }, [fetchUniversities]);
  
  const handleLoadMore = useCallback(() => {
    if (loadingMore || universities.length >= totalItems) return;
    fetchUniversities(page + 1);
  }, [loadingMore, universities, totalItems, page, fetchUniversities]);
  
  const handleSearch = useCallback((text: string) => {
    setSearchText(text);
  }, []);
  
  const handleSelectCountry = useCallback((value: string) => {
    setCountry(value);
  }, []);
  
  return {
    universities,
    loading,
    refreshing,
    searchText,
    country,
    totalItems,
    page,
    loadingMore,
    error,
    handleRefresh,
    handleLoadMore,
    handleSearch,
    handleSelectCountry,
    setSearchText,
    setCountry
  };
};
