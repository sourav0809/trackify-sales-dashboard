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
import SalesTrendsChartTooltip from "./Tooltip";
import SalesTrendsChartLegend from "./Legend";

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

              <Tooltip content={<SalesTrendsChartTooltip />} />
              <Legend content={<SalesTrendsChartLegend />} />
            </ComposedChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SalesTrendsComposedChart;
