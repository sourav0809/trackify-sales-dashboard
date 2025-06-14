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
import Loader from "../Loader";
import { gridLayouts } from "@/constants/gridLayouts.const";

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
        router.push("/login");
        dispatch(setDashboardLoading(false));
        return;
      }

      try {
        dispatch(setDashboardLoading(true));
        dispatch(setChartLoading(true));

        // Fetch user data and all chart data in parallel
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
          agent.Auth.getUser(),
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

        // Update user state
        dispatch(setUser({ token, user: userResponse.user }));
        if (userResponse?.preferences?.dashboardLayoutConfig) {
          dispatch(
            setDashboardLayout(userResponse.preferences.dashboardLayoutConfig)
          );
        } else {
          dispatch(setDashboardLayout(gridLayouts));
        }

        // Update chart state
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
        router.push("/login");
        console.log(error);
      } finally {
        dispatch(setDashboardLoading(false));
        dispatch(setChartLoading(false));
      }
    };

    validateAuth();
  }, []);

  // Show loading state while checking authentication
  if (dashboardLoading) {
    return <Loader />;
  }

  if (!dashboardLoading && !isAuthenticated) {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
}
