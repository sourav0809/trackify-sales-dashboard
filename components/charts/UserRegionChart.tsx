import { userRegionChartData } from "@/constants/chartData.const";
import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

interface ChartData {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

const totalVisitors = userRegionChartData.reduce(
  (sum, item) => sum + item.value,
  0
);

const UserRegionChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: MouseEvent, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
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
        <h2 className="text-lg primary-heading">Regions</h2>
      </motion.div>
      <div className="flex flex-col h-[calc(100%-9rem)] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={userRegionChartData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={6}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              animationBegin={0}
              animationDuration={800}
            >
              {userRegionChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  style={{
                    filter:
                      activeIndex === index
                        ? "brightness(1.1)"
                        : "brightness(1)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  stroke={activeIndex === index ? entry.color : "transparent"}
                  strokeWidth={activeIndex === index ? 2 : 0}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="text-xl sm:text-4xl lg:text-xl font-bold text-foreground">
            {totalVisitors.toLocaleString()}
          </p>
          <p className="text-sm sm:text-base text-muted-foreground font-medium mt-1">
            Total Visitors
          </p>
        </div>
      </div>

      <motion.div
        className="h-[5rem] pt-4 pb-4 flex items-center justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <CustomLegend />
      </motion.div>
    </motion.div>
  );
};
export default UserRegionChart;

const CustomLegend: React.FC = () => (
  <div className="flex items-center justify-center gap-6 pb-6 bg-white">
    {userRegionChartData.map((item, index) => (
      <div key={index} className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        <span className="text-sm text-muted-foreground font-medium">
          {item.name}
        </span>
      </div>
    ))}
  </div>
);

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    payload: ChartData;
  }[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-xl animate-scale-in ">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: data.color }}
          />
          <div>
            <p className="font-semibold text-foreground text-sm">{data.name}</p>
            <p className="text-xs text-muted-foreground">
              {data.value.toLocaleString()} visitors ({data.percentage}%)
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};
