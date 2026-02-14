import {
  FaLeaf,
  FaMapMarkerAlt,
  FaBalanceScale,
  FaShieldAlt,
} from "react-icons/fa";
import { MotionSection, MotionItem } from "./common/MotionSection";

const benefits = [
  {
    icon: <FaLeaf />,
    title: "Fresh From Farms",
    desc: "Produce sourced directly from nearby farms, harvested recently.",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Local Discovery",
    desc: "Find trusted farmers near your location with ease.",
  },
  
  {
    icon: <FaBalanceScale />,
    title: "Fair & Transparent Pricing",
    desc: "Prices are set by farmers—no hidden charges or commissions.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Verified Farmers",
    desc: "All farmers are verified to ensure quality and reliability.",
  },
];

const BuyerBenefits = () => {
  return (
    <MotionSection className="bg-green-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <MotionItem className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Buyers Choose AgroConnect
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fresh produce, fair pricing, and trusted farmers — all in one place.
          </p>
        </MotionItem>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => (
            <MotionItem
              key={i}
              className="bg-white p-6 rounded-xl text-center shadow-sm
                         hover:shadow-md transition hover:-translate-y-1"
            >
              <div
                className="w-14 h-14 mx-auto mb-4 flex items-center justify-center
                              rounded-full bg-green-100 text-green-700 text-2xl"
              >
                {b.icon}
              </div>

              <h3 className="font-semibold text-lg mb-2">{b.title}</h3>

              <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
            </MotionItem>
          ))}
                </div>

        {/* Trust Strip */}
        <MotionItem className="mt-14 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <span>✔ Verified Farmers</span>
          <span>✔ No Hidden Charges</span>
          <span>✔ Fresh & Local Produce</span>
        </MotionItem>

        {/* Soft CTA */}
        <MotionItem className="mt-10 text-center">
          <button className="text-green-700 font-semibold hover:underline">
            Explore fresh produce →
          </button>
        </MotionItem>
      </div>
    </MotionSection>
  );
};


export default BuyerBenefits;
