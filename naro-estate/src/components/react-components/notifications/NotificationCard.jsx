import React from "react";
import { Check, Star, Trash, Mail, Bell, AtSign, Clock, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"; // shadcn Tooltip

const NotificationCard = ({ id, title, message, timestamp, isRead, isStarred, type, sender, onMarkRead, onStar, onDelete, onSelect }) => {
  const getIcon = () => {
    switch (type) {
      case "message":
        return <Mail className="w-4 h-4 text-blue-500" />;
      case "alert":
        return <Bell className="w-4 h-4 text-red-500" />;
      case "mention":
        return <AtSign className="w-4 h-4 text-green-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(id)} // Call onSelect when the card is clicked
      className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
        isRead ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getIcon()}
          <h3 className="font-medium">{title}</h3>
        </div>
        {!isRead && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{message}</p>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          <span>{timestamp}</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Mark as Read/Unread */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event from firing
                  onMarkRead(id);
                }}
                className="p-1 text-gray-500 hover:text-blue-500"
              >
                {isRead ? <Check className="w-4 h-4" /> : <Check className="w-4 h-4" />}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isRead ? "Mark as Unread" : "Mark as Read"}</p>
            </TooltipContent>
          </Tooltip>

          {/* Star/Unstar */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event from firing
                  onStar(id);
                }}
                className="p-1 text-gray-500 hover:text-yellow-500"
              >
                {isStarred ? (
                  <Star className="w-4 h-4 fill-yellow-500" />
                ) : (
                  <Star className="w-4 h-4" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isStarred ? "Unstar" : "Star"}</p>
            </TooltipContent>
          </Tooltip>

          {/* Delete */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event from firing
                  onDelete(id);
                }}
                className="p-1 text-gray-500 hover:text-red-500"
              >
                <Trash className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationCard;