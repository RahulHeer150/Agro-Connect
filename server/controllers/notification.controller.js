const notificationModel = require("../models/notification.model");
const Notification = require("../models/notification.model");

exports.getMyNotifications = async (req, res) => {
  try {
    const notification = await Notification.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.markNotificationRead = async (req, res) => {
  try {
    const notifiction = await Notification.findById(req.params.id);

    if (!notifiction) {
      return res.status(404).json({
        success: false,
        message: "notificaton not found!!!",
      });
    }
    notifiction.isRead = true;

    await notification.save();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
    });
  }
};

exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      user: req.user.id,
      isRead: false,
    });
    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
    });
  }
};
