import { motion } from "framer-motion";
import { chartColors } from "@/constants/style.const";

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
  }>;
  label?: string;
}

const getColor = (dataKey: string) => {
  switch (dataKey) {
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

const SalesTrendsChartTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length && label) {
    const revenueData = payload.find((p) => p.dataKey === "revenue");
    const ordersData = payload.find((p) => p.dataKey === "orders");
    const conversionData = payload.find((p) => p.dataKey === "conversionRate");
    const targetData = payload.find((p) => p.dataKey === "target");

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-xl min-w-[250px]"
      >
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span className="font-semibold text-foreground text-sm">
            {label} 2024
          </span>
        </div>
        <div className="space-y-3">
          {revenueData && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getColor(revenueData.dataKey) }}
                />
                <span className="text-sm text-muted-foreground font-medium">
                  Revenue
                </span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                ${(revenueData.value / 1000).toFixed(0)}k
              </span>
            </div>
          )}
          {ordersData && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getColor(ordersData.dataKey) }}
                />
                <span className="text-sm text-muted-foreground font-medium">
                  Orders
                </span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {ordersData.value}
              </span>
            </div>
          )}
          {conversionData && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getColor(conversionData.dataKey) }}
                />
                <span className="text-sm text-muted-foreground font-medium">
                  Conversion Rate
                </span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {conversionData.value}%
              </span>
            </div>
          )}
          {targetData && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getColor(targetData.dataKey) }}
                />
                <span className="text-sm text-muted-foreground font-medium">
                  Target
                </span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                ${(targetData.value / 1000).toFixed(0)}k
              </span>
            </div>
          )}
        </div>
      </motion.div>
    );
  }
  return null;
};

export default SalesTrendsChartTooltip;
