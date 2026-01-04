import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProductRepository } from './ProductRepository';
import { productService } from '@/services/ProductService';

// Mock the Service layer
vi.mock('@/services/ProductService', () => ({
  productService: {
    search: vi.fn(),
    getAll: vi.fn(),
  },
}));

describe('ProductRepository', () => {
  let repository: ProductRepository;

  beforeEach(() => {
    repository = new ProductRepository();
    vi.clearAllMocks();
  });

  it('should manually sort search results by price in ascending order', async () => {
    // 1. Mock Data (unsorted)
    const mockProducts = [
      { id: 1, title: 'Cheap Phone', price: 100 },
      { id: 2, title: 'Expensive Phone', price: 900 },
      { id: 3, title: 'Mid Phone', price: 500 },
    ];

    (productService.search as any).mockResolvedValue({
      products: mockProducts,
      total: 3,
    });

    // 2. Execute with sort params
    const result = await repository.getDashboardData({ 
      q: 'phone', 
      sort: 'price-asc' 
    });

    // 3. Verify
    expect(result.items[0].price).toBe(100);
    expect(result.items[1].price).toBe(500);
    expect(result.items[2].price).toBe(900);
  });

  it('should call getAll when no search query is provided', async () => {
    (productService.getAll as any).mockResolvedValue({ products: [], total: 0 });

    await repository.getDashboardData({ page: '2' });

    // Ensure it calculates the "skip" correctly (Page 2 = Skip 10)
    expect(productService.getAll).toHaveBeenCalledWith(10, 10, undefined, undefined);
  });
});