import { ApiError } from "../types/auth_types";

export function parseApiError(
  err: ApiError,
  fallbackMessage = "An error occured processing your current request!",
): string {
  let message = fallbackMessage;
  console.log(err);
  if (err?.response) {
    const data = err.response.data;

    if (typeof data === "string") {
      message = data;
    } else if (data?.message) {
      message = data.message;
    } else if (Array.isArray(data?.errors)) {
      message = data.errors.join(", ");
    } else if (typeof data?.errors === "object") {
      message = Object.values(data.errors).flat().join(", ") || message;
    }
  } else if (err?.request) {
    // Request was made but no response received
    message =
      "No response from server. Please check your internet connection.!";
  } else if (err?.message) {
    message = err.message;
  }
  return message;
}
