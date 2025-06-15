import { UserRegionChartData } from "@/types/charts.types";

interface TooltipProps {
  active?: boolean;
  payload?: {
    payload: UserRegionChartData;
  }[];
  getRegionColor: (name: string) => string;
}

const UserRegionChartTooltip = ({
  active,
  payload,
  getRegionColor,
}: TooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-xl animate-scale-in">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: getRegionColor(data.name) }}
          />
          <div>
            <p className="font-semibold text-foreground text-sm">{data.name}</p>
            <p className="text-xs text-muted-foreground">
              {data.value.toLocaleString()} visitors ({data.percentage}%)
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default UserRegionChartTooltip;
