import { motion } from "framer-motion";
import { chartColors } from "@/constants/style.const";

const OrderFulfillmentChartLegend = () => (
  <motion.div
    className="h-[4rem] pt-2 pb-4 flex items-center justify-center px-4"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
  >
    <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 mt-4 pb-4">
      <div className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: chartColors.primary }}
        />
        <span className="text-sm text-muted-foreground font-medium">
          Processing Time
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: chartColors.secondary }}
        />
        <span className="text-sm text-muted-foreground font-medium">
          Delivery Time
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: chartColors.tertiary }}
        />
        <span className="text-sm text-muted-foreground font-medium">
          Return Rate
        </span>
      </div>
    </div>
  </motion.div>
);

export default OrderFulfillmentChartLegend;
