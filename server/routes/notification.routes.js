const express = require("express");

const router = express.Router();

const {
  getMyNotifications,
  markNotificationRead,
  getUnreadCount,
} = require(
  "../controllers/notificationController"
);

const authMiddleware = require(
  "../middleware/authmiddleware"
);

router.get(
  "/my-notifications",
  authMiddleware,
  getMyNotifications
);

router.put(
  "/:id/read",
  authMiddleware,
  markNotificationRead
);

router.get(
  "/unread-count",
  authMiddleware,
  getUnreadCount
);

module.exports = router;