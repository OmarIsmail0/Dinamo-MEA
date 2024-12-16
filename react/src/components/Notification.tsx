import { notification } from "antd";

export type NotificationType = "success" | "error" | "info" | "warning";

const showNotification = (type: NotificationType, message: string, description?: string) => {
  notification[type]({
    message,
    description,
    placement: "topRight",
    duration: 3,
  });
};

export const Notification = {
  success: (message: string, description?: string) => showNotification("success", message, description),
  error: (message: string, description?: string) => showNotification("error", message, description),
  info: (message: string, description?: string) => showNotification("info", message, description),
  warning: (message: string, description?: string) => showNotification("warning", message, description),
};
