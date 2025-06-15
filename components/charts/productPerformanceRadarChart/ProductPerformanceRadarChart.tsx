"use client";
import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { chartColors } from "@/constants/style.const";
import ProductPerformanceRadarChartTooltip from "./Tooltip";

const ProductPerformanceRadarChart = () => {
  const productPerformanceStatistics = useSelector(
    (state: RootState) => state.chart.productPerformanceStatistics
  );

  return (
    <motion.div
      className="bg-card rounded-2xl p-4 shadow-sm border border-border w-full h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title */}
      <motion.div
        className="pb-3 flex items-center h-[4rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg primary-heading">
          Product Performance Analysis
        </h2>
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
            <RadarChart
              data={productPerformanceStatistics}
              margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
            >
              <PolarGrid
                stroke="#e5e7eb"
                strokeWidth={1}
                gridType="polygon"
                radialLines={true}
              />
              <PolarAngleAxis
                dataKey="metric"
                tick={{
                  fontSize: 12,
                  fill: "#6b7280",
                  fontWeight: 500,
                }}
                className="text-xs"
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{
                  fontSize: 10,
                  fill: "#9ca3af",
                }}
                tickCount={6}
              />
              <Radar
                name="currentMonth"
                dataKey="currentMonth"
                stroke={chartColors.primary}
                fill={chartColors.primary}
                fillOpacity={0.2}
                strokeWidth={2}
                dot={{ fill: chartColors.primary, strokeWidth: 2, r: 4 }}
              />
              <Radar
                name="previousMonth"
                dataKey="previousMonth"
                stroke={chartColors.secondary}
                fill={chartColors.secondary}
                fillOpacity={0.1}
                strokeWidth={2}
                dot={{ fill: chartColors.secondary, strokeWidth: 2, r: 3 }}
              />
              <Radar
                name="target"
                dataKey="target"
                stroke={chartColors.quaternary}
                fill={chartColors.quaternary}
                fillOpacity={0.05}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: chartColors.quaternary, strokeWidth: 2, r: 3 }}
              />
              <Tooltip content={<ProductPerformanceRadarChartTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductPerformanceRadarChart;
