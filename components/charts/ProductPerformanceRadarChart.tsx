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
import { productPerformanceStatistics } from "@/constants/chartData.const";

const ProductPerformanceRadarChart = () => {
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
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.2}
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              />
              <Radar
                name="previousMonth"
                dataKey="previousMonth"
                stroke="#34d399"
                fill="#34d399"
                fillOpacity={0.1}
                strokeWidth={2}
                dot={{ fill: "#34d399", strokeWidth: 2, r: 3 }}
              />
              <Radar
                name="target"
                dataKey="target"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.05}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#f59e0b", strokeWidth: 2, r: 3 }}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductPerformanceRadarChart;

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
  }>;
  label?: string;
}) => {
  if (active && payload && payload.length && label) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-xl"
      >
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span className="font-semibold text-foreground text-sm">{label}</span>
        </div>
        <div className="space-y-2">
          {payload.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground font-medium">
                  {item.name === "currentMonth"
                    ? "Current"
                    : item.name === "previousMonth"
                    ? "Previous"
                    : "Target"}
                </span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }
  return null;
};

// const CustomLegend = ({
//   payload,
// }: {
//   payload?: Array<{
//     value: string;
//     color: string;
//   }>;
// }) => {
//   const legendLabels = {
//     currentMonth: "Current Month",
//     previousMonth: "Previous Month",
//     target: "Target",
//   };

//   return (
//     <div className="flex items-center justify-center gap-6 mt-6 pb-4 flex-wrap">
//       {payload?.map((entry, index) => (
//         <motion.div
//           key={index}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: index * 0.1 }}
//           className="flex items-center gap-2"
//         >
//           <div
//             className="w-3 h-3 rounded-full"
//             style={{ backgroundColor: entry.color }}
//           />
//           <span className="text-sm text-muted-foreground font-medium">
//             {legendLabels[entry.value as keyof typeof legendLabels] ||
//               entry.value}
//           </span>
//         </motion.div>
//       ))}
//     </div>
//   );
// };
