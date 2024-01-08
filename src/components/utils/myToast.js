import toast, { toastConfig } from "react-simple-toasts";

const myToast = (msg, theme) => {
  toastConfig({
    position: "bottom-right",
    duration: 8000,
  });
  if (theme === "success")
    toast(msg, {
      ...toastConfig,
      theme: "success",
    });
  else if (theme === "failure")
    toast(msg || "Something went wrong", {
      ...toastConfig,
      theme: "failure",
    });
};

export default myToast;
