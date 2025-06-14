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
import { Clock, Truck, RotateCcw } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { chartColors } from "@/constants/style.const";

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
              <Tooltip content={<CustomTooltip />} />
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
      <motion.div
        className="h-[4rem] pt-2 pb-4 flex items-center justify-center px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <CustomLegend />
      </motion.div>
    </motion.div>
  );
};

export default OrderFulfillmentChart;

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
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl shadow-2xl animate-fade-in px-4 py-3 z-50 min-w-[220px]">
        <p className="font-semibold text-foreground text-sm mb-3 border-b border-border pb-2">
          {label}
        </p>

        {payload.map((entry, index) => {
          let labelText = "";
          let Icon: React.ElementType = Clock;
          let unit = "days";

          if (entry.name === "processingTime") {
            labelText = "Processing Time";
            Icon = Clock;
          } else if (entry.name === "deliveryTime") {
            labelText = "Delivery Time";
            Icon = Truck;
          } else if (entry.name === "returnRate") {
            labelText = "Return Rate";
            Icon = RotateCcw;
            unit = "%";
          }

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
                  {entry.value} {unit}
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

const CustomLegend = () => (
  <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 mt-4 pb-4">
    <div className="flex items-center gap-2">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: chartColors.primary }}
      />
      <span className="text-sm text-muted-foreground font-medium">
        Processing Time
      </span>
    </div>
    <div className="flex items-center gap-2">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: chartColors.secondary }}
      />
      <span className="text-sm text-muted-foreground font-medium">
        Delivery Time
      </span>
    </div>
    <div className="flex items-center gap-2">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: chartColors.tertiary }}
      />
      <span className="text-sm text-muted-foreground font-medium">
        Return Rate
      </span>
    </div>
  </div>
);
