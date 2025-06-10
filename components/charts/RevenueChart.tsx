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
import { TrendingUp, TrendingDown } from "lucide-react";
import { revenueChartData } from "@/constants/chartData.const";

const chartConfig = {
  onlineSales: {
    label: "Online Sales",
    color: "#3b82f6",
  },
  offlineSales: {
    label: "Offline Sales",
    color: "#34d399",
  },
};

const RevenueChart: React.FC = () => {
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
                data={revenueChartData}
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
                <ChartTooltip content={<CustomTooltipContent />} />
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
      <motion.div
        className="h-[3rem] pt-2 pb-4 flex items-center justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <CustomLegend />
      </motion.div>
    </motion.div>
  );
};

export default RevenueChart;

const CustomTooltipContent = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number }[];
  label?: string;
}) => {
  if (!active || !payload?.length || !label) return null;

  const total = payload.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-lg p-4 min-w-[200px]">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
        <div className="w-2 h-2 rounded-full bg-primary"></div>
        <span className="font-semibold text-foreground text-sm">{label}</span>
      </div>
      <div className="space-y-2">
        {payload.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {item.name === "onlineSales" ? (
                <TrendingUp className="w-3 h-3 text-blue-500" />
              ) : (
                <TrendingDown className="w-3 h-3 text-emerald-400" />
              )}
              <span className="text-xs text-muted-foreground font-medium">
                {item.name === "onlineSales" ? "Online Sales" : "Offline Sales"}
              </span>
            </div>
            <span className="font-mono font-semibold text-foreground text-sm">
              ${item.value.toLocaleString()}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between gap-4 pt-2 mt-2 border-t border-border">
          <span className="text-xs font-semibold text-foreground">Total</span>
          <span className="font-mono font-bold text-foreground text-sm">
            ${total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

const CustomLegend: React.FC = () => (
  <motion.div
    className="flex items-center justify-center gap-6 w-full text-xs sm:text-[0.8rem] h-full"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.3 }}
  >
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
      <span className="text-sm text-muted-foreground font-medium">
        Online Sales
      </span>
    </motion.div>
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
      <span className="text-sm text-muted-foreground font-medium">
        Offline Sales
      </span>
    </motion.div>
  </motion.div>
);
