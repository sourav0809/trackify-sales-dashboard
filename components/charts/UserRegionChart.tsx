import { userRegionChartData } from "@/constants/chartData.const";
import React, { useEffect, useRef, useState } from "react";
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
  const [radius, setRadius] = useState({ outer: 120, inner: 80 });
  const chartRef = useRef<HTMLDivElement>(null);

  const onPieEnter = (_: MouseEvent, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (chartRef.current) {
        const height = chartRef.current.offsetHeight;
        // Cap outer radius to avoid overflowing small containers
        const outer = Math.min(120, height / 2.5);
        const inner = outer - 40; // Maintain 40px gap between inner and outer
        setRadius({ outer, inner });
      }
    });

    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <motion.div
      ref={chartRef}
      className="bg-card rounded-2xl p-4 shadow-sm border border-border w-full h-full flex flex-col min-h-[250px] relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title */}
      <motion.div
        className="pb-4 flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg primary-heading">Regions</h2>
      </motion.div>

      {/* Chart */}
      <div className="flex-1 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={userRegionChartData}
              cx="50%"
              cy="50%"
              innerRadius={radius.inner}
              outerRadius={radius.outer}
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

        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-foreground">
              {totalVisitors.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              Total Visitors
            </p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <motion.div
        className="pt-2 flex items-center justify-center"
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
