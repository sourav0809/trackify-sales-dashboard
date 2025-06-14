import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import { ChartContainer, ChartTooltip } from "@/components/common/ui/chart";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { chartColors } from "@/constants/style.const";

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
      <div className="flex-1 w-full">
        <ChartContainer config={chartConfig}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <ChartTooltip />
            <Bar
              dataKey="onlineSales"
              name="Online Sales"
              fill={chartColors.primary}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="offlineSales"
              name="Offline Sales"
              fill={chartColors.secondary}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </motion.div>
  );
};

export default RevenueChart;
