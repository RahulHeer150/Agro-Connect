const FilterSidebar = ({ filters, setFilters }) => {

  const toggleCategory = (category) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  return (
    <aside className="bg-white p-6 rounded-xl shadow-sm h-fit">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button
          onClick={() =>
            setFilters({ categories: [], price: null, distance: null })
          }
          className="text-sm text-green-700 hover:underline"
        >
          Clear all
        </button>
      </div>

      {/* CATEGORY */}
      <div className="mb-8">
        <h4 className="font-medium mb-3">Category</h4>
        {["Vegetables", "Fruits", "Grains", "Pulses", "Organic"].map((cat) => (
          <label key={cat} className="flex gap-2 text-sm mb-2">
            <input
              type="checkbox"
              checked={filters.categories.includes(cat)}
              onChange={() => toggleCategory(cat)}
              className="accent-green-700"
            />
            {cat}
          </label>
        ))}
      </div>

      {/* PRICE */}
      <div className="mb-8">
        <h4 className="font-medium mb-3">Price Range</h4>
        {["low", "mid", "high"].map((range) => (
          <label key={range} className="flex gap-2 text-sm mb-2">
            <input
              type="radio"
              name="price"
              checked={filters.price === range}
              onChange={() =>
                setFilters((prev) => ({ ...prev, price: range }))
              }
              className="accent-green-700"
            />
            {range === "low" && "Under ₹30 / kg"}
            {range === "mid" && "₹30 – ₹50 / kg"}
            {range === "high" && "Above ₹50 / kg"}
          </label>
        ))}
      </div>

      {/* DISTANCE */}
      <div>
        <h4 className="font-medium mb-3">Distance</h4>
        <select
          value={filters.distance || ""}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, distance: e.target.value }))
          }
          className="w-full border rounded px-3 py-2 text-sm"
        >
          <option value="">Any</option>
          <option value="5">Within 5 km</option>
          <option value="10">Within 10 km</option>
          <option value="20">Within 20 km</option>
        </select>
      </div>

    </aside>
  );
};

export default FilterSidebar;
