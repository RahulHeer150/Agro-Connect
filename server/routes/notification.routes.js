const express = require("express");

const router = express.Router();

const {
  getMyNotifications,
  markNotificationRead,
  getUnreadCount,
} = require("../controllers/notification.controller");

// const authMiddleware = require(
//   "../middleware/authmiddleware"
// );

router.get("/my-notifications", getMyNotifications);

router.put("/:id/read", markNotificationRead);

router.get("/unread-count", getUnreadCount);

module.exports = router;
