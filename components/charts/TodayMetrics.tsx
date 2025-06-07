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

interface MetricCard {
  id: number;
  title: string;
  value: string;
  subtitle: string;
  bgColor: string;
  iconBgColor: string;
  icon: React.ReactNode;
}

const TodayMetrics = () => {
  const metricsData: MetricCard[] = [
    {
      id: 1,
      title: "Total Sales",
      value: "$1k",
      subtitle: "+8.7% from yesterday",
      bgColor: "bg-gradient-to-br from-pink-50 to-pink-100",
      iconBgColor: "bg-pink-200/50",
      icon: <ShoppingBag className="size-6 text-pink-500" />,
    },
    {
      id: 2,
      title: "Total Order",
      value: "300",
      subtitle: "+5.9% from yesterday",
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
      iconBgColor: "bg-orange-200/50",
      icon: <Package className="size-6 text-orange-500" />,
    },
    {
      id: 3,
      title: "Product Sold",
      value: "5",
      subtitle: "+1.2% from yesterday",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      iconBgColor: "bg-green-200/50",
      icon: <CheckCircle className="size-6 text-green-500" />,
    },
    {
      id: 4,
      title: "New Customers",
      value: "8",
      subtitle: "+0.5% from yesterday",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconBgColor: "bg-purple-200/50",
      icon: <Users className="size-6 text-purple-500" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full h-full mx-auto p-4 md:p-6 lg:p-8 bg-white">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {metricsData.map((metric) => (
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
              className={`relative overflow-hidden border-0 shadow-sm h-[13rem] hover:shadow-md transition-all duration-300 ${metric.bgColor}`}
            >
              {/* Background Icon */}
              <div className="absolute top-4 right-4 opacity-80">
                <div
                  className={`size-12 rounded-full ${metric.iconBgColor} flex items-center justify-center`}
                >
                  {metric.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="space-y-3">
                  {/* Value */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + metric.id * 0.1, duration: 0.3 }}
                  >
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                      {metric.value}
                    </h3>
                  </motion.div>

                  {/* Title */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + metric.id * 0.1, duration: 0.3 }}
                  >
                    <p className="text-sm md:text-base font-medium text-foreground/80">
                      {metric.title}
                    </p>
                  </motion.div>

                  {/* Subtitle */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + metric.id * 0.1, duration: 0.3 }}
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
