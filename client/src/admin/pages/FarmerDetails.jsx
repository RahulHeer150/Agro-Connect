import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Loader from "../../components/Loader";
import MiniMap from "../../components/MiniMap";

import { getFarmerById } from "../services/farmerService";

const FarmerDetails = () => {
  const { id } = useParams();

  const [farmer, setFarmer] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFarmer();
  }, []);

  const fetchFarmer = async () => {
    try {
      const data = await getFarmerById(id);

      setFarmer(data.farmer);
      setProducts(data.products);
      console.log(farmer)

      console.log("API Response:", data);
console.log("Farmer:", data.farmer);
console.log("Products:", data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader size="large" />;
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex items-center gap-5">

          <img
            src={
              farmer.avatar
                ? farmer.avatar
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt={farmer.name}
            className="w-24 h-24 rounded-full border"
          />

          <div>
            <h1 className="text-3xl font-bold">
              {farmer.name}
            </h1>

            <p className="text-gray-600">
              {farmer.email}
            </p>

            <p className="text-gray-600">
              {farmer.phone}
            </p>
          </div>

        </div>
      </div>

      {/* Farm Details */}
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-semibold mb-5">
          Farm Details
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <p>
            <strong>Farm Name:</strong>{" "}
            {farmer.farmDetails?.farmName || "N/A"}
          </p>

          <p>
            <strong>Farm Size:</strong>{" "}
            {farmer.farmDetails?.farmSize || "N/A"}
          </p>

          <p>
            <strong>Village:</strong>{" "}
            {farmer.farmDetails?.location?.village || "N/A"}
          </p>

          <p>
            <strong>District:</strong>{" "}
            {farmer.farmDetails?.location?.district || "N/A"}
          </p>

          <p>
            <strong>State:</strong>{" "}
            {farmer.farmDetails?.location?.state || "N/A"}
          </p>

        </div>
      </div>

      {/* Map */}
      {farmer.location?.coordinates?.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-2xl font-semibold mb-5">
            Farm Location
          </h2>

          <MiniMap
            lat={farmer.location.coordinates[1]}
            lng={farmer.location.coordinates[0]}
          />

        </div>
      )}

      {/* Products */}
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-semibold mb-5">
          Uploaded Products
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

         {products.map((product) => {
  const image = product.images?.[0];

  const imagePath = image?.url || image;

  const imageUrl = imagePath
    ? imagePath.startsWith("http")
      ? imagePath
      : `https://agro-connect-8yjz.onrender.com${imagePath}`
    : "/placeholder.png";

  return (
    <div
      key={product._id}
      className="border rounded-xl overflow-hidden"
    >
      <img
        src={imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold">
          {product.name}
        </h3>

        <p className="text-green-600 font-bold">
          ₹{product.price}
        </p>

        <p className="text-gray-500 text-sm">
          Stock: {product.quantity}
        </p>
      </div>
    </div>
  );
})}

        </div>

      </div>

    </div>
  );
};

export default FarmerDetails;