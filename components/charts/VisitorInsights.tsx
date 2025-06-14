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
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import { motion } from "framer-motion";

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
                content={<CustomTooltip />}
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
        <CustomLegend />
      </motion.div>
    </motion.div>
  );
};

export default VisitorInsightsChart;

const CustomLegend = () => (
  <div className="flex items-center justify-center gap-6 w-ful text-xs sm:text-[0.8rem] flex-wrap ">
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-purple-500"></div>
      <span className="text-muted-foreground font-medium">
        Returning Visitors
      </span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500"></div>
      <span className="text-muted-foreground font-medium">New Visitors</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500"></div>
      <span className="text-muted-foreground font-medium">Total Visitors</span>
    </div>
  </div>
);

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: {
    color: string;
    dataKey: string;
    value: number;
  }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg shadow-lg p-4 min-w-[200px]">
        <p className="text-foreground font-semibold mb-3 text-center">
          {label}
        </p>
        <div className="space-y-3">
          {payload.map(
            (
              entry: { dataKey: string; color: string; value: number },
              index: number
            ) => {
              let Icon = Users;
              let label = "";

              if (entry.dataKey === "returningVisitors") {
                Icon = Users;
                label = "Returning Visitors";
              } else if (entry.dataKey === "newVisitors") {
                Icon = UserPlus;
                label = "New Visitors";
              } else if (entry.dataKey === "totalVisitors") {
                Icon = Eye;
                label = "Total Visitors";
              }

              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <Icon size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground text-sm font-medium">
                      {label}
                    </span>
                  </div>
                  <span className="text-foreground font-bold text-sm">
                    {entry.value.toLocaleString()}
                  </span>
                </div>
              );
            }
          )}
        </div>
      </div>
    );
  }
  return null;
};
