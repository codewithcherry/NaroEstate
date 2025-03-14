import React from "react";
import { Check, Star, Trash, Mail, Bell, AtSign, Clock ,FileText,Calendar,DollarSign,Lock,Megaphone,AlertCircleIcon} from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"; // shadcn Tooltip

const NotificationCard = ({ _id, title, message, timestamp, isRead, isStarred, type, sender, onMarkRead, onStar, onDelete, onSelect }) => {
    const getIcon = (type) => {
        switch (type) {
          case "message":
            return <Mail className="w-4 h-4 text-blue-500" />;
          case "alert":
            return <Bell className="w-4 h-4 text-red-500" />;
          case "mention":
            return <AtSign className="w-4 h-4 text-green-500" />;
          case "social":
            return <Heart className="w-4 h-4 text-pink-500" />;
          case "assignment":
            return <FileText className="w-4 h-4 text-purple-500" />;
          case "reminder":
            return <Clock className="w-4 h-4 text-orange-500" />;
          case "invitation":
            return <Calendar className="w-4 h-4 text-teal-500" />;
          case "payment":
            return <DollarSign className="w-4 h-4 text-green-500" />;
          case "account":
            return <Lock className="w-4 h-4 text-gray-500" />;
          case "announcement":
            return <Megaphone className="w-4 h-4 text-yellow-500" />;
          default:
            return <AlertCircleIcon className="w-4 h-4 text-gray-500" />;
        }
      };

      const getPreviewHeader = (type) => {
        switch (type) {
          case "message":
            return "New Message";
          case "alert":
            return "System Alert";
          case "mention":
            return "You Were Mentioned";
          case "social":
            return "Social Activity";
          case "assignment":
            return "New Assignment";
          case "reminder":
            return "Reminder";
          case "invitation":
            return "Event Invitation";
          case "payment":
            return "Payment Received";
          case "account":
            return "Account Activity";
          case "announcement":
            return "New Announcement";
          default:
            return "Notification";
        }
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(_id)} // Call onSelect when the card is clicked
      className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
        isRead ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getIcon(type)}
          <h3 className="font-medium">{getPreviewHeader(type)}</h3>
        </div>
        <div className="flex items-center gap-2 mt-2">
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
                  onMarkRead(_id,!isRead);
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
                  onStar(_id,!isStarred);
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
                  onDelete(_id);
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
        {!isRead && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
        
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{title}</p>
      
    </motion.div>
  );
};

export default NotificationCard;