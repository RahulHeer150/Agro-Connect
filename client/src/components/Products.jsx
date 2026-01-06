import ProductTable from "./ProductTable";
import EmptyState from "./EmptyState";

const Products = () => {
  const products = [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">My Products</h1>
      {products.length === 0 ? (
        <EmptyState message="No products added yet." />
      ) : (
        <ProductTable products={products} />
      )}
    </div>
  );
};

export default Products;
