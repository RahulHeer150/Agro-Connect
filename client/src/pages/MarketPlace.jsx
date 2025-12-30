import { useState } from "react";
import FilterSidebar from "../components/FilterSidebar";
import ProductGrid from "../components/ProductGrid";

const Marketplace = () => {
  const [filters, setFilters] = useState({
    categories: [],
    price: null,
    distance: null,
  });

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
          <p className="text-gray-600">
            Fresh produce directly from local farmers
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <FilterSidebar filters={filters} setFilters={setFilters} />
          <ProductGrid filters={filters} />
        </div>

      </div>
    </section>
  );
};

export default Marketplace;
