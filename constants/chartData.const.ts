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
