const axios = require("axios");

const sendSMS = async (phone, message) => {
  try {
    await axios.post(
      "https://control.msg91.com/api/v5/flow/",
      {
        flow_id: process.env.MSG91_FLOW_ID,
        sender: "AGROCO",
        mobiles: `91${phone}`,
        message: message,
      },

    
      {
        headers: {
          authkey: process.env.MSG91_AUTH_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("SMS sent successfully");
  } catch (error) {
    console.error("SMS error:", error.message);
  }
};

module.exports = sendSMS;