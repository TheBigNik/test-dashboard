import { ProductRepository } from "@/repositories/ProductRepository";
import { ProductFilters } from "@/features/products/ProductFilters";
import { Pagination } from "@/app/products/Pagination";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ q?: string; page?: string; sort?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const repo = new ProductRepository();
  const { items, total } = await repo.getDashboardData(params);

  return (
    <main className="p-8 max-w-7xl mx-auto bg-background text-foreground transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-8 tracking-tight text-slate-900 dark:text-white">
        Product Inventory
      </h1>

      <ProductFilters />

      <div className="overflow-hidden rounded-xl border border-border shadow-sm bg-card transition-colors duration-300">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-slate-100 dark:bg-slate-800/80">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.length > 0 ? (
              items.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-900 dark:text-slate-700">
                    {product.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-700 dark:text-slate-400 capitalize">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-indigo-700 dark:text-indigo-400">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Link
                      href={`/products/${product.id}`}
                      className="inline-flex items-center px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white dark:text-slate-950 rounded-lg text-sm font-bold hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-all shadow-md shadow-indigo-200 dark:shadow-none active:scale-95"
                    >
                      View Analytics
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-slate-600 dark:text-slate-400 font-medium"
                >
                  No products found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <Pagination totalItems={total} />
      </div>
    </main>
  );
}
