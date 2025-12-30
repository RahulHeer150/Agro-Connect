import ProductCard from "./ProductCard";

const products = [
  {
    name: "Tomatoes",
    price: 40,
    category: "Vegetables",
    farmer: "Ramesh Kumar",
  },
  {
    name: "Potatoes",
    price: 30,
    category: "Vegetables",
    farmer: "Suresh Patil",
  },
  {
    name: "Wheat",
    price: 55,
    category: "Grains",
    farmer: "Mahesh Yadav",
  },
  {
    name: "Apples",
    price: 80,
    category: "Fruits",
    farmer: "Amit Sharma",
  },
];

const ProductGrid = ({ filters }) => {
  const filteredProducts = products.filter((p) => {
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(p.category)
    ) {
      return false;
    }

    if (filters.price === "low" && p.price >= 30) return false;
    if (filters.price === "mid" && (p.price < 30 || p.price > 50)) return false;
    if (filters.price === "high" && p.price <= 50) return false;

    return true;
  });

  return (
    <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((p, index) => (
          <ProductCard key={index} product={p} />
        ))
      ) : (
        <p className="text-gray-500 col-span-full">
          No products found.
        </p>
      )}
    </div>
  );
};

export default ProductGrid;
