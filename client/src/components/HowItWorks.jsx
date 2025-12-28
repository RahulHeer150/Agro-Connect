import { FaSeedling, FaShoppingBasket, FaHandshake } from "react-icons/fa";

const steps = [
  {
    icon: <FaSeedling />,
    title: "Farmers List Crops",
    description:
      "Farmers add crops, set prices, and update availability directly.",
  },
  {
    icon: <FaShoppingBasket />,
    title: "Buyers Browse & Order",
    description:
      "Buyers discover fresh produce from nearby farmers and place orders.",
  },
  {
    icon: <FaHandshake />,
    title: "Direct & Fair Trade",
    description:
      "No middlemen. Farmers earn more and buyers pay fair prices.",
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          How AgroConnect Works
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-14">
          A simple, transparent process for farmers and buyers.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="text-green-700 text-5xl mb-6 flex justify-center">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;