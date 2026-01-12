import { useState } from "react";
import FilterSidebar from "../components/FilterSidebar";
import ProductGrid from "../components/ProductGrid";

const Marketplace = () => {
  const [filters, setFilters] = useState({
    categories: [],
    price: null,
    distance: null,
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <p className="text-gray-600">
            Fresh produce directly from local farmers
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="border border-green-700 text-green-700 px-4 py-2 rounded-lg"
          >
            Filters
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Product Grid */}
          <ProductGrid filters={filters} />
        </div>

        {/* Mobile Drawer */}
        {isDrawerOpen && (
          <div className="fixed inset-0 bg-black/40 z-40">
            <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Filters</h3>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-gray-500"
                >
                  ✕
                </button>
              </div>
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Marketplace;
