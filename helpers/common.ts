/**
 * Extracts error message from various error response formats
 * @param error - The error object to extract message from. Can be an API response error, Error instance, or any error-like object
 * @returns A string containing the error message. Falls back to a default message if no specific message is found
 */
export const getErrorMessage = (error: any): string => {
  return (
    error?.response?.data?.message?.message ||
    error?.response?.data?.message ||
    error?.message ||
    error?.response?.data?.data?.message ||
    "An unexpected error occurred. Please try again later."
  );
};
