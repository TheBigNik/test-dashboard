import { Product, ProductResponse } from "@/models/Products";

export interface IProductService {
  getAll(limit: number, skip: number): Promise<ProductResponse>;
  getById(id: string): Promise<Product>;
  search(query: string): Promise<ProductResponse>;
}

class ProductService implements IProductService {
  private baseUrl = "https://dummyjson.com/products";

  async getAll(limit = 10, skip = 0, sortBy?: string, order: 'asc' | 'desc' = 'asc'): Promise<ProductResponse> {
    // DummyJSON supports: /products?limit=10&skip=10&select=title,price&sortBy=price&order=asc
    const url = new URL(this.baseUrl);
    url.searchParams.set('limit', limit.toString());
    url.searchParams.set('skip', skip.toString());
    if (sortBy) {
      url.searchParams.set('sortBy', sortBy);
      url.searchParams.set('order', order);
    }

    const res = await fetch(url.toString());
    return res.json();
  }

  async search(query: string): Promise<ProductResponse> {
    const res = await fetch(`${this.baseUrl}/search?q=${query}`);
    return res.json(); 
  }

  async getById(id: string): Promise<Product> {
    const res = await fetch(`${this.baseUrl}/${id}`);
    if (!res.ok) throw new Error("Product not found");
    return res.json();
  }
}

export const productService = new ProductService();