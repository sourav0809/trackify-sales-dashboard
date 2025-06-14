import React from "react";
import { ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { chartColors } from "@/constants/style.const";

const TopProducts = () => {
  const topProducts = useSelector(
    (state: RootState) => state.chart.topProducts
  );

  // Map of colors for different categories
  const categoryColors = {
    Dresses: chartColors.primary,
    Accessories: chartColors.secondary,
    Bottoms: chartColors.tertiary,
    Jewelry: chartColors.quaternary,
    "Tops & T-Shirts": chartColors.quinary,
  };

  return (
    <motion.div
      className="bg-card rounded-2xl p-4 shadow-sm border border-border w-full h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center h-[4rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="pb-6 primary-heading text-lg">Top Products</h2>
      </motion.div>

      <div className="flex-1 flex flex-col min-h-0">
        {/* Chart */}
        <motion.div
          className="flex-1 min-h-0 pb-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="grid grid-cols-12 text-sm text-[#625b71] mb-4 px-2">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Name</div>
                <div className="col-span-4">Popularity</div>
                <div className="col-span-2 text-right">Sales</div>
              </div>

              {/* Rows Container */}
              <div className="flex-1 flex flex-col justify-between py-2">
                {topProducts.map((product, index) => (
                  <div
                    key={product.name}
                    className="grid grid-cols-12 items-center text-sm px-2 py-2"
                  >
                    <div className="col-span-1 text-[#625b71]">{index + 1}</div>
                    <div className="col-span-5 font-medium text-[#625b71] truncate pr-4">
                      {product.name}
                    </div>
                    <div className="col-span-4 pr-8">
                      <div className="relative h-1.5 w-full rounded-full bg-[#f4f4f5]">
                        <div
                          className="absolute left-0 top-0 h-full rounded-full"
                          style={{
                            width: `${product.popularity}%`,
                            backgroundColor:
                              categoryColors[
                                product.category as keyof typeof categoryColors
                              ] || chartColors.primary,
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-span-2 text-right">
                      <span
                        className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{
                          backgroundColor: `${
                            categoryColors[
                              product.category as keyof typeof categoryColors
                            ] || chartColors.primary
                          }15`,
                          color:
                            categoryColors[
                              product.category as keyof typeof categoryColors
                            ] || chartColors.primary,
                        }}
                      >
                        {product.unitsSold}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TopProducts;
