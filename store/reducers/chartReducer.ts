import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

interface ChartState {
  revenue: RevenueChartData[];
  metrics: MetricData[];
  userRegion: UserRegionChartData[];
  productSalesCategory: ProductSalesCategoryData[];
  productPerformance: ProductPerFormanceData[];
  productPerformanceStatistics: ProductPerformanceStatics[];
  orderFulfillment: OrderFulfillmentData[];
  conversionHistory: ConversionHistoryData[];
  orderDistribution: OrderDistributionData[];
  salesTrends: SalesData[];
  inventoryLevels: InventoryLevelData[];
  visitorInsights: VisitorInsightData[];
  loading: boolean;
  error: string | null;
}

const initialState: ChartState = {
  revenue: [],
  metrics: [],
  userRegion: [],
  productSalesCategory: [],
  productPerformance: [],
  productPerformanceStatistics: [],
  orderFulfillment: [],
  conversionHistory: [],
  orderDistribution: [],
  salesTrends: [],
  inventoryLevels: [],
  visitorInsights: [],
  loading: false,
  error: null,
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setChartLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setChartError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setRevenueData: (state, action: PayloadAction<RevenueChartData[]>) => {
      state.revenue = action.payload;
    },
    setMetricsData: (state, action: PayloadAction<MetricData[]>) => {
      state.metrics = action.payload;
    },
    setUserRegionData: (
      state,
      action: PayloadAction<UserRegionChartData[]>
    ) => {
      state.userRegion = action.payload;
    },
    setProductSalesCategoryData: (
      state,
      action: PayloadAction<ProductSalesCategoryData[]>
    ) => {
      state.productSalesCategory = action.payload;
    },
    setProductPerformanceData: (
      state,
      action: PayloadAction<ProductPerFormanceData[]>
    ) => {
      state.productPerformance = action.payload;
    },
    setProductPerformanceStatistics: (
      state,
      action: PayloadAction<ProductPerformanceStatics[]>
    ) => {
      state.productPerformanceStatistics = action.payload;
    },
    setOrderFulfillmentData: (
      state,
      action: PayloadAction<OrderFulfillmentData[]>
    ) => {
      state.orderFulfillment = action.payload;
    },
    setConversionHistoryData: (
      state,
      action: PayloadAction<ConversionHistoryData[]>
    ) => {
      state.conversionHistory = action.payload;
    },
    setOrderDistributionData: (
      state,
      action: PayloadAction<OrderDistributionData[]>
    ) => {
      state.orderDistribution = action.payload;
    },
    setSalesTrendsData: (state, action: PayloadAction<SalesData[]>) => {
      state.salesTrends = action.payload;
    },
    setInventoryLevels: (
      state,
      action: PayloadAction<InventoryLevelData[]>
    ) => {
      state.inventoryLevels = action.payload;
    },
    setVisitorInsights: (
      state,
      action: PayloadAction<VisitorInsightData[]>
    ) => {
      state.visitorInsights = action.payload;
    },
  },
});

export const {
  setChartLoading,
  setChartError,
  setRevenueData,
  setMetricsData,
  setUserRegionData,
  setProductSalesCategoryData,
  setProductPerformanceData,
  setProductPerformanceStatistics,
  setOrderFulfillmentData,
  setConversionHistoryData,
  setOrderDistributionData,
  setSalesTrendsData,
  setInventoryLevels,
  setVisitorInsights,
} = chartSlice.actions;

export default chartSlice.reducer;
