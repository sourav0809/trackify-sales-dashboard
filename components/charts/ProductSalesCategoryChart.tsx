import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";

const radarData = [
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

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: {
    color: string;
    dataKey: string;
    value: number;
  }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-xl animate-scale-in">
        <p className="font-semibold text-foreground text-sm mb-2">{label}</p>
        {payload.map(
          (
            entry: { color: string; dataKey: string; value: number },
            index: number
          ) => (
            <div key={index} className="flex items-center gap-3 mb-1 last:mb-0">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <div>
                <span className="text-xs text-muted-foreground">
                  {entry.dataKey === "currentMonth"
                    ? "Current"
                    : entry.dataKey === "previousMonth"
                    ? "Previous"
                    : "Target"}
                  :
                  <span className="font-semibold text-foreground">
                    {entry.value}%
                  </span>
                </span>
              </div>
            </div>
          )
        )}
      </div>
    );
  }
  return null;
};

const ProductSalesCategoryChart = () => {
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
      <div className="flex flex-col h-[calc(100%-7rem)]">
        {/* Chart */}
        <motion.div
          className="h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              data={radarData}
              margin={{ top: 30, right: 40, bottom: 30, left: 40 }}
            >
              <PolarGrid
                className="stroke-slate-200"
                strokeWidth={1}
                radialLines={true}
              />
              <PolarAngleAxis
                dataKey="category"
                tick={{
                  fontSize: 11,
                  fill: "#64748b",
                  fontWeight: 500,
                }}
                className="text-sm font-medium"
              />
              <PolarRadiusAxis
                angle={45}
                domain={[0, 100]}
                tick={{ fontSize: 9, fill: "#64748b" }}
                className="text-xs"
                tickCount={4}
              />
              <Radar
                name="Current Month"
                dataKey="currentMonth"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.15}
                strokeWidth={3}
              />
              <Radar
                name="Previous Month"
                dataKey="previousMonth"
                stroke="#34d399"
                fill="#34d399"
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Radar
                name="Target"
                dataKey="target"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.08}
                strokeWidth={2}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Legend */}
      <motion.div
        className="h-[3rem] pt-2 pb-4 flex items-center justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* Modern Legend */}
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-1 rounded-full"
              style={{ backgroundColor: "#3b82f6" }}
            />
            <span className="text-sm font-medium text-foreground">
              Current Month
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-1 rounded-full"
              style={{ backgroundColor: "#34d399" }}
            />
            <span className="text-sm font-medium text-foreground">
              Previous Month
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-1 rounded-full"
              style={{ backgroundColor: "#8b5cf6" }}
            />
            <span className="text-sm font-medium text-foreground">Target</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductSalesCategoryChart;
