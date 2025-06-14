export interface RevenueChartData {
  day: string;
  onlineSales: number;
  offlineSales: number;
}

export interface MetricData {
  id: number;
  title: string;
  value: string;
  subtitle: string;
}

export interface UserRegionChartData {
  name: string;
  value: number;
  percentage: number;
}

export interface ProductSalesCategoryData {
  category: string;
  currentMonth: number;
  previousMonth: number;
  target: number;
}

export interface ProductPerFormanceData {
  name: string;
  unitsSold: number;
  revenue: number;
  popularity: number;
  category: string;
}

export interface OrderFulfillmentData {
  month: string;
  processingTime: number;
  deliveryTime: number;
  returnRate: number;
}

export interface ConversionHistoryData {
  value: number;
  name: string;
}

export interface ProductPerformanceStatics {
  metric: string;
  currentMonth: number;
  previousMonth: number;
  target: number;
}

export interface OrderDistributionData {
  category: string;
  delivered: number;
  returned: number;
  cancelled: number;
  pending: number;
}

export interface SalesData {
  month: string;
  revenue: number;
  orders: number;
  averageOrderValue: number;
  conversionRate: number;
  target: number;
}

export interface RevenueData {
  day: string;
  onlineSales: number;
  offlineSales: number;
}

export interface SalesTrendsData {
  month: string;
  sales: number;
  target: number;
  lastYear: number;
}

export interface ChartState {
  revenue: RevenueData[];
  userRegion: UserRegionChartData[];
  productPerformance: ProductPerFormanceData[];
  conversionHistory: ConversionHistoryData[];
  salesTrends: SalesTrendsData[];
  orderFulfillment: OrderFulfillmentData[];
  orderDistribution: OrderDistributionData[];
  heatmap: HeatmapData[];
}

export interface HeatmapData {
  day: string;
  hour: number;
  value: number;
  dayIndex: number;
}

export interface InventoryLevelData {
  month: string;
  currentStock: number;
  reorderPoint: number;
  safetyStock: number;
}

export interface VisitorInsightData {
  date: string;
  totalVisitors: number;
  newVisitors: number;
  returningVisitors: number;
}
