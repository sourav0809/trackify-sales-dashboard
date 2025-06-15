interface TooltipProps {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
    color: string;
  }[];
  label?: string;
}

const InventoryLevelsChartTooltip = ({
  active,
  payload,
  label,
}: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-xl animate-scale-in">
        <p className="font-semibold text-foreground text-sm mb-2">{label}</p>
        {payload.map(
          (
            entry: { name: string; value: number; color: string },
            index: number
          ) => (
            <div key={index} className="flex items-center gap-3 mb-1 last:mb-0">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <div>
                <span className="text-xs text-muted-foreground">
                  {entry.name}:
                  <span className="font-semibold text-foreground">
                    {entry.value} units
                  </span>
                </span>
              </div>
            </div>
          )
        )}
      </div>
    );
  }
  return null;
};

export default InventoryLevelsChartTooltip;
