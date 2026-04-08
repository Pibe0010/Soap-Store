import { useProducts } from '../hooks/useProducts';
import { getProducts } from '../services/index';
import { useQuery } from '@tanstack/react-query';
import type { ProductPage } from '../types/product';

// Mock the supabase service function
jest.mock('../services/supabase');
// Mock the useQuery hook
jest.mock('@tanstack/react-query');

describe('useProducts', () => {
  const mockProductPage: ProductPage = {
    data: [
      {
        id: '1',
        name: 'Test Soap',
        description: 'A test soap',
        price: 5.99,
        category: 'Test',
        imageUrl: 'http://example.com/image.jpg',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      },
    ],
    total: 1,
    limit: 10,
    offset: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the correct data when the query is successful', () => {
    (getProducts as jest.Mock).mockResolvedValue(mockProductPage);
    (useQuery as jest.Mock).mockReturnValue({
      data: mockProductPage,
      error: null,
      isLoading: false,
      isError: false,
      isSuccess: true,
      refetch: jest.fn(),
    });

    const { data, error, isLoading, isError, isSuccess, refetch } = useProducts();

    expect(getProducts).toHaveBeenCalledWith({});
    expect(data).toEqual(mockProductPage);
    expect(error).toBeNull();
    expect(isLoading).toBe(false);
    expect(isError).toBe(false);
    expect(isSuccess).toBe(true);
    expect(refetch).toBeDefined();
  });

  it('should handle loading state correctly', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
      isError: false,
      isSuccess: false,
      refetch: jest.fn(),
    });

    const { isLoading, data, error } = useProducts();

    expect(isLoading).toBe(true);
    expect(data).toBeUndefined();
    expect(error).toBeNull();
  });

  it('should handle error state correctly', () => {
    const mockError = new Error('Failed to fetch products');
    (getProducts as jest.Mock).mockRejectedValue(mockError);
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: mockError,
      isLoading: false,
      isError: true,
      isSuccess: false,
      refetch: jest.fn(),
    });

    const { error, isLoading, isError, isSuccess } = useProducts();

    expect(error).toBe(mockError);
    expect(isLoading).toBe(false);
    expect(isError).toBe(true);
    expect(isSuccess).toBe(false);
  });

  it('should pass filters to the getProducts function', () => {
    const filters = { category: 'Test', limit: 5, offset: 0 };
    (getProducts as jest.Mock).mockResolvedValue(mockProductPage);
    (useQuery as jest.Mock).mockReturnValue({
      data: mockProductPage,
      error: null,
      isLoading: false,
      isError: false,
      isSuccess: true,
      refetch: jest.fn(),
    });

    useProducts(filters);

    expect(getProducts).toHaveBeenCalledWith(filters);
  });
});
