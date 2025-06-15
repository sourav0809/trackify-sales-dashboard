import React from "react";
import { Clock, Truck, RotateCcw } from "lucide-react";

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const OrderFulfillmentChartTooltip = ({
  active,
  payload,
  label,
}: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl shadow-2xl animate-fade-in px-4 py-3 z-50 min-w-[220px]">
        <p className="font-semibold text-foreground text-sm mb-3 border-b border-border pb-2">
          {label}
        </p>

        {payload.map((entry, index) => {
          let labelText = "";
          let Icon: React.ElementType = Clock;
          let unit = "days";

          if (entry.name === "processingTime") {
            labelText = "Processing Time";
            Icon = Clock;
          } else if (entry.name === "deliveryTime") {
            labelText = "Delivery Time";
            Icon = Truck;
          } else if (entry.name === "returnRate") {
            labelText = "Return Rate";
            Icon = RotateCcw;
            unit = "%";
          }

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
                  {entry.value} {unit}
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

export default OrderFulfillmentChartTooltip;
