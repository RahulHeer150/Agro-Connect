import { useState } from "react";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Add Product</h1>

      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded-xl shadow-sm max-w-xl space-y-4"
      >
        <input
          placeholder="Crop Name"
          className="w-full border px-4 py-2 rounded"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <input
          placeholder="Price per kg"
          className="w-full border px-4 py-2 rounded"
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />
        <input
          placeholder="Quantity"
          className="w-full border px-4 py-2 rounded"
          onChange={(e) =>
            setForm({ ...form, quantity: e.target.value })
          }
        />
        <input
          placeholder="Category"
          className="w-full border px-4 py-2 rounded"
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <button className="bg-green-700 text-white px-6 py-2 rounded-lg">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
