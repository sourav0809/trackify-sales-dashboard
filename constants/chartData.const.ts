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
