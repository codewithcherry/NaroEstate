import connect from "../mongoDb/database";
import Notification from "../models/notification.model";

const createNotification = async (notificationData) => {
    try {
      // Connect to the database
      await connectDB();
  
      // Create a new notification instance
      const newNotification = new Notification({
        title: notificationData.title,
        message: notificationData.message,
        type: notificationData.type,
        sender: {
          name: notificationData.sender.name,
          avatar: notificationData.sender.avatar,
          userId: notificationData.sender.userId,
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