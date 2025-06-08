import React from "react";
import { ResponsiveContainer } from "recharts";

interface Product {
  id: string;
  name: string;
  popularity: number;
  sales: number;
  color: string;
}

const dummyData: Product[] = [
  {
    id: "01",
    name: "Designer Denim Collection",
    popularity: 85,
    sales: 45,
    color: "#3b82f6",
  },
  {
    id: "02",
    name: "Summer Maxi Dresses",
    popularity: 75,
    sales: 29,
    color: "#34d399",
  },
  {
    id: "03",
    name: "Luxury Handbags",
    popularity: 65,
    sales: 18,
    color: "#a78bfa",
  },
  {
    id: "04",
    name: "Athletic Wear Set",
    popularity: 45,
    sales: 23,
    color: "#fbbf24",
  },
];

const TopProducts = () => {
  return (
    <div className="bg-card rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-border w-full h-full">
      <h2 className="text-xl font-medium text-[#1d1b20] mb-8">Top Products</h2>

      <div className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <div className="space-y-8">
            <div className="grid grid-cols-12 text-sm text-[#625b71]">
              <div className="col-span-1">#</div>
              <div className="col-span-5">Name</div>
              <div className="col-span-4">Popularity</div>
              <div className="col-span-2 text-right">Sales</div>
            </div>

            {dummyData.map((product) => (
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
    </div>
  );
};

export default TopProducts;
