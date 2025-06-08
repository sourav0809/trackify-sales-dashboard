import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
interface CategoryData {
  category: string;
  delivered: number;
  returned: number;
  cancelled: number;
  pending: number;
}
const dummyData: CategoryData[] = [
  {
    category: "Dresses",
    delivered: 500,
    returned: 300,
    cancelled: 200,
    pending: 150,
  },
  {
    category: "T-Shirts",
    delivered: 450,
    returned: 250,
    cancelled: 180,
    pending: 100,
  },
  {
    category: "Jeans",
    delivered: 400,
    returned: 230,
    cancelled: 160,
    pending: 90,
  },
  {
    category: "Accessories",
    delivered: 350,
    returned: 200,
    cancelled: 130,
    pending: 80,
  },
  {
    category: "Shoes",
    delivered: 300,
    returned: 180,
    cancelled: 120,
    pending: 70,
  },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    fill: string;
  }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    const delivered = payload.find((p) => p.name === "delivered")?.value || 0;
    const returned = payload.find((p) => p.name === "returned")?.value || 0;
    const cancelled = payload.find((p) => p.name === "cancelled")?.value || 0;
    const pending = payload.find((p) => p.name === "pending")?.value || 0;
    const returnRate = ((returned / delivered) * 100).toFixed(1);

    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-xl animate-scale-in">
        <p className="font-semibold text-foreground text-sm mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            Delivered:{" "}
            <span className="font-medium text-foreground">
              {delivered.toLocaleString()}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Returned:{" "}
            <span className="font-medium text-foreground">
              {returned.toLocaleString()}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Cancelled:{" "}
            <span className="font-medium text-foreground">
              {cancelled.toLocaleString()}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Pending:{" "}
            <span className="font-medium text-foreground">
              {pending.toLocaleString()}
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Return Rate:{" "}
            <span className="font-medium text-foreground">{returnRate}%</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({
  payload,
}: {
  payload?: Array<{
    value: string;
    color: string;
  }>;
}) => {
  if (!payload) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-4 pb-4 flex-wrap">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-muted-foreground font-medium capitalize">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const ReturnVsDeliveredChart = () => {
  return (
    <div className="bg-card rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-border w-full h-full">
      <h2 className="text-xl font-medium text-[#625b71] mb-8">
        Returns vs Delivered
      </h2>

      <div className="h-[300px] sm:h-[400px] lg:h-[500px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={dummyData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="category"
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
            <Legend content={<CustomLegend />} />

            {/* Added Bars for all 4 categories */}
            <Bar
              dataKey="delivered"
              stackId="a"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              name="delivered"
            />
            <Bar
              dataKey="returned"
              stackId="a"
              fill="#f43f5e"
              radius={[4, 4, 0, 0]}
              name="returned"
            />
            <Bar
              dataKey="cancelled"
              stackId="a"
              fill="#f97316"
              radius={[4, 4, 0, 0]}
              name="cancelled"
            />
            <Bar
              dataKey="pending"
              stackId="a"
              fill="#facc15"
              radius={[4, 4, 0, 0]}
              name="pending"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReturnVsDeliveredChart;
