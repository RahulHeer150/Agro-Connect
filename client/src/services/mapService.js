import axios from "axios";

export const getNearbyFarmers = async (lat, lng, distance) => {
  const res = await axios.get("/api/map/nearby", {
    params: { lat, lng, distance },
  });

  console.log("Full API response:", res.data); // 🔍 debug

  // Handle both array response and { data: [] } response
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data.data)) return res.data.data;

  return [];
};