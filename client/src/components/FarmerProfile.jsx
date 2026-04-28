import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MiniMap from "../components/MiniMap";
import Loader from "../components/Loader";

const FarmerProfile = () => {
  const { id } = useParams();

  const [farmer, setFarmer] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/farmer/${id}`);
      setFarmer(res.data.farmer);
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [id]);

const getImageUrl = (product) => {
  const image = product.images?.[0];
  const img = image?.url || image;

  if (!img) return "https://via.placeholder.com/300";

  return img.startsWith("http")
    ? img
    : `http://localhost:5000${img}`;
};

  if (loading) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader size="large" />
    </div>
  );
}

  return (
    <div className="min-h-screen bg-black text-white p-6 mt-15">

      {/* 🔥 PROFILE HEADER */}
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center gap-6 mb-6">

          <img
            src={farmer.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            className="w-24 h-24 rounded-full border-2 border-green-500"
          />

          <div>
            <h1 className="text-3xl font-bold text-green-400">
              {farmer.name}
            </h1>

            <p className="text-gray-400">
              {farmer.farmDetails?.farmName}
            </p>

            <p className="mt-1">
              📍 {farmer.farmDetails?.location?.village},{" "}
              {farmer.farmDetails?.location?.district},{" "}
              {farmer.farmDetails?.location?.state}
            </p>
          </div>
        </div>

        {/* 🗺️ MINI MAP */}
        {farmer.location && (
          <div className="h-[250px] rounded-xl overflow-hidden mb-6">
            <MiniMap
              lat={farmer.location.coordinates[1]}
              lng={farmer.location.coordinates[0]}
            />
          </div>
        )}

        {/* 🔥 PRODUCTS GRID (INSTAGRAM STYLE) */}
        <h2 className="text-xl mb-4 text-green-400">Products 🌾</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  {products.map((product) => (
    <div
      key={product._id}
     onClick={() => navigate(`/product/${product._id}`)}
      className="bg-white/10 rounded-xl overflow-hidden hover:scale-105 transition"
    >
      <img
        src={getImageUrl(product)}
        alt={product.name}
        className="w-full h-40 object-cover"
      />

      <div className="p-2">
        <p className="font-semibold">{product.name}</p>
        <p className="text-green-400">₹{product.price}</p>
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default FarmerProfile;