import { RootState } from "@/store";
import { useSelector } from "react-redux";

const Tooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: { name: string; value: number } }>;
}) => {
  const conversionHistoryData = useSelector(
    (state: RootState) => state.chart.conversionHistory
  );

  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const conversionRate = (
      (data.value / conversionHistoryData[0].value) *
      100
    ).toFixed(1);

    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-xl animate-scale-in">
        <p className="font-semibold text-foreground text-sm mb-2">
          {data.name}
        </p>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            Count:{" "}
            <span className="font-semibold text-foreground">
              {data.value.toLocaleString()}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Conversion Rate:{" "}
            <span className="font-semibold text-foreground">
              {conversionRate}%
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default Tooltip;
