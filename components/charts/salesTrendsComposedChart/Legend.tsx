import { chartColors } from "@/constants/style.const";

interface LegendProps {
  payload?: Array<{
    value: string;
    type: string;
  }>;
}

const getColor = (value: string) => {
  switch (value) {
    case "revenue":
      return chartColors.primary;
    case "orders":
      return chartColors.secondary;
    case "conversionRate":
      return chartColors.quaternary;
    case "target":
      return chartColors.senary;
    default:
      return chartColors.primary;
  }
};

const getLegendLabel = (value: string) => {
  switch (value) {
    case "revenue":
      return "Revenue";
    case "orders":
      return "Orders";
    case "conversionRate":
      return "Conversion Rate";
    case "target":
      return "Target";
    default:
      return value;
  }
};

const SalesTrendsChartLegend = ({ payload }: LegendProps) => {
  if (!payload) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
      {payload.map((entry) => (
        <div key={entry.value} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: getColor(entry.value) }}
          />
          <span className="text-sm text-muted-foreground font-medium">
            {getLegendLabel(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SalesTrendsChartLegend;
