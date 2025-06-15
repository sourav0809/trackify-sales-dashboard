interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    fill: string;
  }>;
  label?: string;
  statusColors: Record<string, string>;
}

const OrderStatusDistributionChartTooltip = ({
  active,
  payload,
  label,
}: TooltipProps) => {
  if (active && payload && payload.length) {
    const delivered = payload.find((p) => p.name === "delivered")?.value || 0;
    const returned = payload.find((p) => p.name === "returned")?.value || 0;
    const cancelled = payload.find((p) => p.name === "cancelled")?.value || 0;
    const pending = payload.find((p) => p.name === "pending")?.value || 0;
    const returnRate = ((returned / delivered) * 100).toFixed(1);

    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-xl animate-scale-in">
        <p className="font-semibold text-foreground text-sm mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            Delivered:{" "}
            <span className="font-medium text-foreground">
              {delivered.toLocaleString()}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Returned:{" "}
            <span className="font-medium text-foreground">
              {returned.toLocaleString()}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Cancelled:{" "}
            <span className="font-medium text-foreground">
              {cancelled.toLocaleString()}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Pending:{" "}
            <span className="font-medium text-foreground">
              {pending.toLocaleString()}
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Return Rate:{" "}
            <span className="font-medium text-foreground">{returnRate}%</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default OrderStatusDistributionChartTooltip;
