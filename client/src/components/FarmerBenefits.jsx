import { motion } from "framer-motion";
import farmer1 from "../assets/farmer-section1.jpg"
import farmer2 from "../assets/farmer-section2.jpeg"
import farmer3 from "../assets/farmer-section3.jpg"
import farmer4 from "../assets/farmer-section4.jpg"


const farmerBenefits = [
  {
    title: "Fair Pricing",
    description: "Sell your produce at prices you truly deserve without middlemen.",
    image: farmer1,
  },
  {
    title: "Direct Buyers",
    description: "Connect directly with verified buyers across regions.",
    image: farmer2,
  },
  {
    title: "Secure Payments",
    description: "Receive timely and secure digital payments with full transparency.",
    image: farmer3,
  },
  {
    title: "Wider Market Reach",
    description: "Expand beyond local markets and reach more buyers digitally.",
    image: farmer4,
  },
];

/* Container animation */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

/* Card animation */
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function FarmerBenefits() {
  return (
    <motion.section
      className="py-20 px-6 md:px-16 bg-[#fdf6ec] text-center"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Section Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-semibold text-[#355f2e] mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        How AgroConnect Empowers Farmers
      </motion.h2>

      {/* Benefits Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 place-items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {farmerBenefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            {/* Hexagon Image */}
            <div
              className="
                w-44 h-40 mb-6 overflow-hidden
                [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]
              "
            >
              <img
                src={benefit.image}
                alt={benefit.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title */}
            <h4 className="text-[#e07a2d] font-semibold mb-2">
              {benefit.title}
            </h4>

            {/* Description */}
            <p className="text-sm text-gray-600 max-w-[220px]">
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
