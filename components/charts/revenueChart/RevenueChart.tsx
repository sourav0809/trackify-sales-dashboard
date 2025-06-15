import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { ChartContainer, ChartTooltip } from "@/components/common/ui/chart";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { chartColors } from "@/constants/style.const";
import RevenueChartTooltip from "./Tooltip";
import RevenueChartLegend from "./Legend";

const chartConfig = {
  onlineSales: {
    label: "Online Sales",
    color: chartColors.primary,
  },
  offlineSales: {
    label: "Offline Sales",
    color: chartColors.secondary,
  },
};

const RevenueChart: React.FC = () => {
  const revenueData = useSelector((state: RootState) => state.chart.revenue);
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
            <ChartContainer config={chartConfig}>
              <BarChart
                data={revenueData}
                margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                barCategoryGap="15%"
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
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "hsl(var(--muted-foreground))",
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "hsl(var(--muted-foreground))",
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                  tickFormatter={(value: number) => `${value / 1000}k`}
                />
                <ChartTooltip content={<RevenueChartTooltip />} />
                <Bar
                  dataKey="onlineSales"
                  fill="var(--color-onlineSales)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={60}
                />
                <Bar
                  dataKey="offlineSales"
                  fill="var(--color-offlineSales)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={60}
                />
              </BarChart>
            </ChartContainer>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Legend */}
      <RevenueChartLegend />
    </motion.div>
  );
};

export default RevenueChart;
