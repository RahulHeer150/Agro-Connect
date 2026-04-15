const sendEmail= require('./emailService');

// Notification service to send notifications to users

const notifyFarmerNewOrder= async(order)=>{
    const farmerEmail=order.farmer.email;

    const subject='New Order Received';
    const message=`You have received a new order from ${order.buyer.name} for ${order.quantity} units of ${order.product.name}. Please check your dashboard for more details.`;

     const html = `
    <h2>New Order Received!</h2>
    <p>You have received a new order.</p>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
  `;

    await sendEmail(farmerEmail, subject, message, html);

};

const notifyBuyerOrderStatus= async(order)=>{
    const buyerEmail=order.buyer.email;

    const subject='Order Status Update';

    const html=`
     <h2>Your order is ready 🚚</h2>
    <p>Your order is packed and ready for shipping.</p>
    <p><strong>Order ID:</strong> ${order._id}</p>
    `;

    await sendEmail(buyerEmail, subject, html);

};

const notifyBuyerShipped= async(order) =>{

    const subject = "Order Shipped";

    const html=`
    <h2>Your order has been shipped 🎉</h2>
    <p>Your order is on the way.</p>
    <p><strong>Order ID:</strong> ${order._id}</p>
    `

    await sendEmail(buyerEmail, subject, html)
};

module.exports={
    notifyBuyerShipped,
    notifyBuyerOrderStatus,
    notifyFarmerNewOrder
};