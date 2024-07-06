"use client";

import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

interface ToastMessageProps {
  type: "success" | "error" | "warning";
  message: string;
  onClose: () => void;
}

const ToastMessage: React.FC<ToastMessageProps> = ({ type, message, onClose }) => {
  let bgColor, textColor, Icon;

  switch (type) {
    case "success":
      bgColor = "bg-green-100 dark:bg-green-800";
      textColor = "text-green-500 dark:text-green-200";
      Icon = HiCheck;
      break;
    case "error":
      bgColor = "bg-red-100 dark:bg-red-800";
      textColor = "text-red-500 dark:text-red-200";
      Icon = HiX;
      break;
    case "warning":
      bgColor = "bg-orange-100 dark:bg-orange-700";
      textColor = "text-orange-500 dark:text-orange-200";
      Icon = HiExclamation;
      break;
    default:
      bgColor = "bg-gray-100 dark:bg-gray-800";
      textColor = "text-gray-500 dark:text-gray-200";
      Icon = HiExclamation;
      break;
  }

  return (
    <Toast>
      <div
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${bgColor} ${textColor}`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <Toast.Toggle onClick={onClose} />
    </Toast>
  );
};

export default ToastMessage;
