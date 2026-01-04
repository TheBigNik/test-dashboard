'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateUrl = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value); else params.delete(key);
    if (key !== 'page') params.set('page', '1');
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex gap-4 bg-card p-4 rounded-xl shadow-sm border border-border mb-6 transition-colors duration-300">
      <input
        className="bg-background border border-border p-2 rounded-lg flex-1 text-foreground placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Search inventory..."
        defaultValue={searchParams.get('q') ?? ''}
        onChange={(e) => updateUrl('q', e.target.value)}
      />
      <select 
        className="bg-background border border-border p-2 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
        defaultValue={searchParams.get('sort') ?? ''}
        onChange={(e) => updateUrl('sort', e.target.value)}
      >
        <option value="">Sort By...</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}