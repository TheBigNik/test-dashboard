import { ProductRepository } from "@/repositories/ProductRepository";
import { ProductChart } from "@/features/products/ProductChart";
import { ProductViewTracker } from "@/features/products/ProductViewTracker";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const repo = new ProductRepository();

  try {
    const product = await repo.getProductById(id);
    if (!product) notFound();

    return (
      <main className="p-8 max-w-6xl mx-auto bg-background min-h-screen transition-colors duration-300">
        <ProductViewTracker product={product} />

        <Link
          href="/products"
          className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center gap-2 mb-6 group transition-colors"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Back to Inventory
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm sticky top-24">
              <div className="aspect-square w-full bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center p-6">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="max-w-full max-h-full w-auto h-auto object-contain drop-shadow-xl"
                />
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h1
                    className="text-2xl font-black leading-tight"
                    style={{ color: "var(--foreground, #0f172a)" }}
                  >
                    {product.title}
                  </h1>
                  <span className="inline-block px-2 py-1 mt-2 text-[10px] font-bold uppercase tracking-widest bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded">
                    {product.category}
                  </span>
                </div>

                <p className="text-slate-700 dark:text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                  {product.description}
                </p>

                <div className="pt-6 border-t border-border flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                      Price
                    </p>
                    <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                      ${product.price}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                      Rating
                    </p>
                    <span className="text-lg font-bold text-yellow-600 dark:text-yellow-500">
                      ★ {product.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2
                  className="text-xl font-black"
                  style={{ color: "var(--foreground, #0f172a)" }}
                >
                  Market Performance
                </h2>
                <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-border">
                  DATA_REF: {id}
                </span>
              </div>
              <ProductChart />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-indigo-600 p-6 rounded-2xl text-white flex flex-col justify-center min-h-[120px]">
                <p className="text-indigo-100 text-[10px] font-bold uppercase tracking-widest mb-1 opacity-80">
                  Stock Status
                </p>
                <p className="text-2xl font-black italic">
                  {product.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
                </p>
                <p className="text-indigo-200 text-xs mt-1 font-medium">
                  {product.stock} units currently logged
                </p>
              </div>

              <div className="bg-card border border-border p-6 rounded-2xl flex flex-col justify-center min-h-[120px] overflow-hidden">
                <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                  Brand Identity
                </p>
                <p
                  className="text-2xl font-black truncate uppercase tracking-tight"
                  style={{ color: "var(--foreground, #0f172a)" }}
                  title={product.brand}
                >
                  {product.brand || "Generic"}
                </p>
                <p className="text-slate-500 dark:text-slate-500 text-xs mt-1 font-medium">
                  Verified Manufacturer
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    notFound();
  }
}
