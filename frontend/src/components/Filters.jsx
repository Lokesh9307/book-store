export default function Filters({ filters, setFilters, onApply, layout }) {
  return (
    <div
      className={`space-y-4 lg:space-y-0 ${
        layout === "horizontal"
          ? "flex flex-col lg:flex-row lg:flex-wrap lg:gap-4 lg:items-end"
          : ""
      }`}
    >
      <div className="bg-black text-white">
        <label className="block text-sm font-medium">Rating</label>
        <select
          value={filters.rating}
          onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
          className="border-1 border-white/50 rounded px-3 py-2 w-full lg:w-40 bg-gray-900 text-white"
        >
          <option value="">All Ratings</option>
          <option value="One">⭐ 1</option>
          <option value="Two">⭐ 2</option>
          <option value="Three">⭐ 3</option>
          <option value="Four">⭐ 4</option>
          <option value="Five">⭐ 5</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Stock</label>
        <select
          value={filters.inStock}
          onChange={(e) => setFilters({ ...filters, inStock: e.target.value })}
          className="border-1 border-white/50 rounded px-3 py-2 w-full lg:w-40 bg-black text-white"
        >
          <option value="">Any</option>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>
      </div>

      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          className="border-1 border-white/50 rounded px-3 py-2 w-1/2 lg:w-28"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          className="border-1 border-white/50 rounded px-3 py-2 w-1/2 lg:w-28"
        />
      </div>

      {/* <button
        onClick={onApply}
        className="bg-white text-indigo-800 px-4 py-2 rounded hover:scale-105 hover:font-semibold transition w-full lg:w-auto"
      >
        Apply
      </button> */}
    </div>
  );
}
