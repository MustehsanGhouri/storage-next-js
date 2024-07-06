import ToastMessage from "@/app/_components/ToastMessage/ToastMessageClient";
import { useState } from "react";


type ToastType = "success" | "error" | "warning";

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (type: ToastType, message: string) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, type, message }]);
    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
    }, 3000); // Remove toast after 3 seconds
  };

  const showSuccessMessage = (message: string) => showToast("success", message);
  const showErrorMessage = (message: string) => showToast("error", message);
  const showWarningMessage = (message: string) => showToast("warning", message);

  const ToastContainer = () => (
    <div className="absolute top-4 right-4 flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastMessage
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => setToasts((currentToasts) => currentToasts.filter((t) => t.id !== toast.id))}
        />
      ))}
    </div>
  );

  return { showSuccessMessage, showErrorMessage, showWarningMessage, ToastContainer };
};

export default useToast;
