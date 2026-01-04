'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export function Pagination({ totalItems }: { totalItems: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(totalItems / 10);

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        disabled={currentPage <= 1}
        onClick={() => changePage(currentPage - 1)}
        className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-50"
      >
        Previous
      </button>
      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage >= totalPages}
        onClick={() => changePage(currentPage + 1)}
        className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-50"
      >
        Next
      </button>
    </div>
  );
}