import { motion } from "framer-motion";
import { gridLayouts } from "@/constants/gridLayouts.const";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import GridItem from "./GridItem";
import RevenueChart from "../charts/RevenueChart";
import VisitorInsightsChart from "../charts/VisitorInsights";
import TodayMetrics from "../charts/TodayMetrics";
import UserRegionChart from "../charts/UserRegionChart";
import ProductSalesCategoryChart from "../charts/ProductSalesCategoryChart";
import InventoryLevelsChart from "../charts/InventoryLevelsChart";
import OrderFulfillmentChart from "../charts/OrderFulfillmentChart";
import ConversionFunnelChart from "../charts/ConversionFunnelChart";
import TopProducts from "../charts/TopProducts";
import OrderStatusDistributionChart from "../charts/OrderStatusDistributionChart";
import ProductBubbleChart from "../charts/ProductBubbleChart";
import ProductPerformanceRadarChart from "../charts/ProductPerformanceRadarChart";
import SalesTrendsComposedChart from "../charts/SalesTrendsComposedChart";
import { useState } from "react";

const ResponsiveGridLayout = WidthProvider(Responsive);

const componentMap: Record<string, React.ReactElement> = {
  todayMetricsChart: <TodayMetrics />,
  visitorInsightChart: <VisitorInsightsChart />,
  userRegionChart: <UserRegionChart />,
  revenueChart: <RevenueChart />,
  productSalesCategoryChart: <ProductSalesCategoryChart />,
  productBubbleChart: <ProductBubbleChart />,
  inventoryLevelChart: <InventoryLevelsChart />,
  orderFulfillmentChart: <OrderFulfillmentChart />,
  conversionFunnelChart: <ConversionFunnelChart />,
  productPerformanceRadarChart: <ProductPerformanceRadarChart />,
  topProducts: <TopProducts />,
  orderStatusDistributionChart: <OrderStatusDistributionChart />,
  salesTrendsComposedChart: <SalesTrendsComposedChart />,
};

const GridLayout = () => {
  const [breakpoint, setBreakpoint] = useState("lg");

  const handleBreakpointChange = (newBreakpoint: string) => {
    setBreakpoint(newBreakpoint);
  };
  console.log("Breakpoint", breakpoint);
  return (
    <div className="w-full mx-auto p-4 ">
      <ResponsiveGridLayout
        className="layout"
        layouts={gridLayouts}
        breakpoints={{ xl: 1100, lg: 800, md: 550, sm: 400 }}
        cols={{ lg: 12, md: 12, sm: 12, xl: 12 }}
        rowHeight={10}
        isDraggable={true}
        isResizable={true}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        onBreakpointChange={handleBreakpointChange}
        onLayoutChange={(value) => {
          console.log(value);
        }}
      >
        {gridLayouts[breakpoint].map((item: { i: string }) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            key={item.i}
          >
            <GridItem>{componentMap[item.i]}</GridItem>
          </motion.div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default GridLayout;
