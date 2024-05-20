import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error) => {
  console.error(error);  // Log the error for debugging purposes
  if (axios.isAxiosError(error)) {
    const err = error.response;
    
    if (err) {
      if (Array.isArray(err.data?.errors)) {
        err.data.errors.forEach((val) => {
          toast.warning(val.description);
        });
      } else if (typeof err.data?.errors === "object") {
        for (let key in err.data.errors) {
          if (Array.isArray(err.data.errors[key])) {
            err.data.errors[key].forEach((message) => {
              toast.warning(message);
            });
          } else {
            toast.warning(err.data.errors[key]);
          }
        }
      } else if (err.data?.message) {
        toast.warning(err.data.message);
      } else if (err.status === 401) {
        toast.warning("Please login");
        window.history.pushState({}, "LoginPage", "/login");
      } else if (err.data) {
        toast.warning(err.data);
      } else {
        toast.warning("An unexpected error occurred");
      }
    } else {
      toast.warning("No response from server");
    }
  } else {
    toast.warning("An unexpected error occurred");
  }
};
