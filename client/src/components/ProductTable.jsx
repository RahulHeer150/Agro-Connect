const ProductTable = ({ products }) => {
  if (!products.length) {
    return <p className="text-gray-500">No products found.</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Crop</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="p-4 font-medium">{p.name}</td>
              <td>₹{p.price}/kg</td>
              <td>{p.quantity}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    p.status === "available"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {p.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
