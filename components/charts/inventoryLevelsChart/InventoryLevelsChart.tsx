import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import InventoryLevelsChartTooltip from "./Tooltip";
import InventoryLevelsChartLegend from "./Legend";

const InventoryLevelsChart = () => {
  const inventoryData = useSelector(
    (state: RootState) => state.chart.inventoryLevels
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
        <h2 className="text-lg primary-heading">Inventory Levels</h2>
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
            <AreaChart
              data={inventoryData}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid
                strokeDasharray="none"
                stroke="#e5e7eb"
                opacity={0.3}
                horizontal={true}
                vertical={false}
                strokeWidth={2}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                  fontWeight: 500,
                }}
                tickFormatter={(value: number) => `${value}`}
              />
              <Tooltip content={<InventoryLevelsChartTooltip />} />
              <Area
                type="monotone"
                dataKey="currentStock"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="reorderPoint"
                stackId="1"
                stroke="#34d399"
                fill="#34d399"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="safetyStock"
                stackId="1"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Legend */}
        <InventoryLevelsChartLegend />
      </div>
    </motion.div>
  );
};

export default InventoryLevelsChart;
