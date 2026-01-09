import React from "react";

const OrderTable = ({ orders }) => {
  if (!orders.length) {
    return <p className="text-gray-500">No orders yet.</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Order</th>
            <th>Buyer</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="border-t">
              <td className="p-4 font-medium">#{o._id.slice(-6)}</td>
              <td>{o.buyer?.name || "Buyer"}</td>
              <td>₹{o.totalAmount}</td>
              <td className="text-green-700 font-medium">{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
