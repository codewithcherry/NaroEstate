'use client';

import NotificationCard from "@/components/react-components/notifications/NotificationCard";
import React, { useState } from "react";
import { Input } from "@/components/ui/input"; // shadcn UI Input
import { Button } from "@/components/ui/button"; // shadcn UI Button
import { Search, Loader, Reply, Check, Star, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // For animations
import { TooltipProvider } from "@/components/ui/tooltip"; // Import TooltipProvider

const notificationsData = [
  {
    id: "1",
    title: "New Message",
    message: "You have a new message from John.",
    timestamp: "2h ago",
    isRead: false,
    isStarred: true,
    type: "message",
    sender: { name: "John Doe", avatar: "https://i.pravatar.cc/40?img=1" },
  },
  {
    id: "2",
    title: "System Update",
    message: "A new system update is available.",
    timestamp: "5h ago",
    isRead: true,
    isStarred: false,
    type: "alert",
    sender: { name: "System", avatar: "https://i.pravatar.cc/40?img=2" },
  },
  {
    id: "3",
    title: "Mention",
    message: "You were mentioned in a comment by Jane.",
    timestamp: "1d ago",
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
  const [notifications, setNotifications] = useState(notificationsData);

  const handleMarkRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const handleStar = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isStarred: !n.isStarred } : n))
    );
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    if (selectedNotification === id) {
      setSelectedNotification(null); // Clear preview if the deleted notification is selected
    }
  };

  const handleSelectNotification = (id) => {
    setSelectedNotification(id); // Update the selected notification ID
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") return !notification.isRead;
    if (filter === "starred") return notification.isStarred;
    return true;
  });

  const selectedNotificationData = notifications.find(
    (n) => n.id === selectedNotification
  );

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* Column A: Notification List */}
        <div className="w-1/3 p-6 border-r border-gray-200 dark:border-gray-700">
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
            {filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                {...notification}
                onMarkRead={handleMarkRead}
                onStar={handleStar}
                onDelete={handleDelete}
                onSelect={handleSelectNotification}
              />
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4">
            Load More
          </Button>
        </div>

        {/* Column B: Preview Section */}
        <div className="w-2/3 p-6">
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
                <div className="flex items-center gap-3">
                  <img
                    src={selectedNotificationData.sender.avatar}
                    alt={selectedNotificationData.sender.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h2 className="text-xl font-bold">{selectedNotificationData.sender.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedNotificationData.timestamp}
                    </p>
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
                  <Button variant="outline" size="sm">
                    <Reply className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
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
      </div>
    </TooltipProvider>
  );
};

export default NotificationPage;