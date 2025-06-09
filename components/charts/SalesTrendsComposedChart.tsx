"use client";
import React, { useState } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface SalesData {
  month: string;
  revenue: number;
  orders: number;
  averageOrderValue: number;
  conversionRate: number;
  target: number;
}

const salesTrendsData: SalesData[] = [
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

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    dataKey: string;
  }>;
  label?: string;
}) => {
  if (active && payload && payload.length && label) {
    const revenueData = payload.find((p) => p.dataKey === "revenue");
    const ordersData = payload.find((p) => p.dataKey === "orders");
    const conversionData = payload.find((p) => p.dataKey === "conversionRate");
    const targetData = payload.find((p) => p.dataKey === "target");

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-xl min-w-[250px]"
      >
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span className="font-semibold text-foreground text-sm">
            {label} 2024
          </span>
        </div>
        <div className="space-y-3">
          {revenueData && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: revenueData.color }}
                />
                <span className="text-sm text-muted-foreground font-medium">
                  Revenue
                </span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                ${(revenueData.value / 1000).toFixed(0)}k
              </span>
            </div>
          )}
          {ordersData && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: ordersData.color }}
                />
                <span className="text-sm text-muted-foreground font-medium">
                  Orders
                </span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {ordersData.value}
              </span>
            </div>
          )}
          {conversionData && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: conversionData.color }}
                />
                <span className="text-sm text-muted-foreground font-medium">
                  Conversion Rate
                </span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {conversionData.value}%
              </span>
            </div>
          )}
          {targetData && (
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-xs text-muted-foreground">Target:</span>
              <span className="text-xs font-medium text-muted-foreground">
                ${(targetData.value / 1000).toFixed(0)}k
              </span>
            </div>
          )}
        </div>
      </motion.div>
    );
  }
  return null;
};

const CustomLegend = ({
  payload,
}: {
  payload?: Array<{
    value: string;
    color: string;
    type: string;
  }>;
}) => {
  const legendLabels = {
    revenue: "Revenue",
    orders: "Orders",
    conversionRate: "Conversion Rate",
    target: "Target",
  };

  return (
    <div className="flex items-center justify-center gap-6 mt-6 pb-4 flex-wrap">
      {payload?.map((entry, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-2"
        >
          <div className="flex items-center gap-1">
            {entry.type === "line" ? (
              <div
                className="w-4 h-0.5"
                style={{ backgroundColor: entry.color }}
              />
            ) : (
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: entry.color }}
              />
            )}
          </div>
          <span className="text-sm text-muted-foreground font-medium">
            {legendLabels[entry.value as keyof typeof legendLabels] ||
              entry.value}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

const SalesTrendsComposedChart = () => {
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  const currentMonth = salesTrendsData[salesTrendsData.length - 1];
  const previousMonth = salesTrendsData[salesTrendsData.length - 2];
  const revenueGrowth =
    ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) *
    100;
  const ordersGrowth =
    ((currentMonth.orders - previousMonth.orders) / previousMonth.orders) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-card rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-border w-full h-full"
    >
      <div className="flex items-start justify-between mb-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-medium text-[#1d1b20] mb-2">
            Sales Trends Analysis
          </h2>
          <p className="text-sm text-muted-foreground">
            Revenue, Orders & Conversion Rate Performance
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4"
        >
          <div className="text-right">
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">
                Revenue Growth
              </span>
              {revenueGrowth > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
            </div>
            <p
              className={`text-lg font-semibold ${
                revenueGrowth > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {revenueGrowth > 0 ? "+" : ""}
              {revenueGrowth.toFixed(1)}%
            </p>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">
                Orders Growth
              </span>
              {ordersGrowth > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
            </div>
            <p
              className={`text-lg font-semibold ${
                ordersGrowth > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {ordersGrowth > 0 ? "+" : ""}
              {ordersGrowth.toFixed(1)}%
            </p>
          </div>
        </motion.div>
      </div>

      <div className="h-[300px] sm:h-[400px] lg:h-[500px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={salesTrendsData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              strokeOpacity={0.5}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: "#6b7280",
                fontWeight: 500,
              }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "#9ca3af",
              }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "#9ca3af",
              }}
              tickFormatter={(value) => `${value}%`}
            />

            <Bar
              yAxisId="left"
              dataKey="revenue"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              opacity={activeMetric === "revenue" || !activeMetric ? 1 : 0.3}
              onMouseEnter={() => setActiveMetric("revenue")}
              onMouseLeave={() => setActiveMetric(null)}
            />

            <Bar
              yAxisId="left"
              dataKey="orders"
              fill="#34d399"
              radius={[4, 4, 0, 0]}
              opacity={activeMetric === "orders" || !activeMetric ? 0.8 : 0.3}
              onMouseEnter={() => setActiveMetric("orders")}
              onMouseLeave={() => setActiveMetric(null)}
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="conversionRate"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{
                fill: "#f59e0b",
                strokeWidth: 2,
                r: 5,
                opacity:
                  activeMetric === "conversionRate" || !activeMetric ? 1 : 0.3,
              }}
              activeDot={{
                r: 7,
                fill: "#f59e0b",
                strokeWidth: 2,
                stroke: "#fff",
              }}
              opacity={
                activeMetric === "conversionRate" || !activeMetric ? 1 : 0.3
              }
              onMouseEnter={() => setActiveMetric("conversionRate")}
              onMouseLeave={() => setActiveMetric(null)}
            />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="target"
              stroke="#ef4444"
              strokeWidth={2}
              strokeDasharray="8 8"
              dot={false}
              opacity={0.6}
            />

            <ReferenceLine
              yAxisId="left"
              y={100000}
              stroke="#ef4444"
              strokeDasharray="4 4"
              strokeOpacity={0.5}
              label={{
                value: "Target Baseline",
                position: "top",
                fontSize: 10,
              }}
            />

            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesTrendsComposedChart;
