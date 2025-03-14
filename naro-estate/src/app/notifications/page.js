'use client';

import NotificationCard from "@/components/react-components/notifications/NotificationCard";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input"; // shadcn UI Input
import { Button } from "@/components/ui/button"; // shadcn UI Button
import { Search, Check, Star, Trash, X } from "lucide-react"; // Added X icon
import { motion, AnimatePresence } from "framer-motion"; // For animations
import { TooltipProvider } from "@/components/ui/tooltip"; // Import TooltipProvider
import { formatTimestamp } from "@/lib/utils"; // Import timestamp utility
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // shadcn Dialog
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const notificationsData = [
  {
    id: "1",
    title: "New Message",
    message: "You have a new message from John.",
    timestamp: Date.now() - 3600000, // 1 hour ago
    isRead: false,
    isStarred: true,
    type: "message",
    sender: { name: "John Doe", avatar: "https://i.pravatar.cc/40?img=1" },
  },
  {
    id: "2",
    title: "System Update",
    message: "A new system update is available.",
    timestamp: Date.now() - 86400000 * 2, // 2 days ago
    isRead: true,
    isStarred: false,
    type: "alert",
    sender: { name: "System", avatar: "https://i.pravatar.cc/40?img=2" },
  },
  {
    id: "3",
    title: "Mention",
    message: "You were mentioned in a comment by Jane.",
    timestamp: Date.now() - 86400000 * 7, // 1 week ago
    isRead: false,
    isStarred: false,
    type: "mention",
    sender: { name: "Jane Smith", avatar: "https://i.pravatar.cc/40?img=3" },
  },
  // Add more notifications here
];

const NotificationPage = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const [loading,setLoading]=useState(false);

  const {toast}=useToast();
  

  const fetchNotifications=async () => {

    setLoading(true);
    
    try {
        
        const response=await axios.get('/api/user/notifications',{
            headers:{
                "Content-Type":'application/json',
            }
        })
        const data=response.data;
        setNotifications(data.data)
        console.log(data)
    } catch (error) {
        console.log('error',error)
    }
    finally{
        setLoading(false)
    }
  }

 

  // Detect if the device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    checkIsMobile(); // Check on initial render
    window.addEventListener("resize", checkIsMobile); // Check on window resize

    fetchNotifications();

    return () => {
      window.removeEventListener("resize", checkIsMobile); // Cleanup
    };
  }, []);

  const handleMarkRead = async (id,flag) => {
    try {
      // Make a PATCH request to update the notification
      const response = await axios.patch(
        "/api/user/update-notification", // Your PATCH route
        {
          NotificationId: id, // Pass the notification ID
          updatedNotification: {
            isRead: flag, // Set isRead to true (or toggle it if needed)
          },
        },
      );
  
      // Handle the response
      if (response.data.type === "success") {
        // Update the local state for the specific notification
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? { ...n, isRead: flag } : n))
        );

        toast({
            title:response.data.type,
            description:response.data.message,
        })
      } else {
        console.error("Failed to update notification:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating notification:", error);
      toast({
        title:error.response.data.type,
        description:error.response.data.message,
        variant:'destructive'
      })
    }
  };

  const handleStar =async (id,flag) => {
    try {
      // Make a PATCH request to update the notification
      const response = await axios.patch(
        "/api/user/update-notification", // Your PATCH route
        {
          NotificationId: id, // Pass the notification ID
          updatedNotification: {
            isStarred: flag, // Set isRead to true (or toggle it if needed)
          },
        },
      );
  
      // Handle the response
      if (response.data.type === "success") {
        // Update the local state for the specific notification
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? { ...n, isStarred: flag } : n))
        );

        toast({
            title:response.data.type,
            description:response.data.message,
        })
      } else {
        console.error("Failed to update notification:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating notification:", error);
      toast({
        title:error.response.data.type,
        description:error.response.data.message,
        variant:'destructive'
      })
    }
  }; 
  


  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    if (selectedNotification === id) {
      setSelectedNotification(null); // Clear preview if the deleted notification is selected
    }
  };

  const handleSelectNotification = async(id) => {
    try {
        // Make a PATCH request to update the notification
        const response = await axios.patch(
          "/api/user/update-notification", // Your PATCH route
          {
            NotificationId: id, // Pass the notification ID
            updatedNotification: {
              isRead: true, // Set isRead to true (or toggle it if needed)
            },
          },
        );
    
        // Handle the response
        if (response.data.type === "success") {
          // Update the local state for the specific notification
          setNotifications((prev) =>
            prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
          );
  
        } else {
          console.error("Failed to update notification:", response.data.message);
        }
      } catch (error) {
        console.error("Error updating notification:", error);
       
      }
    setSelectedNotification(id); // Update the selected notification ID
  };

  const handleClosePreview = () => {
    setSelectedNotification(null); // Reset preview to default
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") return !notification.isRead;
    if (filter === "starred") return notification.isStarred;
    return true;
  });

  const selectedNotificationData = notifications.find(
    (n) => n._id === selectedNotification
  );

  const parseHtmlToText = (html) => {
    if (typeof window !== "undefined") {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      return doc.body.textContent || "";
    }
    return html;
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col md:flex-row h-screen  dark:bg-gray-900 m-4">
        {/* Column A: Notification List */}
        <div className="w-full md:w-1/3 p-6 border-b md:border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-6">
            <Input placeholder="Search notifications..." className="flex-1" />
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFilter("all")}>
              All
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFilter("unread")}>
              Unread
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFilter("starred")}>
              Starred
            </Button>
          </div>
          <div className="space-y-4">
            {filteredNotifications.map((notification,index) => (
              <NotificationCard
                key={index}
                {...notification}
                timestamp={formatTimestamp(notification.timestamp)} // Format timestamp
                onMarkRead={handleMarkRead}
                onStar={handleStar}
                onDelete={handleDelete}
                onSelect={handleSelectNotification}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <Button variant="ghost" className="mt-4 bg-muted text-primary hover:text-white hover:bg-primary">
              Load More
            </Button>
          </div>
        </div>

        {/* Column B: Preview Section (Desktop) */}
        {!isMobile && (
          <div className="hidden md:block w-full md:w-2/3 p-6">
            <AnimatePresence>
              {selectedNotificationData ? (
                <motion.div
                  key={selectedNotificationData.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedNotificationData.sender.avatar}
                        alt={selectedNotificationData.sender.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h2 className="text-xl font-bold">{selectedNotificationData.sender.name}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatTimestamp(selectedNotificationData.timestamp)} {/* Format timestamp */}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleClosePreview}
                      className="p-1 text-gray-500 hover:text-red-500"
                    >
                      <X className="w-5 h-5" /> {/* Close button */}
                    </button>
                  </div>

                  {/* Body */}
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">{selectedNotificationData.title}</h3>
                    <div className="mt-2 text-gray-600 dark:text-gray-400">
                      {selectedNotificationData.message}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center gap-3 mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkRead(selectedNotificationData.id)}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      {selectedNotificationData.isRead ? "Mark as Unread" : "Mark as Read"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(selectedNotificationData.id)}
                    >
                      <Trash className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400"
                >
                  Select a notification to preview
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Mobile Preview Dialog */}
        {isMobile && (
          <Dialog open={!!selectedNotificationData} onOpenChange={handleClosePreview}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Notification Preview</DialogTitle>
              </DialogHeader>
              {selectedNotificationData && (
                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedNotificationData.sender.avatar}
                        alt={selectedNotificationData.sender.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h2 className="text-xl font-bold">{selectedNotificationData.sender.name}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatTimestamp(selectedNotificationData.timestamp)} {/* Format timestamp */}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">{selectedNotificationData.title}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {selectedNotificationData.message}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center gap-3 mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkRead(selectedNotificationData.id)}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      {selectedNotificationData.isRead ? "Mark as Unread" : "Mark as Read"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(selectedNotificationData.id)}
                    >
                      <Trash className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </TooltipProvider>
  );
};

export default NotificationPage;