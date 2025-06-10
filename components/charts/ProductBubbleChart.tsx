import {
  ProductPerFormanceData,
  productPerformanceData,
} from "@/constants/chartData.const";
import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

const ProductBubbleChart = () => {
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
        <h2 className="text-lg primary-heading"> Product Performance</h2>
      </motion.div>

      {/* Chart + Legend container */}
      <div className="flex flex-col h-[calc(90%-4rem)]">
        {/* Chart */}
        <motion.div
          className="h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="6" />
              <XAxis
                type="number"
                dataKey="unitsSold"
                name="Units Sold"
                domain={[0, "dataMax + 500"]}
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickFormatter={(value) => `${value.toLocaleString()}`}
                label={{
                  value: "Units Sold",
                  position: "bottom",
                  offset: 0,
                  fill: "#64748b",
                  fontSize: 12,
                }}
              />
              <YAxis
                type="number"
                dataKey="revenue"
                name="Revenue"
                domain={[0, "dataMax + 20000"]}
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickFormatter={(value) => `$${value / 1000}k`}
                label={{
                  value: "Revenue",
                  angle: -90,
                  position: "left",
                  offset: 0,
                  fill: "#64748b",
                  fontSize: 12,
                }}
              />
              <ZAxis
                type="number"
                dataKey="popularity"
                range={[50, 400]}
                name="Popularity"
              />
              <Tooltip content={<CustomTooltip />} />

              {productPerformanceData.map((item, index) => (
                <Scatter key={index} data={[item]} fill={item.color} />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Legend */}
      <motion.div
        className="h-[10%] pt-2 pb-4 flex items-center justify-center w-full px-4 my-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <CustomLegend />
      </motion.div>
    </motion.div>
  );
};

export default ProductBubbleChart;

const CustomLegend = () => (
  <div className="flex items-center justify-center gap-y-2 gap-x-3 sm:gap-x-4 sm:gap-y-3 mt-4 pb-4 flex-wrap">
    {productPerformanceData.map((item) => (
      <div key={item.category} className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        <span className="text-sm text-muted-foreground font-medium">
          {item.category}
        </span>
      </div>
    ))}
  </div>
);

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    payload: ProductPerFormanceData;
  }>;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-xl animate-scale-in">
        <p className="font-semibold text-foreground text-sm mb-2">
          {data.name}
        </p>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            Units Sold:{" "}
            <span className="font-medium text-foreground">
              {data.unitsSold.toLocaleString()}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Revenue:{" "}
            <span className="font-medium text-foreground">
              ${data.revenue.toLocaleString()}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Popularity:{" "}
            <span className="font-medium text-foreground">
              {data.popularity}%
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Category:{" "}
            <span className="font-medium text-foreground">{data.category}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};
