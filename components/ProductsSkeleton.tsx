const ProductsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="border rounded-lg p-4 animate-pulse"
        >
          <div className="h-48 bg-gray-200 rounded mb-4" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-full mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
          <div className="flex space-x-2">
            <div className="h-10 bg-gray-200 rounded w-full" />
            <div className="h-10 bg-gray-200 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsSkeleton;
