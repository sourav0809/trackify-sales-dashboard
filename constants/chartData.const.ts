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
    title: "New Customers",
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
