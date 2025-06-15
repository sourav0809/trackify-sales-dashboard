import { motion } from "framer-motion";
import { UserRegionChartData } from "@/types/charts.types";

interface LegendProps {
  data: UserRegionChartData[];
  getRegionColor: (name: string) => string;
}

const UserRegionChartLegend = ({ data, getRegionColor }: LegendProps) => (
  <motion.div
    className="h-[3rem] pt-2 pb-4 flex items-center justify-center"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
  >
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: getRegionColor(item.name) }}
          />
          <span className="text-sm text-muted-foreground font-medium">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  </motion.div>
);

export default UserRegionChartLegend;
