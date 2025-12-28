import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HeroSection = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  const handlePrimaryCTA = () => {
    navigate("/marketplace");
  };

  const handleSecondaryCTA = () => {
    if (!isLoggedIn) {
      navigate("/register");
    } else if (user?.role === "farmer") {
      navigate("/farmer/dashboard");
    }
  };

  return (
    <section className="bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
        
        {/* LEFT CONTENT */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            From Farmers to Your Home  
            <span className="text-green-700"> — Fair & Fresh</span>
          </h1>

          <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto md:mx-0">
            AgroConnect connects farmers directly with buyers, eliminating
            middlemen and ensuring fair prices, fresh produce, and local trust.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={handlePrimaryCTA}
              className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold
                         hover:bg-green-800 transition"
            >
              Explore Marketplace
            </button>

            <button
              onClick={handleSecondaryCTA}
              className="border border-green-700 text-green-700 px-6 py-3 rounded-lg font-semibold
                         hover:bg-green-50 transition"
            >
              Become a Farmer
            </button>
          </div>

          {/* TRUST STATS */}
          <div className="flex justify-center md:justify-start gap-8 mt-10 text-sm text-gray-600">
            <div>
              <p className="text-xl font-bold text-green-700">100%</p>
              <p>Direct Trade</p>
            </div>
            <div>
              <p className="text-xl font-bold text-green-700">0</p>
              <p>Middlemen</p>
            </div>
            <div>
              <p className="text-xl font-bold text-green-700">Fresh</p>
              <p>Local Produce</p>
            </div>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="flex-1">
          <img
            src="/hero-farmer.png"
            alt="Farmer selling fresh produce"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
