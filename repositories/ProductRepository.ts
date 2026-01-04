import { productService } from "@/services/ProductService";
import { Product } from "@/models/Products";

export class ProductRepository {

  async getDashboardData(params: { q?: string; page?: string; sort?: string }): Promise<{ items: Product[], total: number }> {
    const skip = (Number(params.page || 1) - 1) * 10;
    const [sortField, sortOrder] = (params.sort || "").split("-");

    if (params.q) {
      const data = await productService.search(params.q);
      
      if (sortField === 'price') {
        data.products.sort((a, b) => 
          sortOrder === 'asc' ? a.price - b.price : b.price - a.price
        );
      }
      return { items: data.products, total: data.total };
    }

    const data = await productService.getAll(10, skip, sortField, sortOrder as 'asc' | 'desc');
    return { items: data.products, total: data.total };
  }

  async getProductById(id: string): Promise<Product> {
    return await productService.getById(id);
  }
}

export const productRepo = new ProductRepository();