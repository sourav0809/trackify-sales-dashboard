import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import {
  ConversionHistoryData,
  MetricData,
  OrderDistributionData,
  OrderFulfillmentData,
  ProductPerFormanceData,
  ProductPerformanceStatics,
  ProductSalesCategoryData,
  RevenueChartData,
  SalesData,
  UserRegionChartData,
  InventoryLevelData,
  VisitorInsightData,
} from "@/types/charts.types";

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
  data: any;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  preferences?: {
    dashboardLayoutConfig?: any;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
}

interface ApiResponse<T> {
  message: string;
  data: T;
}

// API calls organized by feature
const Auth = {
  login: (data: LoginRequest) =>
    requests.post<UserResponse, LoginRequest>("/auth/login", data),
  register: (data: RegisterRequest) =>
    requests.post<UserResponse, RegisterRequest>("/auth/register", data),
  getUser: () => requests.get<UserResponse>("/user/get-user"),
  logout: () => {
    Cookies.remove("token");
    return Promise.resolve();
  },
};

const Charts = {
  getRevenue: () =>
    requests.get<ApiResponse<RevenueChartData[]>>("/charts/revenue"),
  getMetrics: () => requests.get<ApiResponse<MetricData[]>>("/charts/metrics"),
  getUserRegion: () =>
    requests.get<ApiResponse<UserRegionChartData[]>>("/charts/user-region"),
  getProductSalesCategory: () =>
    requests.get<ApiResponse<ProductSalesCategoryData[]>>(
      "/charts/product-sales-category"
    ),
  getProductPerformance: () =>
    requests.get<ApiResponse<ProductPerFormanceData[]>>(
      "/charts/product-performance"
    ),
  getProductPerformanceStatistics: () =>
    requests.get<ApiResponse<ProductPerformanceStatics[]>>(
      "/charts/product-performance/statistics"
    ),
  getOrderFulfillment: () =>
    requests.get<ApiResponse<OrderFulfillmentData[]>>(
      "/charts/order-fulfillment"
    ),
  getConversionHistory: () =>
    requests.get<ApiResponse<ConversionHistoryData[]>>(
      "/charts/conversion-history"
    ),
  getOrderDistribution: () =>
    requests.get<ApiResponse<OrderDistributionData[]>>(
      "/charts/order-distribution"
    ),
  getSalesTrends: () =>
    requests.get<ApiResponse<SalesData[]>>("/charts/sales-trends"),
  getInventoryLevels: () =>
    requests.get<ApiResponse<InventoryLevelData[]>>("/charts/inventory-levels"),
  getVisitorInsights: () =>
    requests.get<ApiResponse<VisitorInsightData[]>>("/charts/visitor-insights"),
  getTodayMetrics: () =>
    requests.get<ApiResponse<MetricData[]>>("/charts/today-metrics"),
  getTopProducts: () =>
    requests.get<ApiResponse<ProductPerFormanceData[]>>("/charts/top-products"),
};

const agent = {
  Auth,
  Charts,
};

export default agent;
