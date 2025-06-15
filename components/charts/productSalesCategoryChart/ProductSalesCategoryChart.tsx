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
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ProductSalesCategoryChartTooltip from "./Tooltip";
import ProductSalesCategoryChartLegend from "./Legend";

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
      <motion.div
        className="pb-6 flex items-center h-[4rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg primary-heading"> Product Sales Category</h2>
      </motion.div>

      <div className="flex flex-col h-[calc(100%-7rem)]">
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
              <Tooltip content={<ProductSalesCategoryChartTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Legend */}
      <ProductSalesCategoryChartLegend />
    </motion.div>
  );
};

export default ProductSalesCategoryChart;
