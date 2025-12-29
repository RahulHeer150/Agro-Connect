const HexJourney = ({ title, items }) => {
  return (
    <section className="py-20 px-6 md:px-16 bg-[#fdf6ec] text-center">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-semibold text-[#355f2e] mb-16">
        {title}
      </h2>

      {/* Hex Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 place-items-center">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Hexagon Image */}
            <div
              className="
                w-44 h-40 overflow-hidden mb-6
                [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]
              "
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Label */}
            <h4 className="text-[#e07a2d] font-semibold mb-2">
              {item.label}
            </h4>

            {/* Description */}
            <p className="text-sm text-gray-600 max-w-[220px]">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HexJourney;
