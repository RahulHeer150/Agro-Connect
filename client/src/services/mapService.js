import axios from "axios";

export const getNearbyFarmers = async (lat, lng, distance) => {
  const res = await axios.get("/api/map/nearby", {
    params: { lat, lng, distance },
  });

  return res.data.data; // ✅ IMPORTANT (return array only)
};