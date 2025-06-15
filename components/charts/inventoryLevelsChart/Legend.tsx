import { motion } from "framer-motion";

const InventoryLevelsChartLegend = () => (
  <motion.div
    className="h-[3rem] pt-2 pb-4 flex items-center justify-center"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
  >
    <div className="flex flex-wrap justify-center gap-6 mt-4 pb-4">
      <div className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: "#3b82f6" }}
        />
        <span className="text-sm text-muted-foreground font-medium">
          Current Stock
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: "#34d399" }}
        />
        <span className="text-sm text-muted-foreground font-medium">
          Reorder Point
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: "#8b5cf6" }}
        />
        <span className="text-sm text-muted-foreground font-medium">
          Safety Stock
        </span>
      </div>
    </div>
  </motion.div>
);

export default InventoryLevelsChartLegend;
