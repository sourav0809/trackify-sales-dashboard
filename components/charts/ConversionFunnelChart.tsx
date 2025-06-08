import React from "react";
import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
} from "recharts";

const funnelData = [
  {
    value: 12000,
    name: "Visitors",
    fill: "#3b82f6",
  },
  {
    value: 8500,
    name: "Add to Cart",
    fill: "#34d399",
  },
  {
    value: 5200,
    name: "Checkout",
    fill: "#8b5cf6",
  },
  {
    value: 4000,
    name: "Payment",
    fill: "#f59e0b",
  },
  {
    value: 3200,
    name: "Purchase",
    fill: "#ec4899",
  },
];

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: { name: string; value: number } }>;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const conversionRate = ((data.value / funnelData[0].value) * 100).toFixed(
      1
    );

    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-xl animate-scale-in">
        <p className="font-semibold text-foreground text-sm mb-2">
          {data.name}
        </p>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            Count:{" "}
            <span className="font-semibold text-foreground">
              {data.value.toLocaleString()}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Conversion Rate:{" "}
            <span className="font-semibold text-foreground">
              {conversionRate}%
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const CustomLabel = (props: {
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
  name: string;
}) => {
  const { x, y, width, height, value, name } = props;
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  const conversionRate = ((value / funnelData[0].value) * 100).toFixed(1);

  return (
    <g>
      <text
        x={centerX}
        y={centerY - 10}
        textAnchor="middle"
        fill="#1e293b"
        className="text-sm font-medium"
      >
        {name}
      </text>
      <text
        x={centerX}
        y={centerY + 10}
        textAnchor="middle"
        fill="#64748b"
        className="text-xs"
      >
        {value.toLocaleString()} ({conversionRate}%)
      </text>
    </g>
  );
};

const ConversionFunnelChart = () => {
  return (
    <div className="bg-card rounded-2xl p-4 sm:p-6 lg:p-5 shadow-sm border border-border w-full h-full">
      <div className="mb-6 mt-4">
        <h2 className="text-xl sm:text-xl font-medium text-[#625b71]">
          Customer Conversion Journey
        </h2>
      </div>

      <div className="h-64 sm:h-80 lg:h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip content={<CustomTooltip />} />
            <Funnel
              data={funnelData}
              dataKey="value"
              nameKey="name"
              isAnimationActive
            >
              <LabelList
                position="center"
                content={
                  <CustomLabel
                    x={0}
                    y={0}
                    width={0}
                    height={0}
                    value={0}
                    name={""}
                  />
                }
                stroke="none"
              />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ConversionFunnelChart;
