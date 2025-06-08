import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const hours = Array.from({ length: 24 }, (_, i) => i);
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const heatmapData = days.flatMap((day, dayIndex) =>
  hours.map((hour) => ({
    day,
    hour,
    value: Math.floor(Math.random() * 100) + 20,
    dayIndex,
  }))
);

const getColor = (value: number) => {
  if (value < 30) return "#dbeafe";
  if (value < 45) return "#bfdbfe";
  if (value < 60) return "#93c5fd";
  if (value < 75) return "#60a5fa";
  if (value < 90) return "#3b82f6";
  return "#2563eb";
};

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    payload: {
      day: string;
      hour: number;
      value: number;
    };
  }>;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-xl animate-scale-in">
        <p className="font-semibold text-foreground text-sm mb-2">
          {data.day} at {String(data.hour).padStart(2, "0")}:00
        </p>
        <p className="text-xs text-muted-foreground">
          Sales:{" "}
          <span className="font-semibold text-foreground">
            {data.value} orders
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = () => (
  <div className="flex items-center justify-center gap-4 mt-4 pb-4">
    <div className="flex items-center gap-2">
      <div
        className="w-3 h-3 rounded-sm"
        style={{ backgroundColor: "#dbeafe" }}
      />
      <span className="text-sm text-muted-foreground font-medium">Low</span>
    </div>
    <div className="flex items-center gap-2">
      <div
        className="w-3 h-3 rounded-sm"
        style={{ backgroundColor: "#60a5fa" }}
      />
      <span className="text-sm text-muted-foreground font-medium">Medium</span>
    </div>
    <div className="flex items-center gap-2">
      <div
        className="w-3 h-3 rounded-sm"
        style={{ backgroundColor: "#2563eb" }}
      />
      <span className="text-sm text-muted-foreground font-medium">High</span>
    </div>
  </div>
);

const SalesHeatmapChart = () => {
  return (
    <div className="bg-card rounded-2xl p-4 sm:p-6 lg:p-5 shadow-sm border border-border w-full h-full">
      <div className="mb-6 mt-4">
        <h2 className="text-xl sm:text-xl font-medium text-[#625b71]">
          Sales by Hour/Day
        </h2>
      </div>

      <div className="h-64 sm:h-80 lg:h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 40,
            }}
          >
            <XAxis
              dataKey="hour"
              type="number"
              domain={[0, 23]}
              tickFormatter={(hour) => `${String(hour).padStart(2, "0")}:00`}
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              dataKey="dayIndex"
              type="number"
              domain={[0, 6]}
              tickFormatter={(index) => days[index]}
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <ZAxis dataKey="value" range={[400, 400]} />
            <Tooltip content={<CustomTooltip />} />
            <Scatter data={heatmapData} shape="square">
              {heatmapData.map((entry, index) => (
                <Cell key={index} fill={getColor(entry.value)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <CustomLegend />
    </div>
  );
};

export default SalesHeatmapChart;
