"use client";
import { motion } from "framer-motion";
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
import { useSelector } from "react-redux";
import { RootState } from "@/store";

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

interface GridLayoutProps {
  isEditing?: boolean;
  editedLayouts?: any;
  onLayoutChange?: (layout: any, layouts: any) => void;
  onBreakpointChange?: (newBreakpoint: string) => void;
}

const GridLayout = ({
  isEditing = false,
  onLayoutChange,
  onBreakpointChange,
}: GridLayoutProps) => {
  const [breakpoint, setBreakpoint] = useState("lg");
  const { layoutConfig } = useSelector((state: RootState) => state.user);

  const handleBreakpointChange = (newBreakpoint: string) => {
    setBreakpoint(newBreakpoint);
    onBreakpointChange?.(newBreakpoint);
  };

  const handleLayoutChange = (layout: any, layouts: any) => {
    onLayoutChange?.(layout, layouts);
  };

  return (
    <motion.div
      className="w-full mx-auto p-4"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      <ResponsiveGridLayout
        className="layout"
        layouts={layoutConfig}
        breakpoints={{ xl: 1100, lg: 800, md: 550, sm: 400 }}
        cols={{ lg: 12, md: 12, sm: 12, xl: 12 }}
        rowHeight={10}
        isDraggable={isEditing}
        isResizable={isEditing}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        onBreakpointChange={handleBreakpointChange}
        onLayoutChange={handleLayoutChange}
      >
        {layoutConfig[breakpoint].map((item: { i: string }) => (
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
    </motion.div>
  );
};

export default GridLayout;
