import { motion } from "framer-motion";

const RevenueChartLegend = () => (
  <motion.div
    className="h-[3rem] pt-2 pb-4 flex items-center justify-center"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
  >
    <motion.div
      className="flex items-center justify-center gap-6 w-full text-xs sm:text-[0.8rem] h-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.3 }}
    >
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
        <span className="text-sm text-muted-foreground font-medium">
          Online Sales
        </span>
      </motion.div>
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
        <span className="text-sm text-muted-foreground font-medium">
          Offline Sales
        </span>
      </motion.div>
    </motion.div>
  </motion.div>
);

export default RevenueChartLegend;
