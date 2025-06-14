import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/common/ui/card";
import { Button } from "@/components/common/ui/button";
import {
  Download,
  ShoppingBag,
  Package,
  CheckCircle,
  Users,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  metricsCardBgColors,
  metricsDataIconBgColors,
} from "@/constants/style.const";

const iconMap = [
  <ShoppingBag key="shopping-bag" className="size-6 text-pink-500" />,
  <Package key="package" className="size-6 text-orange-500" />,
  <CheckCircle key="check-circle" className="size-6 text-green-500" />,
  <Users key="users" className="size-6 text-purple-500" />,
];

const TodayMetrics = () => {
  const todayMetrics = useSelector(
    (state: RootState) => state.chart.todayMetrics
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  return (
    <div className="w-full h-full mx-auto p-4 md:p-6 lg:p-8 bg-white overflow-y-auto scrollbar-light">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-lg sm:text-3xl font-bold text-foreground mb-1">
            Today&apos;s Sales
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Sales Summary
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 sm:mt-0"
        >
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-sm font-medium bg-background hover:bg-accent"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </motion.div>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        className="grid gap-4 md:gap-6 [grid-template-columns:repeat(auto-fit,minmax(7rem,1fr))] sm:[grid-template-columns:repeat(auto-fit,minmax(10rem,1fr))]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {todayMetrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            variants={cardVariants}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`relative overflow-hidden border-0 shadow-sm max-h-[10rem] sm:max-h-[13rem] hover:shadow-md transition-all duration-300 ${metricsCardBgColors[index]}`}
            >
              {/* Icon */}
              <div className="absolute top-4 right-4 opacity-80">
                <div
                  className={`size-8 sm:size-12 rounded-full ${metricsDataIconBgColors[index]} flex items-center justify-center`}
                >
                  {iconMap[index]}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <div className="space-y-3">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.3 + index * 0.1,
                      duration: 0.3,
                    }}
                  >
                    <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-foreground">
                      {metric.value}
                    </h3>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.4 + index * 0.1,
                      duration: 0.3,
                    }}
                  >
                    <p className="text-sm md:text-base font-medium text-foreground/80">
                      {metric.title}
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.5 + index * 0.1,
                      duration: 0.3,
                    }}
                  >
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {metric.subtitle}
                    </p>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TodayMetrics;
