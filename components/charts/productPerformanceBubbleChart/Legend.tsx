import { ProductPerFormanceData } from "@/types/charts.types";

interface LegendProps {
  data: ProductPerFormanceData[];
  getProductColor: (category: string) => string;
}

const ProductBubbleChartLegend = ({ data, getProductColor }: LegendProps) => (
  <div className="flex items-center justify-center gap-y-2 gap-x-3 sm:gap-x-4 sm:gap-y-3 mt-4 pb-4 flex-wrap">
    {data.map((item) => (
      <div key={item.category} className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: getProductColor(item.category) }}
        />
        <span className="text-sm text-muted-foreground font-medium">
          {item.category}
        </span>
      </div>
    ))}
  </div>
);

export default ProductBubbleChartLegend;
