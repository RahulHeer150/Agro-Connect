import { motion } from "framer-motion";
import {
  FaBan,
  FaBalanceScale,
  FaMapMarkerAlt,
  FaTractor,
} from "react-icons/fa";

const benefits = [
  {
    icon: <FaBan />,
    title: "No Middlemen",
    description:
      "Farmers sell directly to buyers without commission cuts.",
  },
  {
    icon: <FaBalanceScale />,
    title: "Fair Pricing",
    description:
      "Transparent prices set by farmers themselves.",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Local & Fresh",
    description:
      "Freshly harvested produce from nearby farms.",
  },
  {
    icon: <FaTractor />,
    title: "Farmer-First Platform",
    description:
      "Simple, mobile-friendly tools designed for farmers.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const WhyAgroConnect = () => {
  return (
    <section className="w-full bg-green-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
            Why Choose AgroConnect?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Built for farmers. Trusted by buyers.
          </p>
        </motion.div>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition"
            >
              <div className="text-green-700 text-3xl md:text-4xl mb-4 flex justify-center">
                {item.icon}
              </div>

              <h3 className="text-base md:text-lg font-semibold mb-2">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAgroConnect;