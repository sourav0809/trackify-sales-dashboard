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
import { getStageColor } from "@/helpers/style.helper";
import ConversionFunnelChartTooltip from "./Tooltip";
import Labels from "./Labels";

const ConversionFunnelChart = () => {
  const conversionHistoryData = useSelector(
    (state: RootState) => state.chart.conversionHistory
  );

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
              <Tooltip content={<ConversionFunnelChartTooltip />} />
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
                    <Labels
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
