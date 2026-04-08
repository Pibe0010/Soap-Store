import { useCategories } from '../useCategories';
import { getCategories } from '../../services/supabase';
import { useQuery } from '@tanstack/react-query';

// Mock the supabase service function
jest.mock('../../services/supabase');
// Mock the useQuery hook
jest.mock('@tanstack/react-query');

describe('useCategories', () => {
  const mockCategories = ['Test', 'Lavender', 'Unscented'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the correct data when the query is successful', () => {
    (getCategories as jest.Mock).mockResolvedValue(mockCategories);
    
    // Mock useQuery to actually call the queryFn
    (useQuery as jest.Mock).mockImplementation(({ queryFn }) => {
      // Call the queryFn to satisfy the test expectation
      queryFn();
      return {
        data: mockCategories,
        error: null,
        isLoading: false,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
      };
    });

    const { data, error, isLoading, isError, isSuccess, refetch } = useCategories();

    expect(getCategories).toHaveBeenCalled();
    expect(data).toEqual(mockCategories);
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

    const { isLoading, data, error } = useCategories();

    expect(isLoading).toBe(true);
    expect(data).toBeUndefined();
    expect(error).toBeNull();
  });

  it('should handle error state correctly', () => {
    const mockError = new Error('Failed to fetch categories');
    (getCategories as jest.Mock).mockRejectedValue(mockError);
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: mockError,
      isLoading: false,
      isError: true,
      isSuccess: false,
      refetch: jest.fn(),
    });

    const { error, isLoading, isError, isSuccess } = useCategories();

    expect(error).toBe(mockError);
    expect(isLoading).toBe(false);
    expect(isError).toBe(true);
    expect(isSuccess).toBe(false);
  });
});
