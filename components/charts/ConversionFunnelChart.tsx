import React from "react";
import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { chartColors } from "@/constants/style.const";

const ConversionFunnelChart = () => {
  const conversionHistoryData = useSelector(
    (state: RootState) => state.chart.conversionHistory
  );

  const getStageColor = (index: number) => {
    switch (index) {
      case 0:
        return chartColors.primary;
      case 1:
        return chartColors.secondary;
      case 2:
        return chartColors.tertiary;
      case 3:
        return chartColors.quaternary;
      case 4:
        return chartColors.quinary;
      default:
        return chartColors.primary;
    }
  };

  return (
    <motion.div
      className="bg-card rounded-2xl p-4 shadow-sm border border-border w-full h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title */}
      <motion.div
        className="pb-6 flex items-center h-[4rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg primary-heading">Customer Conversion Journey</h2>
      </motion.div>

      {/* Chart + Legend container */}
      <div className="flex flex-col h-[calc(100%-4rem)]">
        {/* Chart */}
        <motion.div
          className="h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip content={<CustomTooltip />} />
              <Funnel
                data={conversionHistoryData}
                dataKey="value"
                nameKey="name"
                isAnimationActive
              >
                {conversionHistoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getStageColor(index)} />
                ))}
                <LabelList
                  position="center"
                  content={
                    <CustomLabel
                      x={0}
                      y={0}
                      width={0}
                      height={0}
                      value={0}
                      name={""}
                      getStageColor={getStageColor}
                    />
                  }
                  stroke="none"
                />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ConversionFunnelChart;

const CustomTooltip = ({
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

interface CustomLabelProps {
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
  name: string;
  getStageColor: (index: number) => string;
}

const CustomLabel = (props: CustomLabelProps) => {
  const { x, y, width, height, value, name } = props;
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  const conversionHistoryData = useSelector(
    (state: RootState) => state.chart.conversionHistory
  );
  const conversionRate = (
    (value / conversionHistoryData[0].value) *
    100
  ).toFixed(1);

  return (
    <g>
      <text
        x={centerX}
        y={centerY - 10}
        textAnchor="middle"
        fill="#1e293b"
        className="text-sm font-medium"
      >
        {name}
      </text>
      <text
        x={centerX}
        y={centerY + 10}
        textAnchor="middle"
        fill="#64748b"
        className="text-xs"
      >
        {value.toLocaleString()} ({conversionRate}%)
      </text>
    </g>
  );
};
