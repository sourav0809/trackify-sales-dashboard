import React from "react";
import { Globe2, Users, Percent } from "lucide-react";

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  getRegionColor: (name: string) => string;
}

const UserRegionChartTooltip: React.FC<TooltipProps> = ({
  active,
  payload,
  getRegionColor,
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage =
      data.total > 0 ? ((data.value / data.total) * 100).toFixed(1) : "0.0";

    return (
      <div className="bg-background border border-border rounded-lg shadow-lg p-4 min-w-[200px] z-[100] relative">
        {/* Region Name */}
        <div className="flex items-center gap-3 pb-3 border-b border-border">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: getRegionColor(data.name) }}
          />
          <div className="flex items-center gap-2">
            <Globe2 size={16} className="text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">
              {data.name}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2 pt-2">
          {/* Visitors */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Visitors</span>
            </div>
            <span className="text-sm font-semibold text-foreground">
              {data.value.toLocaleString()}
            </span>
          </div>

          {/* Percentage */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Percent size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Percentage</span>
            </div>
            <span className="text-sm font-semibold text-foreground">
              {percentage}%
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default UserRegionChartTooltip;
