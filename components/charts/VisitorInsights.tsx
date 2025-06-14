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
import { Users, UserPlus, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { chartColors } from "@/constants/style.const";

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

      {/* Chart + Legend container */}
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={visitorData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="totalVisitors"
              stroke={chartColors.primary}
              strokeWidth={2}
              dot={{ fill: chartColors.primary, strokeWidth: 2 }}
              activeDot={{ r: 6, fill: chartColors.primary }}
            />
            <Line
              type="monotone"
              dataKey="newVisitors"
              stroke={chartColors.secondary}
              strokeWidth={2}
              dot={{ fill: chartColors.secondary, strokeWidth: 2 }}
              activeDot={{ r: 6, fill: chartColors.secondary }}
            />
            <Line
              type="monotone"
              dataKey="returningVisitors"
              stroke={chartColors.tertiary}
              strokeWidth={2}
              dot={{ fill: chartColors.tertiary, strokeWidth: 2 }}
              activeDot={{ r: 6, fill: chartColors.tertiary }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" style={{ color: chartColors.primary }} />
          <span className="text-sm text-muted-foreground font-medium">
            Total Visitors
          </span>
        </div>
        <div className="flex items-center gap-2">
          <UserPlus
            className="w-4 h-4"
            style={{ color: chartColors.secondary }}
          />
          <span className="text-sm text-muted-foreground font-medium">
            New Visitors
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4" style={{ color: chartColors.tertiary }} />
          <span className="text-sm text-muted-foreground font-medium">
            Returning Visitors
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default VisitorInsightsChart;
