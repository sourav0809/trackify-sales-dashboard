import { orderDistributionData } from "@/constants/chartData.const";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const OrderStatusDistributionChart = () => {
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
        <h2 className="text-lg primary-heading">Order Distribution</h2>
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
            <BarChart
              data={orderDistributionData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="category"
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={{ stroke: "#e2e8f0" }}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={{ stroke: "#e2e8f0" }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "transparent" }}
              />
              <Legend content={<CustomLegend />} />

              {/* Added Bars for all 4 categories */}
              <Bar
                dataKey="delivered"
                stackId="a"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                name="delivered"
              />
              <Bar
                dataKey="returned"
                stackId="a"
                fill="#f43f5e"
                radius={[4, 4, 0, 0]}
                name="returned"
              />
              <Bar
                dataKey="cancelled"
                stackId="a"
                fill="#f97316"
                radius={[4, 4, 0, 0]}
                name="cancelled"
              />
              <Bar
                dataKey="pending"
                stackId="a"
                fill="#facc15"
                radius={[4, 4, 0, 0]}
                name="pending"
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OrderStatusDistributionChart;

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    fill: string;
  }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    const delivered = payload.find((p) => p.name === "delivered")?.value || 0;
    const returned = payload.find((p) => p.name === "returned")?.value || 0;
    const cancelled = payload.find((p) => p.name === "cancelled")?.value || 0;
    const pending = payload.find((p) => p.name === "pending")?.value || 0;
    const returnRate = ((returned / delivered) * 100).toFixed(1);

    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-xl animate-scale-in">
        <p className="font-semibold text-foreground text-sm mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            Delivered:{" "}
            <span className="font-medium text-foreground">
              {delivered.toLocaleString()}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Returned:{" "}
            <span className="font-medium text-foreground">
              {returned.toLocaleString()}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Cancelled:{" "}
            <span className="font-medium text-foreground">
              {cancelled.toLocaleString()}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Pending:{" "}
            <span className="font-medium text-foreground">
              {pending.toLocaleString()}
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Return Rate:{" "}
            <span className="font-medium text-foreground">{returnRate}%</span>
          </p>
        </div>
      </div>
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
  }>;
}) => {
  if (!payload) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-muted-foreground font-medium capitalize">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};
