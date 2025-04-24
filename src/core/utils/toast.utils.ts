// ** Third Party Components
import toast from "react-hot-toast";

const showLoadingToast = (message: string, id: string) =>
  toast.loading(message, {
    id,
  });

const showSuccessToast = (message: string, id?: string) =>
  toast.success(message, {
    id,
  });

const showErrorToast = (message: string, id?: string) =>
  toast.error(message, {
    id,
  });

const dismissToast = (id: string) => toast.dismiss(id);

export { dismissToast, showErrorToast, showLoadingToast, showSuccessToast };
