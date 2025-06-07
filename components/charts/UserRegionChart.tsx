import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface ChartData {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

const data: ChartData[] = [
  {
    name: "India",
    value: 30146,
    color: "hsl(142, 76%, 36%)",
    percentage: 30.5,
  },
  {
    name: "United States",
    value: 24900,
    color: "hsl(217, 91%, 60%)",
    percentage: 52.4,
  },
  {
    name: "Canada",
    value: 12146,
    color: "hsl(276, 74%, 68%)",
    percentage: 25.5,
  },
];

const totalVisitors = data.reduce((sum, item) => sum + item.value, 0);

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
      <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-xl animate-scale-in">
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

const UserRegionChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: MouseEvent, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="relative w-full h-80 sm:h-72  bg-white">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={4}
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            animationBegin={0}
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                style={{
                  filter:
                    activeIndex === index ? "brightness(1.1)" : "brightness(1)",
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

      {/* Center Total */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="text-2xl sm:text-4xl lg:text-xl font-bold text-foreground">
            {totalVisitors.toLocaleString()}
          </p>
          <p className="text-sm sm:text-base text-muted-foreground font-medium mt-1">
            Total Visitors
          </p>
        </div>
      </div>
      <CustomLegend />
    </div>
  );
};
export default UserRegionChart;

const CustomLegend: React.FC = () => (
  <div className="flex items-center justify-center gap-6 pb-6 bg-white">
    {data.map((item, index) => (
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
