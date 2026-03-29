import { useEffect, useState } from "react";
import FilterSidebar from "../components/FilterSidebar";
import ProductGrid from "../components/ProductGrid";
import { getAllProducts } from "../api/productApi";
import Loader from "../components/Loader";

const Marketplace = () => {
  const [filters, setFilters] = useState({
    categories: [],
    price: null,
  });

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        console.log(data);
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    let updated = [...products];

    if (filters.categories.length > 0) {
      updated = updated.filter((p) =>
        filters.categories.includes(p.category)
      );
    }

    if (filters.price) {
      updated = updated.filter((p) => p.price <= filters.price);
    }

    setFilteredProducts(updated);
  }, [filters, products]);

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
          
          {/* Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3 items-center">
            {loading ? (
              <Loader size="large"/>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <ProductGrid products={filteredProducts} />
            )}
          </div>
        </div>

        {/* Mobile Drawer */}
        {isDrawerOpen && (
          <div className="fixed inset-0 bg-black/40 z-40">
            <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 shadow-lg">
              <div className="flex justify-between mb-4">
                <h3 className="font-semibold">Filters</h3>
                <button onClick={() => setIsDrawerOpen(false)}>✕</button>
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