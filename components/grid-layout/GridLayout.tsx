import { motion } from "framer-motion";
import { layouts } from "@/constants/layouts.const";
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
import ReturnVsDeliveredChart from "../charts/ReturnVsDeliveredChart";
import ProductBubbleChart from "../charts/ProductBubbleChart";
import SalesGaugeChart from "../charts/SalesGaugeChart";

const ResponsiveGridLayout = WidthProvider(Responsive);

const componentMap: Record<string, React.ReactElement> = {
  item1: <TodayMetrics />,
  item2: <VisitorInsightsChart />,
  item3: <UserRegionChart />,
  item4: <RevenueChart />,
  item5: <ProductSalesCategoryChart />,
  item6: <ProductBubbleChart />,
  item7: <InventoryLevelsChart />,
  item8: <OrderFulfillmentChart />,
  item9: <ConversionFunnelChart />,
  item10: <p>Customer Flow Chart</p>,
  item11: <TopProducts />,
  item12: <ReturnVsDeliveredChart />,
  item13: <SalesGaugeChart />,
  item14: <ReturnVsDeliveredChart />,
};

const GridLayout = () => {
  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ xl: 1280, lg: 1024, md: 768, sm: 640 }}
        cols={{ lg: 12, md: 12, sm: 12, xl: 12 }}
        rowHeight={60}
        isDraggable={true}
        isResizable={true}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        onLayoutChange={(value) => {
          console.log(value);
        }}
      >
        {layouts.lg.map((item) => (
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
