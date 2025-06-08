import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const orderData = [
  {
    month: "Jan",
    processingTime: 2.5,
    deliveryTime: 3.8,
    returnRate: 1.2,
  },
  {
    month: "Feb",
    processingTime: 2.2,
    deliveryTime: 3.5,
    returnRate: 1.4,
  },
  {
    month: "Mar",
    processingTime: 2.8,
    deliveryTime: 4.0,
    returnRate: 1.1,
  },
  {
    month: "Apr",
    processingTime: 2.3,
    deliveryTime: 3.6,
    returnRate: 1.3,
  },
  {
    month: "May",
    processingTime: 2.1,
    deliveryTime: 3.4,
    returnRate: 1.0,
  },
  {
    month: "Jun",
    processingTime: 2.4,
    deliveryTime: 3.7,
    returnRate: 1.2,
  },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
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
                  {entry.name === "processingTime"
                    ? "Processing Time"
                    : entry.name === "deliveryTime"
                    ? "Delivery Time"
                    : "Return Rate"}
                  :
                  <span className="font-semibold text-foreground">
                    {entry.value} {entry.name === "returnRate" ? "%" : "days"}
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
        Processing Time
      </span>
    </div>
    <div className="flex items-center gap-2">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: "#34d399" }}
      />
      <span className="text-sm text-muted-foreground font-medium">
        Delivery Time
      </span>
    </div>
    <div className="flex items-center gap-2">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: "#8b5cf6" }}
      />
      <span className="text-sm text-muted-foreground font-medium">
        Return Rate
      </span>
    </div>
  </div>
);

const OrderFulfillmentChart = () => {
  return (
    <div className="bg-card rounded-2xl p-4 sm:p-6 lg:p-5 shadow-sm border border-border w-full h-full">
      <div className="mb-6 mt-4">
        <h2 className="text-xl sm:text-xl font-medium text-[#625b71]">
          Order Fulfillment Metrics
        </h2>
      </div>

      <div className="h-64 sm:h-80 lg:h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={orderData}
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
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="processingTime"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "#3b82f6" }}
            />
            <Line
              type="monotone"
              dataKey="deliveryTime"
              stroke="#34d399"
              strokeWidth={3}
              dot={{ fill: "#34d399", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "#34d399" }}
            />
            <Line
              type="monotone"
              dataKey="returnRate"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: "#8b5cf6", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "#8b5cf6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <CustomLegend />
    </div>
  );
};

export default OrderFulfillmentChart;
