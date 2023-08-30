import { ToastContainer, toast } from 'react-toastify';

type NotificationType = "success" | "info" | "warning" | "error";

interface notificationProps {
    title?: string;
    description: string;
    duration?: number;
    autoDismiss?: boolean;
    placement?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "bottom-center" | "top-center";
    type: NotificationType;
    theme?: "light" | "dark" | "colored"
}

export const OpenNotification = (props: notificationProps) => {
    
    const {
        description,
        duration = 3000,
        placement = "top-right",
        autoDismiss = true,
        type = "success",
        theme = "dark"
    } = props;

    toast[type](description, {
        position: placement,
        autoClose: duration,
        theme: theme,
    });
}