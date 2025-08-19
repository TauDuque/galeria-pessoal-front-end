import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAppSelector, useAppDispatch } from "../../store";
import { removeNotification } from "../../store/slices/uiSlice";
import "react-toastify/dist/ReactToastify.css";

const ToastNotifications: React.FC = () => {
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector((state) => state.ui);

  useEffect(() => {
    notifications.forEach((notification) => {
      const { id, type, message, duration = 3000 } = notification;

      const toastOptions = {
        position: "top-right" as const,
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => dispatch(removeNotification(id)),
      };

      switch (type) {
        case "success":
          toast.success(message, toastOptions);
          break;
        case "error":
          toast.error(message, toastOptions);
          break;
        case "warning":
          toast.warning(message, toastOptions);
          break;
        case "info":
          toast.info(message, toastOptions);
          break;
        default:
          toast(message, toastOptions);
      }

      // Remove notification from store after showing
      dispatch(removeNotification(id));
    });
  }, [notifications, dispatch]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      className="mt-16"
      toastClassName="bg-card border border-border text-foreground"
      progressClassName="bg-primary-500"
    />
  );
};

export default ToastNotifications;
