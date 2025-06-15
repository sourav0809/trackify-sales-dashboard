interface LegendProps {
  payload?: Array<{
    value: string;
    color: string;
  }>;
  statusColors: Record<string, string>;
}

const OrderStatusDistributionChartLegend = ({ statusColors }: LegendProps) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
      {Object.entries(statusColors).map(([status, color]) => (
        <div key={status} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm text-muted-foreground font-medium capitalize">
            {status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusDistributionChartLegend;
