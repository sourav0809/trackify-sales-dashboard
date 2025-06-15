import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { motion } from "framer-motion";
import VisitorInsightsTooltip from "./Tooltip";
import VisitorInsightsLegend from "./Legend";

const VisitorInsightsChart = () => {
  const visitorData = useSelector(
    (state: RootState) => state.chart.visitorInsights
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
        <h2 className="text-lg primary-heading">Visitor Insights</h2>
      </motion.div>

      <div className="flex flex-col h-[calc(100%-7rem)]">
        {/* Chart */}
        <motion.div
          className="h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={visitorData}
              margin={{
                top: 20,
                right: 10,
                left: 5,
                bottom: 20,
              }}
            >
              <CartesianGrid
                horizontal={true}
                stroke="#e5e7eb"
                strokeWidth={2}
                opacity={0.3}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                  fill: "hsl(var(--muted-foreground))",
                  fontWeight: 500,
                }}
                className="text-xs sm:text-sm"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                  fill: "hsl(var(--muted-foreground))",
                  fontWeight: 500,
                }}
                domain={[0, 5000]}
                ticks={[0, 1000, 2000, 3000, 4000, 5000]}
                className="text-xs sm:text-sm"
              />
              <Tooltip
                content={<VisitorInsightsTooltip />}
                cursor={{
                  stroke: "hsl(var(--border))",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
              />
              <Line
                type="monotone"
                dataKey="returningVisitors"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={false}
                activeDot={false}
              />
              <Line
                type="monotone"
                dataKey="newVisitors"
                stroke="#ef4444"
                strokeWidth={3}
                dot={false}
                activeDot={false}
              />
              <Line
                type="monotone"
                dataKey="totalVisitors"
                stroke="#22c55e"
                strokeWidth={3}
                dot={false}
                activeDot={false}
              />
            </LineChart>
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
        <VisitorInsightsLegend />
      </motion.div>
    </motion.div>
  );
};

export default VisitorInsightsChart;
