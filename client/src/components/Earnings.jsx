import EarningsCard from "./EarningsCard";

const Earnings = () => {
  const earnings = [
    { label: "Today", amount: 1200 },
    { label: "This Month", amount: 18200 },
    { label: "Total", amount: 96000 },
  ];
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Earnings</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {earnings.map((e, i) => (
          <EarningsCard key={i} {...e} />
        ))}
      </div>
    </div>
  );
};

export default Earnings;
