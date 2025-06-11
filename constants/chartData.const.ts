interface RevenueChartData {
  day: string;
  onlineSales: number;
  offlineSales: number;
}

export const revenueChartData: RevenueChartData[] = [
  {
    day: "Monday",
    onlineSales: 14000,
    offlineSales: 12000,
  },
  {
    day: "Tuesday",
    onlineSales: 16000,
    offlineSales: 11000,
  },
  {
    day: "Wednesday",
    onlineSales: 6000,
    offlineSales: 22000,
  },
  {
    day: "Thursday",
    onlineSales: 15000,
    offlineSales: 6000,
  },
  {
    day: "Friday",
    onlineSales: 11000,
    offlineSales: 10000,
  },
  {
    day: "Saturday",
    onlineSales: 16000,
    offlineSales: 12000,
  },
  {
    day: "Sunday",
    onlineSales: 20000,
    offlineSales: 10000,
  },
];

interface VisitorInsightData {
  month: string;
  loyalCustomers: number;
  newCustomers: number;
  uniqueCustomers: number;
}

export const visitorInsightsData: VisitorInsightData[] = [
  {
    month: "Jan",
    loyalCustomers: 320,
    newCustomers: 280,
    uniqueCustomers: 340,
  },
  {
    month: "Feb",
    loyalCustomers: 280,
    newCustomers: 200,
    uniqueCustomers: 320,
  },
  {
    month: "Mar",
    loyalCustomers: 350,
    newCustomers: 180,
    uniqueCustomers: 380,
  },
  {
    month: "Apr",
    loyalCustomers: 200,
    newCustomers: 160,
    uniqueCustomers: 280,
  },
  {
    month: "May",
    loyalCustomers: 180,
    newCustomers: 140,
    uniqueCustomers: 220,
  },
  {
    month: "Jun",
    loyalCustomers: 280,
    newCustomers: 200,
    uniqueCustomers: 300,
  },
  {
    month: "Jul",
    loyalCustomers: 320,
    newCustomers: 240,
    uniqueCustomers: 350,
  },
  {
    month: "Aug",
    loyalCustomers: 380,
    newCustomers: 380,
    uniqueCustomers: 340,
  },
  {
    month: "Sept",
    loyalCustomers: 320,
    newCustomers: 340,
    uniqueCustomers: 320,
  },
  {
    month: "Oct",
    loyalCustomers: 280,
    newCustomers: 300,
    uniqueCustomers: 280,
  },
  {
    month: "Nov",
    loyalCustomers: 200,
    newCustomers: 180,
    uniqueCustomers: 220,
  },
  {
    month: "Dec",
    loyalCustomers: 160,
    newCustomers: 140,
    uniqueCustomers: 180,
  },
];

export interface MetricData {
  id: number;
  title: string;
  value: string;
  subtitle: string;
}

export const metricsData: MetricData[] = [
  {
    id: 1,
    title: "Total Sales",
    value: "$1k",
    subtitle: "+8.7% from yesterday",
  },
  {
    id: 2,
    title: "Total Order",
    value: "300",
    subtitle: "+5.9% from yesterday",
  },
  {
    id: 3,
    title: "Product Sold",
    value: "5",
    subtitle: "+1.2% from yesterday",
  },
  {
    id: 4,
    title: "New User",
    value: "8",
    subtitle: "+0.5% from yesterday",
  },
];

interface UserRegionChartData {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

export const userRegionChartData: UserRegionChartData[] = [
  {
    name: "India",
    value: 30146,
    color: "hsl(142, 76%, 36%)",
    percentage: 30.5,
  },
  {
    name: "United States",
    value: 24900,
    color: "hsl(217, 91%, 60%)",
    percentage: 52.4,
  },
  {
    name: "Canada",
    value: 12146,
    color: "hsl(276, 74%, 68%)",
    percentage: 25.5,
  },
];

export const productSalesCategoryChartData = [
  {
    category: "T-Shirts",
    currentMonth: 60,
    previousMonth: 70,
    target: 90,
  },
  {
    category: "Jeans",
    currentMonth: 55,
    previousMonth: 48,
    target: 86,
  },
  {
    category: "Jackets",
    currentMonth: 45,
    previousMonth: 20,
    target: 75,
  },
  {
    category: "Shoes",
    currentMonth: 48,
    previousMonth: 60,
    target: 72,
  },
  {
    category: "Accessories",
    currentMonth: 29,
    previousMonth: 39,
    target: 40,
  },
  {
    category: "Dresses",
    currentMonth: 48,
    previousMonth: 23,
    target: 69,
  },
];

export interface ProductPerFormanceData {
  name: string;
  unitsSold: number;
  revenue: number;
  popularity: number;
  category: string;
  color: string;
}

export const productPerformanceData: ProductPerFormanceData[] = [
  {
    name: "Premium Denim Jeans",
    unitsSold: 1200,
    revenue: 89000,
    popularity: 85,
    category: "Bottoms",
    color: "#3b82f6",
  },
  {
    name: "Summer Dresses",
    unitsSold: 800,
    revenue: 64000,
    popularity: 75,
    category: "Dresses",
    color: "#34d399",
  },
  {
    name: "Designer Handbags",
    unitsSold: 400,
    revenue: 120000,
    popularity: 90,
    category: "Accessories",
    color: "#8b5cf6",
  },
  {
    name: "Graphic T-Shirts",
    unitsSold: 2000,
    revenue: 40000,
    popularity: 65,
    category: "Tops",
    color: "#f59e0b",
  },
  {
    name: "Athletic Wear",
    unitsSold: 1500,
    revenue: 75000,
    popularity: 80,
    category: "Activewear",
    color: "#ec4899",
  },
  {
    name: "Luxury Watches",
    unitsSold: 300,
    revenue: 150000,
    popularity: 95,
    category: "Jewelry",
    color: "#dc2626",
  },
];

interface InventoryData {
  month: string;
  tshirts: number;
  jeans: number;
  dresses: number;
}

export const inventoryData: InventoryData[] = [
  {
    month: "Jan",
    tshirts: 450,
    jeans: 380,
    dresses: 320,
  },
  {
    month: "Feb",
    tshirts: 420,
    jeans: 350,
    dresses: 290,
  },
  {
    month: "Mar",
    tshirts: 500,
    jeans: 420,
    dresses: 380,
  },
  {
    month: "Apr",
    tshirts: 380,
    jeans: 320,
    dresses: 280,
  },
  {
    month: "May",
    tshirts: 450,
    jeans: 380,
    dresses: 340,
  },
  {
    month: "Jun",
    tshirts: 520,
    jeans: 450,
    dresses: 400,
  },
];

interface OrderFulfillmentData {
  month: string;
  processingTime: number;
  deliveryTime: number;
  returnRate: number;
}

export const orderFulfillmentData: OrderFulfillmentData[] = [
  {
    month: "Jan",
    processingTime: 2.5,
    deliveryTime: 3.8,
    returnRate: 1.2,
  },
  {
    month: "Feb",
    processingTime: 2.2,
    deliveryTime: 3.5,
    returnRate: 1.4,
  },
  {
    month: "Mar",
    processingTime: 2.8,
    deliveryTime: 4.0,
    returnRate: 1.1,
  },
  {
    month: "Apr",
    processingTime: 2.3,
    deliveryTime: 3.6,
    returnRate: 1.3,
  },
  {
    month: "May",
    processingTime: 2.1,
    deliveryTime: 3.4,
    returnRate: 1.0,
  },
  {
    month: "Jun",
    processingTime: 2.4,
    deliveryTime: 3.7,
    returnRate: 1.2,
  },
];
interface ConversionHistoryData {
  value: number;
  name: string;
  fill: string;
}
export const conversionHistoryData: ConversionHistoryData[] = [
  {
    value: 12000,
    name: "Visitors",
    fill: "#3b82f6",
  },
  {
    value: 8500,
    name: "Add to Cart",
    fill: "#34d399",
  },
  {
    value: 5200,
    name: "Checkout",
    fill: "#8b5cf6",
  },
  {
    value: 4000,
    name: "Payment",
    fill: "#f59e0b",
  },
  {
    value: 3200,
    name: "Purchase",
    fill: "#ec4899",
  },
];

interface ProductPerformanceStatics {
  metric: string;
  currentMonth: number;
  previousMonth: number;
  target: number;
}

export const productPerformanceStatistics: ProductPerformanceStatics[] = [
  {
    metric: "Sales Volume",
    currentMonth: 85,
    previousMonth: 78,
    target: 90,
  },
  {
    metric: "Customer Rating",
    currentMonth: 92,
    previousMonth: 88,
    target: 95,
  },
  {
    metric: "Return Rate",
    currentMonth: 15,
    previousMonth: 22,
    target: 10,
  },
  {
    metric: "Profit Margin",
    currentMonth: 68,
    previousMonth: 65,
    target: 75,
  },
  {
    metric: "Market Share",
    currentMonth: 45,
    previousMonth: 42,
    target: 50,
  },
  {
    metric: "Brand Awareness",
    currentMonth: 72,
    previousMonth: 69,
    target: 80,
  },
];

interface TopProducts {
  id: string;
  name: string;
  popularity: number;
  sales: number;
  color: string;
}

export const topProducts: TopProducts[] = [
  {
    id: "01",
    name: "Designer Denim Collection",
    popularity: 85,
    sales: 45,
    color: "#3b82f6",
  },
  {
    id: "02",
    name: "Summer Maxi Dresses",
    popularity: 75,
    sales: 29,
    color: "#34d399",
  },
  {
    id: "03",
    name: "Luxury Handbags",
    popularity: 65,
    sales: 18,
    color: "#a78bfa",
  },
  {
    id: "04",
    name: "Athletic Wear Set",
    popularity: 45,
    sales: 23,
    color: "#fbbf24",
  },
];

interface OrderDistributionData {
  category: string;
  delivered: number;
  returned: number;
  cancelled: number;
  pending: number;
}
export const orderDistributionData: OrderDistributionData[] = [
  {
    category: "Dresses",
    delivered: 500,
    returned: 300,
    cancelled: 200,
    pending: 150,
  },
  {
    category: "T-Shirts",
    delivered: 450,
    returned: 250,
    cancelled: 180,
    pending: 100,
  },
  {
    category: "Jeans",
    delivered: 400,
    returned: 230,
    cancelled: 160,
    pending: 90,
  },
  {
    category: "Accessories",
    delivered: 350,
    returned: 200,
    cancelled: 130,
    pending: 80,
  },
  {
    category: "Shoes",
    delivered: 300,
    returned: 180,
    cancelled: 120,
    pending: 70,
  },
];

interface SalesData {
  month: string;
  revenue: number;
  orders: number;
  averageOrderValue: number;
  conversionRate: number;
  target: number;
}

export const salesTrendsData: SalesData[] = [
  {
    month: "Jan",
    revenue: 85000,
    orders: 340,
    averageOrderValue: 250,
    conversionRate: 3.2,
    target: 80000,
  },
  {
    month: "Feb",
    revenue: 92000,
    orders: 368,
    averageOrderValue: 250,
    conversionRate: 3.5,
    target: 85000,
  },
  {
    month: "Mar",
    revenue: 78000,
    orders: 312,
    averageOrderValue: 250,
    conversionRate: 2.9,
    target: 90000,
  },
  {
    month: "Apr",
    revenue: 105000,
    orders: 420,
    averageOrderValue: 250,
    conversionRate: 4.1,
    target: 95000,
  },
  {
    month: "May",
    revenue: 118000,
    orders: 472,
    averageOrderValue: 250,
    conversionRate: 4.5,
    target: 100000,
  },
  {
    month: "Jun",
    revenue: 125000,
    orders: 500,
    averageOrderValue: 250,
    conversionRate: 4.8,
    target: 105000,
  },
  {
    month: "Jul",
    revenue: 132000,
    orders: 528,
    averageOrderValue: 250,
    conversionRate: 5.1,
    target: 110000,
  },
  {
    month: "Aug",
    revenue: 145000,
    orders: 580,
    averageOrderValue: 250,
    conversionRate: 5.4,
    target: 115000,
  },
];
