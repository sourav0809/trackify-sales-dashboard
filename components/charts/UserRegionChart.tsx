import { useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { RootState } from "@/store";
import { regionColors } from "@/constants/style.const";
import { UserRegionChartData } from "@/types/charts.types";

const UserRegionChart: React.FC = () => {
  const userRegionData = useSelector(
    (state: RootState) => state.chart.userRegion
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [radius, setRadius] = useState({ outer: 120, inner: 80 });
  const chartRef = useRef<HTMLDivElement>(null);

  const totalVisitors = userRegionData.reduce(
    (sum, item) => sum + item.value,
    0
  );

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
        const width = chartRef.current.offsetWidth;
        const minDimension = Math.min(width, height);
        const outer = Math.min(120, minDimension / 3) + 20;
        const inner = outer * 0.65;
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

  const getRegionColor = (name: string) => {
    const key = name
      .toLowerCase()
      .replace(/\s+/g, "") as keyof typeof regionColors;
    return regionColors[key] || regionColors.default;
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
        className="flex items-center h-[4rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg primary-heading">Regions</h2>
      </motion.div>

      {/* Chart + Legend container */}
      <div className="flex flex-col h-[calc(100%-4rem)]">
        {/* Chart */}
        <motion.div
          className="flex-1 relative min-h-0"
          ref={chartRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={userRegionData}
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
                {userRegionData.map((entry, index) => {
                  const color = getRegionColor(entry.name);
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={color}
                      style={{
                        filter:
                          activeIndex === index
                            ? "brightness(1.1)"
                            : "brightness(1)",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                      stroke={activeIndex === index ? color : "transparent"}
                      strokeWidth={activeIndex === index ? 2 : 0}
                    />
                  );
                })}
              </Pie>
              <Tooltip
                content={<CustomTooltip getRegionColor={getRegionColor} />}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-base font-bold text-foreground">
                {totalVisitors.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground font-medium mt-1">
                Total Visitors
              </p>
            </div>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          className="h-[3rem] pt-2 pb-4 flex items-center justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <CustomLegend data={userRegionData} getRegionColor={getRegionColor} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserRegionChart;

interface CustomLegendProps {
  data: UserRegionChartData[];
  getRegionColor: (name: string) => string;
}

const CustomLegend: React.FC<CustomLegendProps> = ({
  data,
  getRegionColor,
}) => (
  <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
    {data.map((item, index) => (
      <div key={index} className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: getRegionColor(item.name) }}
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
    payload: UserRegionChartData;
  }[];
  getRegionColor: (name: string) => string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  getRegionColor,
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-xl animate-scale-in">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: getRegionColor(data.name) }}
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
