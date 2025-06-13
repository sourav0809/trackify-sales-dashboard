import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { AUTH_COOKIE_NAME } from "@/constants/auth";

interface ApiErrorResponse {
  message: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const { response } = error;

    // Handle specific error cases
    switch (response?.status) {
      case 401:
        Cookies.remove(AUTH_COOKIE_NAME);
        toast.error("Session expired. Please login again.");
        break;
      case 403:
        toast.error("You do not have permission to perform this action.");
        break;
      case 404:
        toast.error("Resource not found.");
        break;
      case 500:
        toast.error("An unexpected error occurred. Please try again later.");
        break;
      default:
        toast.error(response?.data?.message || "Something went wrong.");
    }

    return Promise.reject(error);
  }
);

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get(AUTH_COOKIE_NAME);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response handler
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

// Generic requests
const requests = {
  get: <T>(url: string) => axiosInstance.get<T>(url).then(responseBody),
  post: <T, B>(url: string, body: B) =>
    axiosInstance.post<T>(url, body).then(responseBody),
  put: <T, B>(url: string, body: B) =>
    axiosInstance.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axiosInstance.delete<T>(url).then(responseBody),
};

// Types
export interface UserResponse {
  data: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
    preferences: any;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

const Auth = {
  login: (data: LoginRequest) =>
    requests.post<UserResponse, LoginRequest>("/auth/login", data),
  register: (data: RegisterRequest) =>
    requests.post<UserResponse, RegisterRequest>("/auth/register", data),
  getUser: () => requests.get<UserResponse>("/user/get-user"),
};

const agent = {
  Auth,
};

export default agent;
