import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getAllFarmers, toggleFarmerStatus, deleteFarmer } from "../services/farmerService";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const Farmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchterm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const data = await getAllFarmers();

      setFarmers(data.farmers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await toggleFarmerStatus(id);
      fetchFarmers();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleFarmerDelete=async(id)=>{
    const confirmDelete= window.confirm(
        "Are you sure You want to delete this farmer???"
      )

      if(!confirmDelete) return;

    try {
      
      await deleteFarmer(id);

      fetchFarmers();

      alert('farmer deleted Successfully..')
      
      
    } catch (error) {

      console.error(error.message);
      
    }
  }

  const filteredFarmers = farmers.filter(
    (farmer) =>
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return <Loader size="large" />;
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Farmer Management</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search farmer by name or email"
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
              <th className="p-4 text-left">Farm</th>
              <th className="p-4 text-left">Status</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFarmers.map((farmer) => (
              <tr key={farmer._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{farmer.name}</td>

                <td className="p-4">{farmer.email}</td>

                <td className="p-4">{farmer.phone}</td>

                <td className="p-4">{farmer.farmDetails?.farmName || "N/A"}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      farmer.isBlocked
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {farmer.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/farmers/${farmer._id}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleToggleStatus(farmer._id)}
                      className={`px-3 py-1 rounded text-white ${
                        farmer.isBlocked ? "bg-green-600" : "bg-yellow-500"
                      }`}
                    >
                      {farmer.isBlocked ? "Activate" : "Suspend"}
                    </button>
                    <button
                    onClick={()=>handleFarmerDelete(farmer._id)}
                    className="bg-red-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
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

export default Farmers;
