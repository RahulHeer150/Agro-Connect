import { motion } from "framer-motion";
import {
  FaSeedling,
  FaShoppingBasket,
  FaHandshake,
} from "react-icons/fa";

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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const HowItWorks = () => {
  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          How AgroConnect Works
        </motion.h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-sm md:text-base">
          A simple, transparent process for farmers and buyers.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center px-4"
            >
              <div className="text-green-700 text-4xl md:text-5xl mb-5 flex justify-center">
                {step.icon}
              </div>

              <h3 className="text-lg md:text-xl font-semibold mb-2">
                {step.title}
              </h3>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;