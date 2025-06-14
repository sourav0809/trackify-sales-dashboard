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
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { chartColors } from "@/constants/style.const";

const SalesTrendsComposedChart = () => {
  const salesTrendsData = useSelector(
    (state: RootState) => state.chart.salesTrends
  );
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  return (
    <motion.div
      className="bg-card rounded-2xl p-4 shadow-sm border border-border w-full h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title */}
      <motion.div
        className="pb-6 flex items-center h-[4rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg primary-heading">Total Revenue</h2>
      </motion.div>

      {/* Chart + Legend container */}
      <div className="flex flex-col h-[calc(100%-4rem)]">
        {/* Chart */}
        <motion.div
          className="h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
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
                fill={chartColors.primary}
                radius={[4, 4, 0, 0]}
                opacity={activeMetric === "revenue" || !activeMetric ? 1 : 0.3}
                onMouseEnter={() => setActiveMetric("revenue")}
                onMouseLeave={() => setActiveMetric(null)}
              />

              <Bar
                yAxisId="left"
                dataKey="orders"
                fill={chartColors.secondary}
                radius={[4, 4, 0, 0]}
                opacity={activeMetric === "orders" || !activeMetric ? 0.8 : 0.3}
                onMouseEnter={() => setActiveMetric("orders")}
                onMouseLeave={() => setActiveMetric(null)}
              />

              <Line
                yAxisId="right"
                type="monotone"
                dataKey="conversionRate"
                stroke={chartColors.quaternary}
                strokeWidth={3}
                dot={{
                  fill: chartColors.quaternary,
                  strokeWidth: 2,
                  r: 5,
                  opacity:
                    activeMetric === "conversionRate" || !activeMetric
                      ? 1
                      : 0.3,
                }}
                activeDot={{
                  r: 7,
                  fill: chartColors.quaternary,
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
                stroke={chartColors.senary}
                strokeWidth={2}
                strokeDasharray="8 8"
                dot={false}
                opacity={0.6}
              />

              <ReferenceLine
                yAxisId="left"
                y={100000}
                stroke={chartColors.senary}
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
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SalesTrendsComposedChart;

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
  }>;
  label?: string;
}) => {
  if (active && payload && payload.length && label) {
    const revenueData = payload.find((p) => p.dataKey === "revenue");
    const ordersData = payload.find((p) => p.dataKey === "orders");
    const conversionData = payload.find((p) => p.dataKey === "conversionRate");
    const targetData = payload.find((p) => p.dataKey === "target");

    const getColor = (dataKey: string) => {
      switch (dataKey) {
        case "revenue":
          return chartColors.primary;
        case "orders":
          return chartColors.secondary;
        case "conversionRate":
          return chartColors.quaternary;
        case "target":
          return chartColors.senary;
        default:
          return chartColors.primary;
      }
    };

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
                  style={{ backgroundColor: getColor(revenueData.dataKey) }}
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
                  style={{ backgroundColor: getColor(ordersData.dataKey) }}
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
                  style={{ backgroundColor: getColor(conversionData.dataKey) }}
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getColor(targetData.dataKey) }}
                />
                <span className="text-sm text-muted-foreground font-medium">
                  Target
                </span>
              </div>
              <span className="text-sm font-semibold text-foreground">
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
    type: string;
  }>;
}) => {
  const getColor = (value: string) => {
    switch (value) {
      case "revenue":
        return chartColors.primary;
      case "orders":
        return chartColors.secondary;
      case "conversionRate":
        return chartColors.quaternary;
      case "target":
        return chartColors.senary;
      default:
        return chartColors.primary;
    }
  };

  const getLegendLabel = (value: string) => {
    switch (value) {
      case "revenue":
        return "Revenue";
      case "orders":
        return "Orders";
      case "conversionRate":
        return "Conversion Rate";
      case "target":
        return "Target";
      default:
        return value;
    }
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
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: getColor(entry.value) }}
          />
          <span className="text-sm text-muted-foreground font-medium">
            {getLegendLabel(entry.value)}
          </span>
        </motion.div>
      ))}
    </div>
  );
};
