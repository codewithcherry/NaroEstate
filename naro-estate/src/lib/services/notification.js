import connect from "../mongoDb/database";
import Notification from "../models/notification.model";

const createNotification = async (notificationData) => {
    try {
      // Connect to the database
      await connect();
  
      // Create a new notification instance
      const newNotification = new Notification({
        title: notificationData.title,
        message: notificationData.message,
        type: notificationData.type,
        sender: {
          name: notificationData.sender.name,
          avatar: notificationData.sender.avatar,
        },
        recipient: notificationData.recipient,
      });
  
      // Save the notification to the database
      await newNotification.save();
  
      // Return the created notification
      return newNotification;
    } catch (error) {
      console.error("Error creating notification:", error);
      throw new Error("Failed to create notification");
    }
  };
  
  export default createNotification;