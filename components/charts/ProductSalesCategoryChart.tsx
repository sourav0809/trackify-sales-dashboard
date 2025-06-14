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
import { TrendingUp, TrendingDown, Target } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const ProductSalesCategoryChart = () => {
  const productSalesCategoryData = useSelector(
    (state: RootState) => state.chart.productSalesCategory
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
        className="pb-6 flex items-center h-[4rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg primary-heading"> Product Sales Category</h2>
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
              data={productSalesCategoryData}
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
          <div className="flex items-center gap-4">
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
      <div className="bg-background/95 backdrop-blur-md border border-border/40 rounded-xl px-4 py-3 shadow-2xl animate-fade-in z-50 min-w-[200px]">
        <p className="font-semibold text-foreground text-sm mb-3 border-b border-border pb-2">
          {label}
        </p>
        {payload.map((entry, index) => {
          const Icon =
            entry.dataKey === "currentMonth"
              ? TrendingUp
              : entry.dataKey === "previousMonth"
              ? TrendingDown
              : Target;

          const labelText =
            entry.dataKey === "currentMonth"
              ? "Current Month"
              : entry.dataKey === "previousMonth"
              ? "Previous Month"
              : "Target";

          return (
            <div
              key={index}
              className="flex items-center gap-3 mb-2 last:mb-0 text-sm"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <Icon className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="text-muted-foreground">{labelText}</span>
                <span className="text-foreground font-semibold">
                  {entry.value}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return null;
};
