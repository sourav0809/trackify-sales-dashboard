import { Eye, UserPlus, Users } from "lucide-react";

const Tooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: {
    color: string;
    dataKey: string;
    value: number;
  }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg shadow-lg p-4 min-w-[200px]">
        <p className="text-foreground font-semibold mb-3 text-center">
          {label}
        </p>
        <div className="space-y-3">
          {payload.map(
            (
              entry: { dataKey: string; color: string; value: number },
              index: number
            ) => {
              let Icon = Users;
              let label = "";

              if (entry.dataKey === "returningVisitors") {
                Icon = Users;
                label = "Returning Visitors";
              } else if (entry.dataKey === "newVisitors") {
                Icon = UserPlus;
                label = "New Visitors";
              } else if (entry.dataKey === "totalVisitors") {
                Icon = Eye;
                label = "Total Visitors";
              }

              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <Icon size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground text-sm font-medium">
                      {label}
                    </span>
                  </div>
                  <span className="text-foreground font-bold text-sm">
                    {entry.value.toLocaleString()}
                  </span>
                </div>
              );
            }
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default Tooltip;
