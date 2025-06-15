import { ProductPerFormanceData } from "@/types/charts.types";

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ProductPerFormanceData;
  }>;
  getProductColor: (category: string) => string;
}

const ProductBubbleChartTooltip = ({ active, payload }: TooltipProps) => {
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

export default ProductBubbleChartTooltip;
