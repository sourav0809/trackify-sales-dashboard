import { TrendingUp, TrendingDown } from "lucide-react";

interface TooltipProps {
  active?: boolean;
  payload?: { name: string; value: number }[];
  label?: string;
}

const RevenueChartTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload?.length || !label) return null;

  const total = payload.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-lg p-4 min-w-[200px] z-80">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
        <div className="w-2 h-2 rounded-full bg-primary"></div>
        <span className="font-semibold text-foreground text-sm">{label}</span>
      </div>
      <div className="space-y-2">
        {payload.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {item.name === "onlineSales" ? (
                <TrendingUp className="w-3 h-3 text-blue-500" />
              ) : (
                <TrendingDown className="w-3 h-3 text-emerald-400" />
              )}
              <span className="text-xs text-muted-foreground font-medium">
                {item.name === "onlineSales" ? "Online Sales" : "Offline Sales"}
              </span>
            </div>
            <span className="font-mono font-semibold text-foreground text-sm">
              ${item.value.toLocaleString()}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between gap-4 pt-2 mt-2 border-t border-border">
          <span className="text-xs font-semibold text-foreground">Total</span>
          <span className="font-mono font-bold text-foreground text-sm">
            ${total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RevenueChartTooltip;
