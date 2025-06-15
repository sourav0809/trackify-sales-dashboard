"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  setDashboardLoading,
  setDashboardLayout,
  setUser,
} from "@/store/reducers/userReducer";
import {
  setChartLoading,
  setRevenueData,
  setMetricsData,
  setUserRegionData,
  setProductSalesCategoryData,
  setProductPerformanceData,
  setProductPerformanceStatistics,
  setOrderFulfillmentData,
  setConversionHistoryData,
  setOrderDistributionData,
  setSalesTrendsData,
  setInventoryLevels,
  setVisitorInsights,
  setTodayMetrics,
  setTopProducts,
} from "@/store/reducers/chartReducer";
import agent from "@/agent/agent";
import Cookies from "js-cookie";
import DashboardLoader from "../DashboardLoader";
import { gridLayouts } from "@/constants/gridLayouts.const";
import { pathNames } from "@/constants/pathname.const";
import { toast } from "sonner";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, dashboardLoading } = useSelector<
    RootState,
    RootState["user"]
  >((state) => state.user);

  useEffect(() => {
    const validateAuth = async () => {
      const token = Cookies.get("token");

      if (!token) {
        router.push(pathNames.login);
        dispatch(setDashboardLoading(false));
        return;
      }

      try {
        dispatch(setDashboardLoading(true));
        dispatch(setChartLoading(true));

        const [
          userResponse,
          revenueResponse,
          metricsResponse,
          userRegionResponse,
          productSalesCategoryResponse,
          productPerformanceResponse,
          productPerformanceStatsResponse,
          orderFulfillmentResponse,
          conversionHistoryResponse,
          orderDistributionResponse,
          salesTrendsResponse,
          inventoryLevelsResponse,
          visitorInsightsResponse,
          todayMetricsResponse,
          topProductsResponse,
        ] = await Promise.all([
          agent.User.getUser(),
          agent.Charts.getRevenue(),
          agent.Charts.getMetrics(),
          agent.Charts.getUserRegion(),
          agent.Charts.getProductSalesCategory(),
          agent.Charts.getProductPerformance(),
          agent.Charts.getProductPerformanceStatistics(),
          agent.Charts.getOrderFulfillment(),
          agent.Charts.getConversionHistory(),
          agent.Charts.getOrderDistribution(),
          agent.Charts.getSalesTrends(),
          agent.Charts.getInventoryLevels(),
          agent.Charts.getVisitorInsights(),
          agent.Charts.getTodayMetrics(),
          agent.Charts.getTopProducts(),
        ]);

        const userResponseData = userResponse.data.user;

        dispatch(setUser({ token, user: userResponseData }));

        if (userResponseData?.preferences?.dashboardLayoutConfig) {
          dispatch(
            setDashboardLayout(
              userResponseData?.preferences?.dashboardLayoutConfig
            )
          );
        } else {
          dispatch(setDashboardLayout(gridLayouts));
        }

        dispatch(setRevenueData(revenueResponse.data));
        dispatch(setMetricsData(metricsResponse.data));
        dispatch(setUserRegionData(userRegionResponse.data));
        dispatch(
          setProductSalesCategoryData(productSalesCategoryResponse.data)
        );
        dispatch(setProductPerformanceData(productPerformanceResponse.data));
        dispatch(
          setProductPerformanceStatistics(productPerformanceStatsResponse.data)
        );
        dispatch(setOrderFulfillmentData(orderFulfillmentResponse.data));
        dispatch(setConversionHistoryData(conversionHistoryResponse.data));
        dispatch(setOrderDistributionData(orderDistributionResponse.data));
        dispatch(setSalesTrendsData(salesTrendsResponse.data));
        dispatch(setInventoryLevels(inventoryLevelsResponse.data));
        dispatch(setVisitorInsights(visitorInsightsResponse.data));
        dispatch(setTodayMetrics(todayMetricsResponse.data));
        dispatch(setTopProducts(topProductsResponse.data));
      } catch (error) {
        Cookies.remove("token");
        router.push(pathNames.login);
        toast.error(
          "Session Expired or some error occurred, please login again"
        );
        console.log(error);
      } finally {
        dispatch(setDashboardLoading(false));
        dispatch(setChartLoading(false));
      }
    };

    validateAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (dashboardLoading) {
    return <DashboardLoader />;
  }

  if (!dashboardLoading && !isAuthenticated) {
    router.push(pathNames.login);
    return null;
  }

  return <>{children}</>;
}
