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
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { chartColors } from "@/constants/style.const";
import ProductBubbleChartTooltip from "./Tooltip";
import ProductBubbleChartLegend from "./Legend";

const ProductPerformanceBubbleChart = () => {
  const productPerformanceData = useSelector(
    (state: RootState) => state.chart.productPerformance
  );

  const getProductColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "bottoms":
        return chartColors.primary;
      case "dresses":
        return chartColors.secondary;
      case "accessories":
        return chartColors.tertiary;
      case "tops":
        return chartColors.quaternary;
      case "activewear":
        return chartColors.quinary;
      case "jewelry":
        return chartColors.senary;
      default:
        return chartColors.primary;
    }
  };

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
        <h2 className="text-lg primary-heading">Product Performance</h2>
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
              <Tooltip
                content={
                  <ProductBubbleChartTooltip
                    getProductColor={getProductColor}
                  />
                }
              />

              {productPerformanceData.map((item, index) => (
                <Scatter
                  key={index}
                  data={[item]}
                  fill={getProductColor(item.category)}
                />
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
        <ProductBubbleChartLegend
          data={productPerformanceData}
          getProductColor={getProductColor}
        />
      </motion.div>
    </motion.div>
  );
};

export default ProductPerformanceBubbleChart;
