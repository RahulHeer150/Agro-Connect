const sendEmail= require('../utils/emailService');

// Notification service to send notifications to users

const notifyFarmerNewOrder= async(order)=>{
    if (!order) return;

    const farmerEmail = order.farmer?.email;
    if (!farmerEmail) {
      console.warn("Cannot send farmer notification: missing farmer email for order", order._id);
      return;
    }

    const subject = 'New Order Received';
    const buyerName = order.buyer?.name || 'a buyer';
    const productName = order.items?.[0]?.product?.name || 'your product';
    const quantity = order.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;

    const message = `You have received a new order from ${buyerName} for ${quantity} units of ${productName}. Please check your dashboard for more details.`;

    const text = `New Order Received!\n
You have received a new order.\n
Order ID: ${order._id}\n
Total Amount: ₹${order.totalAmount}`;

    await sendEmail(farmerEmail, subject, message);
};

const notifyBuyerOrderStatus= async(order)=>{
    if (!order) return;

    const buyerEmail = order.buyer?.email;
    if (!buyerEmail) {
      console.warn("Cannot send buyer order status notification: missing buyer email for order", order._id);
      return;
    }

    const subject = 'Order Status Update';
    const message = `Your order is packed and ready for shipping. Order ID: ${order._id}`;

    await sendEmail(buyerEmail, subject, message);
};

const notifyBuyerShipped= async(order) =>{
    if (!order) return;

    const buyerEmail = order.buyer?.email;
    if (!buyerEmail) {
      console.warn("Cannot send shipped notification: missing buyer email for order", order._id);
      return;
    }

    const subject = "Order Shipped";
    const message = `Your order has been shipped. Order ID: ${order._id}`;

    await sendEmail(buyerEmail, subject, message);
};

module.exports={
    notifyBuyerShipped,
    notifyBuyerOrderStatus,
    notifyFarmerNewOrder
};