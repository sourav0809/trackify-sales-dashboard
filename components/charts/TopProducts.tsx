import React from "react";
import { ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { topProducts } from "@/constants/chartData.const";

const TopProducts = () => {
  return (
    <motion.div
      className="bg-card rounded-2xl p-4 shadow-sm border border-border w-full h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="pb-6 flex items-center h-[4rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg primary-heading">Top Products</h2>
      </motion.div>

      <div className="h-full w-full px-4">
        <ResponsiveContainer width="100%" height="100%">
          <div className="space-y-8">
            <div className="grid grid-cols-12 text-sm text-[#625b71]">
              <div className="col-span-1">#</div>
              <div className="col-span-5">Name</div>
              <div className="col-span-4">Popularity</div>
              <div className="col-span-2 text-right">Sales</div>
            </div>

            {topProducts.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-12 items-center text-sm"
              >
                <div className="col-span-1 text-[#625b71]">{product.id}</div>
                <div className="col-span-5 font-medium text-[#625b71] w-[95%]">
                  {product.name}
                </div>
                <div className="col-span-4 pr-8">
                  <div className="relative h-1.5 w-full rounded-full bg-[#f4f4f5]">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full"
                      style={{
                        width: `${product.popularity}%`,
                        backgroundColor: product.color,
                      }}
                    />
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: `${product.color}15`,
                      color: product.color,
                    }}
                  >
                    {product.sales}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default TopProducts;
