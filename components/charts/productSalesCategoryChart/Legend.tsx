import { motion } from "framer-motion";

const ProductSalesCategoryChartLegend = () => (
  <motion.div
    className="h-[3rem] pt-2 pb-4 flex items-center justify-center"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
  >
    {/* Modern Legend */}
    <div className="flex flex-wrap justify-center gap-6">
      <div className="flex items-center gap-4">
        <div
          className="w-4 h-1 rounded-full"
          style={{ backgroundColor: "#3b82f6" }}
        />
        <span className="text-sm font-medium text-foreground">
          Current Month
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div
          className="w-4 h-1 rounded-full"
          style={{ backgroundColor: "#34d399" }}
        />
        <span className="text-sm font-medium text-foreground">
          Previous Month
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div
          className="w-4 h-1 rounded-full"
          style={{ backgroundColor: "#8b5cf6" }}
        />
        <span className="text-sm font-medium text-foreground">Target</span>
      </div>
    </div>
  </motion.div>
);

export default ProductSalesCategoryChartLegend;
