import { TrendingUp, TrendingDown, Target } from "lucide-react";

interface TooltipProps {
  active?: boolean;
  payload?: {
    color: string;
    dataKey: string;
    value: number;
  }[];
  label?: string;
}

const ProductSalesCategoryChartTooltip = ({
  active,
  payload,
  label,
}: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-md border border-border/40 rounded-xl px-4 py-3 shadow-2xl animate-fade-in z-50 min-w-[200px]">
        <p className="font-semibold text-foreground text-sm mb-3 border-b border-border pb-2">
          {label}
        </p>
        {payload.map((entry, index) => {
          const Icon =
            entry.dataKey === "currentMonth"
              ? TrendingUp
              : entry.dataKey === "previousMonth"
              ? TrendingDown
              : Target;

          const labelText =
            entry.dataKey === "currentMonth"
              ? "Current Month"
              : entry.dataKey === "previousMonth"
              ? "Previous Month"
              : "Target";

          return (
            <div
              key={index}
              className="flex items-center gap-3 mb-2 last:mb-0 text-sm"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <Icon className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="text-muted-foreground">{labelText}</span>
                <span className="text-foreground font-semibold">
                  {entry.value}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return null;
};

export default ProductSalesCategoryChartTooltip;
