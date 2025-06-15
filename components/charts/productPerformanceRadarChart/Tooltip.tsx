import { motion } from "framer-motion";
import { chartColors } from "@/constants/style.const";

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
  }>;
  label?: string;
}

const ProductPerformanceRadarChartTooltip = ({
  active,
  payload,
  label,
}: TooltipProps) => {
  if (active && payload && payload.length && label) {
    const getColor = (name: string) => {
      switch (name) {
        case "currentMonth":
          return chartColors.primary;
        case "previousMonth":
          return chartColors.secondary;
        case "target":
          return chartColors.quaternary;
        default:
          return chartColors.primary;
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-xl"
      >
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span className="font-semibold text-foreground text-sm">{label}</span>
        </div>
        <div className="space-y-2">
          {payload.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getColor(item.name) }}
                />
                <span className="text-sm text-muted-foreground font-medium">
                  {item.name === "currentMonth"
                    ? "Current"
                    : item.name === "previousMonth"
                    ? "Previous"
                    : "Target"}
                </span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }
  return null;
};

export default ProductPerformanceRadarChartTooltip;
