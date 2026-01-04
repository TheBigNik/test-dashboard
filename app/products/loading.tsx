export default function Loading() {
  return (
    <main className="p-8 max-w-7xl mx-auto">
      <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mb-6" />
      <div className="flex gap-4 mb-6">
        <div className="h-10 w-72 bg-gray-100 animate-pulse rounded" />
        <div className="h-10 w-32 bg-gray-100 animate-pulse rounded" />
      </div>
      <div className="border rounded-lg overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 border-b bg-gray-50/50 animate-pulse" />
        ))}
      </div>
    </main>
  );
}