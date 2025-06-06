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

const data = [
  {
    month: "Jan",
    loyalCustomers: 320,
    newCustomers: 280,
    uniqueCustomers: 340,
  },
  {
    month: "Feb",
    loyalCustomers: 280,
    newCustomers: 200,
    uniqueCustomers: 320,
  },
  {
    month: "Mar",
    loyalCustomers: 350,
    newCustomers: 180,
    uniqueCustomers: 380,
  },
  {
    month: "Apr",
    loyalCustomers: 200,
    newCustomers: 160,
    uniqueCustomers: 280,
  },
  {
    month: "May",
    loyalCustomers: 180,
    newCustomers: 140,
    uniqueCustomers: 220,
  },
  {
    month: "Jun",
    loyalCustomers: 280,
    newCustomers: 200,
    uniqueCustomers: 300,
  },
  {
    month: "Jul",
    loyalCustomers: 320,
    newCustomers: 240,
    uniqueCustomers: 350,
  },
  {
    month: "Aug",
    loyalCustomers: 380,
    newCustomers: 380,
    uniqueCustomers: 340,
  },
  {
    month: "Sept",
    loyalCustomers: 320,
    newCustomers: 340,
    uniqueCustomers: 320,
  },
  {
    month: "Oct",
    loyalCustomers: 280,
    newCustomers: 300,
    uniqueCustomers: 280,
  },
  {
    month: "Nov",
    loyalCustomers: 200,
    newCustomers: 180,
    uniqueCustomers: 220,
  },
  {
    month: "Dec",
    loyalCustomers: 160,
    newCustomers: 140,
    uniqueCustomers: 180,
  },
];

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

              if (entry.dataKey === "loyalCustomers") {
                Icon = Users;
                label = "Loyal Customers";
              } else if (entry.dataKey === "newCustomers") {
                Icon = UserPlus;
                label = "New Customers";
              } else if (entry.dataKey === "uniqueCustomers") {
                Icon = Eye;
                label = "Unique Customers";
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

const CustomLegend = () => (
  <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 text-xs sm:text-sm pb-4">
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-purple-500"></div>
      <span className="text-muted-foreground font-medium">Loyal Customers</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500"></div>
      <span className="text-muted-foreground font-medium">New Customers</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500"></div>
      <span className="text-muted-foreground font-medium">
        Unique Customers
      </span>
    </div>
  </div>
);

const VisitorInsightsChart = () => {
  return (
    <div className="bg-card rounded-2xl p-4 sm:p-6 lg:p-5 shadow-sm border border-border w-full ">
      <div className="mb-6 mt-4">
        <h2 className="text-xl sm:text-xl font-medium text-[#625b71]">
          Visitor Insights
        </h2>
      </div>

      <div className="w-full h-64 sm:h-80 lg:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
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
              dataKey="month"
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
              domain={[0, 400]}
              ticks={[0, 100, 200, 300, 400]}
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
              dataKey="loyalCustomers"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={false}
              activeDot={false}
            />
            <Line
              type="monotone"
              dataKey="newCustomers"
              stroke="#ef4444"
              strokeWidth={3}
              dot={false}
              activeDot={false}
            />
            <Line
              type="monotone"
              dataKey="uniqueCustomers"
              stroke="#22c55e"
              strokeWidth={3}
              dot={false}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <CustomLegend />
    </div>
  );
};

export default VisitorInsightsChart;
