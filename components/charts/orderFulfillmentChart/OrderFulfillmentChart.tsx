import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { chartColors } from "@/constants/style.const";
import OrderFulfillmentChartTooltip from "./Tooltip";
import OrderFulfillmentChartLegend from "./Legend";

const OrderFulfillmentChart = () => {
  const orderFulfillmentData = useSelector(
    (state: RootState) => state.chart.orderFulfillment
  );

  return (
    <motion.div
      className="bg-card rounded-2xl p-4 shadow-sm border border-border w-full h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="pb-6 flex items-center h-[4rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg primary-heading">Order Fulfillment Metrics</h2>
      </motion.div>

      <div className="flex flex-col h-[calc(100%-7rem)]">
        <motion.div
          className="h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={orderFulfillmentData}
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
              />
              <Tooltip content={<OrderFulfillmentChartTooltip />} />
              <Line
                type="monotone"
                dataKey="processingTime"
                stroke={chartColors.primary}
                strokeWidth={3}
                dot={{ fill: chartColors.primary, strokeWidth: 2 }}
                activeDot={{ r: 6, fill: chartColors.primary }}
              />
              <Line
                type="monotone"
                dataKey="deliveryTime"
                stroke={chartColors.secondary}
                strokeWidth={3}
                dot={{ fill: chartColors.secondary, strokeWidth: 2 }}
                activeDot={{ r: 6, fill: chartColors.secondary }}
              />
              <Line
                type="monotone"
                dataKey="returnRate"
                stroke={chartColors.tertiary}
                strokeWidth={3}
                dot={{ fill: chartColors.tertiary, strokeWidth: 2 }}
                activeDot={{ r: 6, fill: chartColors.tertiary }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Legend */}
      <OrderFulfillmentChartLegend />
    </motion.div>
  );
};

export default OrderFulfillmentChart;
