export const calculateProfileCompletion = (user) => {
  if (!user) return 0; // ✅ prevent crash

  let total = 0;
  let filled = 0;

  const commonFields = ["name", "email", "phone"];
  total += commonFields.length;

  commonFields.forEach((field) => {
    if (user?.[field]) filled++;
  });

  if (user.role === "farmer") {
    const farmerFields = [
      user?.farmDetails?.farmName,
      user?.farmDetails?.location?.state,
      user?.farmDetails?.location?.district,
      user?.farmDetails?.location?.village,
      user?.farmDetails?.farmSize,
      user?.farmDetails?.cropsGrown?.length > 0,
    ];

    total += farmerFields.length;

    farmerFields.forEach((field) => {
      if (field) filled++;
    });
  }

  if (user.role === "buyer") {
    const buyerFields = [
      user?.buyerDetails?.businessName,
      user?.buyerDetails?.address,
    ];

    total += buyerFields.length;

    buyerFields.forEach((field) => {
      if (field) filled++;
    });
  }

  return Math.round((filled / total) * 100);
};