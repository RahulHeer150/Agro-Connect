import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  getBuyers,
  getBuyerById,
  toggleBuyerStatus,
  deleteBuyer,
} from "../services/buyerService";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const Buyers = () => {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchterm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = async () => {
    try {
      const data = await getBuyers();

      setBuyers(data.buyers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await toggleBuyerStatus(id);
      fetchBuyers();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleBuyerDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure You want to delete this Buyer???",
    );

    if (!confirmDelete) return;

    try {
      await deleteBuyer(id);

      fetchBuyers();

      alert("farmer deleted Successfully..");
    } catch (error) {
      console.error(error.message);
    }
  };

  const filteredBuyers = buyers.filter(
    (buyer) =>
      buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      buyer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return <Loader size="large" />;
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Buyer Management</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Buyer by name or email"
          value={searchTerm}
          onChange={(e) => setSearchterm(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Status</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBuyers.map((buyer) => (
              <tr key={buyer._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{buyer.name}</td>

                <td className="p-4">{buyer.email}</td>

                <td className="p-4">{buyer.phone}</td>

                <td className="p-4">{buyer.buyerDetails?.address || "N/A"}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full textbuyer
                      buyer.isBlocked
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {buyer.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/buyers/${buyer._id}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleToggleStatus(buyer._id)}
                      className={`px-3 py-1 rounded text-white ${
                        buyer.isBlocked ? "bg-green-600" : "bg-yellow-500"
                      }`}
                    >
                      {buyer.isBlocked ? "Activate" : "Suspend"}
                    </button>
                    <button
                      onClick={() => handleBuyerDelete(buyer._id)}
                      className="bg-red-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};










export default Buyers;
