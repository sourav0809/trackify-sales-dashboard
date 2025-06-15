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
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { orderStatusDistributionChartStatusColors } from "@/constants/style.const";
import OrderStatusDistributionChartTooltip from "./Tooltip";
import OrderStatusDistributionChartLegend from "./Legend";

const OrderStatusDistributionChart = () => {
  const orderDistributionData = useSelector(
    (state: RootState) => state.chart.orderDistribution
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
                content={
                  <OrderStatusDistributionChartTooltip
                    statusColors={orderStatusDistributionChartStatusColors}
                  />
                }
                cursor={{ fill: "transparent" }}
              />
              <Legend
                content={
                  <OrderStatusDistributionChartLegend
                    statusColors={orderStatusDistributionChartStatusColors}
                  />
                }
              />

              <Bar
                dataKey="delivered"
                stackId="a"
                fill={orderStatusDistributionChartStatusColors.delivered}
                radius={[4, 4, 0, 0]}
                name="delivered"
              />
              <Bar
                dataKey="returned"
                stackId="a"
                fill={orderStatusDistributionChartStatusColors.returned}
                radius={[4, 4, 0, 0]}
                name="returned"
              />
              <Bar
                dataKey="cancelled"
                stackId="a"
                fill={orderStatusDistributionChartStatusColors.cancelled}
                radius={[4, 4, 0, 0]}
                name="cancelled"
              />
              <Bar
                dataKey="pending"
                stackId="a"
                fill={orderStatusDistributionChartStatusColors.pending}
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
