import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

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
  (error: AxiosError) => {
    const { response } = error;

    // Handle specific error cases
    switch (response?.status) {
      case 401:
        Cookies.remove("token");
        // You might want to redirect to login here if needed
        break;
      case 403:
        // Handle forbidden
        break;
      case 404:
        // Handle not found
        break;
      case 500:
        // Handle server error
        break;
    }

    return Promise.reject(error);
  }
);

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
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
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
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

// API calls organized by feature
const Auth = {
  login: (data: LoginRequest) =>
    requests.post<UserResponse, LoginRequest>("/auth/login", data),
  register: (data: RegisterRequest) =>
    requests.post<UserResponse, RegisterRequest>("/auth/register", data),
  current: () => requests.get<UserResponse>("/auth/get-user"),
  logout: () => {
    Cookies.remove("token");
    return Promise.resolve();
  },
};

const agent = {
  Auth,
};

export default agent;
