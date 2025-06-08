import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const inventoryData = [
  {
    month: "Jan",
    tshirts: 450,
    jeans: 380,
    dresses: 320,
  },
  {
    month: "Feb",
    tshirts: 420,
    jeans: 350,
    dresses: 290,
  },
  {
    month: "Mar",
    tshirts: 500,
    jeans: 420,
    dresses: 380,
  },
  {
    month: "Apr",
    tshirts: 380,
    jeans: 320,
    dresses: 280,
  },
  {
    month: "May",
    tshirts: 450,
    jeans: 380,
    dresses: 340,
  },
  {
    month: "Jun",
    tshirts: 520,
    jeans: 450,
    dresses: 400,
  },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
    color: string;
  }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-xl animate-scale-in">
        <p className="font-semibold text-foreground text-sm mb-2">{label}</p>
        {payload.map(
          (
            entry: { name: string; value: number; color: string },
            index: number
          ) => (
            <div key={index} className="flex items-center gap-3 mb-1 last:mb-0">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <div>
                <span className="text-xs text-muted-foreground">
                  {entry.name}:
                  <span className="font-semibold text-foreground">
                    {entry.value} units
                  </span>
                </span>
              </div>
            </div>
          )
        )}
      </div>
    );
  }
  return null;
};

const CustomLegend = () => (
  <div className="flex flex-wrap justify-center gap-6 mt-4 pb-4">
    <div className="flex items-center gap-2">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: "#3b82f6" }}
      />
      <span className="text-sm text-muted-foreground font-medium">
        T-Shirts
      </span>
    </div>
    <div className="flex items-center gap-2">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: "#34d399" }}
      />
      <span className="text-sm text-muted-foreground font-medium">Jeans</span>
    </div>
    <div className="flex items-center gap-2">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: "#8b5cf6" }}
      />
      <span className="text-sm text-muted-foreground font-medium">Dresses</span>
    </div>
  </div>
);

const InventoryLevelsChart = () => {
  return (
    <div className="bg-card rounded-2xl p-4 sm:p-6 lg:p-5 shadow-sm border border-border w-full h-full">
      <div className="mb-6 mt-4">
        <h2 className="text-xl sm:text-xl font-medium text-[#625b71]">
          Inventory Levels
        </h2>
      </div>

      <div className="h-64 sm:h-80 lg:h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={inventoryData}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 20,
            }}
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
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 12,
                fontWeight: 500,
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 12,
                fontWeight: 500,
              }}
              tickFormatter={(value: number) => `${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="tshirts"
              stackId="1"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.2}
            />
            <Area
              type="monotone"
              dataKey="jeans"
              stackId="1"
              stroke="#34d399"
              fill="#34d399"
              fillOpacity={0.2}
            />
            <Area
              type="monotone"
              dataKey="dresses"
              stackId="1"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <CustomLegend />
    </div>
  );
};

export default InventoryLevelsChart;
