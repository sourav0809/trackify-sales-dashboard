import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface ProductData {
  name: string;
  unitsSold: number;
  revenue: number;
  popularity: number;
  category: string;
  color: string;
}

const dummyData: ProductData[] = [
  {
    name: "Premium Denim Jeans",
    unitsSold: 1200,
    revenue: 89000,
    popularity: 85,
    category: "Bottoms",
    color: "#3b82f6",
  },
  {
    name: "Summer Dresses",
    unitsSold: 800,
    revenue: 64000,
    popularity: 75,
    category: "Dresses",
    color: "#34d399",
  },
  {
    name: "Designer Handbags",
    unitsSold: 400,
    revenue: 120000,
    popularity: 90,
    category: "Accessories",
    color: "#8b5cf6",
  },
  {
    name: "Graphic T-Shirts",
    unitsSold: 2000,
    revenue: 40000,
    popularity: 65,
    category: "Tops",
    color: "#f59e0b",
  },
  {
    name: "Athletic Wear",
    unitsSold: 1500,
    revenue: 75000,
    popularity: 80,
    category: "Activewear",
    color: "#ec4899",
  },
  {
    name: "Luxury Watches",
    unitsSold: 300,
    revenue: 150000,
    popularity: 95,
    category: "Jewelry",
    color: "#dc2626",
  },
  {
    name: "Running Shoes",
    unitsSold: 2500,
    revenue: 125000,
    popularity: 88,
    category: "Footwear",
    color: "#2dd4bf",
  },
  {
    name: "Winter Coats",
    unitsSold: 600,
    revenue: 96000,
    popularity: 70,
    category: "Outerwear",
    color: "#6366f1",
  },
  {
    name: "Designer Sunglasses",
    unitsSold: 1000,
    revenue: 80000,
    popularity: 82,
    category: "Eyewear",
    color: "#fbbf24",
  },
  {
    name: "Leather Belts",
    unitsSold: 1800,
    revenue: 54000,
    popularity: 72,
    category: "Accessories",
    color: "#d946ef",
  },
  {
    name: "Formal Suits",
    unitsSold: 350,
    revenue: 140000,
    popularity: 87,
    category: "Formalwear",
    color: "#0ea5e9",
  },
  {
    name: "Yoga Pants",
    unitsSold: 3000,
    revenue: 105000,
    popularity: 92,
    category: "Activewear",
    color: "#84cc16",
  },
  {
    name: "Designer Scarves",
    unitsSold: 1200,
    revenue: 48000,
    popularity: 68,
    category: "Accessories",
    color: "#f43f5e",
  },
  {
    name: "Casual Sneakers",
    unitsSold: 2200,
    revenue: 110000,
    popularity: 86,
    category: "Footwear",
    color: "#a855f7",
  },
  {
    name: "Beach Swimwear",
    unitsSold: 900,
    revenue: 45000,
    popularity: 78,
    category: "Swimwear",
    color: "#06b6d4",
  },
];

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    payload: ProductData;
  }>;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-xl animate-scale-in">
        <p className="font-semibold text-foreground text-sm mb-2">
          {data.name}
        </p>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            Units Sold:{" "}
            <span className="font-medium text-foreground">
              {data.unitsSold.toLocaleString()}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Revenue:{" "}
            <span className="font-medium text-foreground">
              ${data.revenue.toLocaleString()}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Popularity:{" "}
            <span className="font-medium text-foreground">
              {data.popularity}%
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Category:{" "}
            <span className="font-medium text-foreground">{data.category}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const CustomLegend = () => (
  <div className="flex items-center justify-center gap-4 mt-4 pb-4 flex-wrap">
    {dummyData.map((item) => (
      <div key={item.category} className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        <span className="text-sm text-muted-foreground font-medium">
          {item.category}
        </span>
      </div>
    ))}
  </div>
);

const ProductBubbleChart = () => {
  return (
    <div className="bg-card rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-border w-full h-full">
      <h2 className="text-xl font-medium text-[#625b71] mb-8">
        Product Performance
      </h2>

      <div className="h-[300px] sm:h-[400px] lg:h-[500px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <XAxis
              type="number"
              dataKey="unitsSold"
              name="Units Sold"
              domain={[0, "dataMax + 500"]}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickFormatter={(value) => `${value.toLocaleString()}`}
              label={{
                value: "Units Sold",
                position: "bottom",
                offset: 0,
                fill: "#64748b",
                fontSize: 12,
              }}
            />
            <YAxis
              type="number"
              dataKey="revenue"
              name="Revenue"
              domain={[0, "dataMax + 20000"]}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
              label={{
                value: "Revenue",
                angle: -90,
                position: "left",
                offset: 0,
                fill: "#64748b",
                fontSize: 12,
              }}
            />
            <ZAxis
              type="number"
              dataKey="popularity"
              range={[50, 400]}
              name="Popularity"
            />
            <Tooltip content={<CustomTooltip />} />
            {dummyData.map((item, index) => (
              <Scatter key={index} data={[item]} fill={item.color} />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <CustomLegend />
    </div>
  );
};

export default ProductBubbleChart;
