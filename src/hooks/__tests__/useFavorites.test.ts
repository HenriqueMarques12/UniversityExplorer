import { jest, describe, it, expect, beforeEach } from '@jest/globals';

jest.mock('../../store/favoritesStore', () => ({
  useFavoritesStore: jest.fn()
}));

import { renderHook, act } from '@testing-library/react-native';
import { useFavorites } from '../useFavorites';
import { useFavoritesStore } from '../../store/favoritesStore';

describe('useFavorites hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      favorites: [],
      loading: false,
      loadFavorites: jest.fn(),
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn().mockImplementation(() => false),
    });
  });

  it('should load favorites on mount', () => {
    const loadFavoritesMock = jest.fn();
    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      favorites: [],
      loading: false,
      loadFavorites: loadFavoritesMock,
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn(),
    });

    const { result } = renderHook(() => useFavorites());
    expect(loadFavoritesMock).toHaveBeenCalledTimes(1);
  });

  it('should correctly identify favorite universities', () => {
    const mockIsFavorite = jest.fn().mockImplementation((id) => id === '123');
    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      favorites: [{ id: '123', name: 'Test University' }],
      loading: false,
      loadFavorites: jest.fn(),
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: mockIsFavorite,
    });

    const { result } = renderHook(() => useFavorites());
    
    expect(result.current.isFavorite('123')).toBe(true);
    expect(result.current.isFavorite('456')).toBe(false);
  });

  it('should add favorite correctly', () => {
    const addFavoriteMock = jest.fn();
    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      favorites: [],
      loading: false,
      loadFavorites: jest.fn(),
      addFavorite: addFavoriteMock,
      removeFavorite: jest.fn(),
      isFavorite: jest.fn(),
    });

    const { result } = renderHook(() => useFavorites());
    const university = { 
      id: '123', 
      name: 'Test University',
      country: 'Test Country',
      alpha_two_code: 'TC',
      domains: ['test.edu'],
      web_pages: ['https://test.edu'],
      _id: '123'
    };
    
    act(() => {
      return result.current.addFavorite(university);
    });
    
    expect(addFavoriteMock).toHaveBeenCalledWith(university);
  });
});
