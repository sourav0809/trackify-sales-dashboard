"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setUser, setDashboardLoading } from "@/store/reducers/userReducer";
import agent from "@/agent/agent";
import Cookies from "js-cookie";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const authChecked = useRef(false);
  const { isAuthenticated, dashboardLoading } = useSelector<
    RootState,
    RootState["user"]
  >((state) => state.user);

  useEffect(() => {
    const validateAuth = async () => {
      // Skip if we've already checked auth or if already authenticated
      if (authChecked.current || isAuthenticated) return;

      const token = Cookies.get("token");

      if (!token) {
        dispatch(setDashboardLoading(false));
        router.push("/login");
        return;
      }

      try {
        dispatch(setDashboardLoading(true));
        const response = await agent.Auth.getUser();
        dispatch(setUser({ token, user: response.data.user }));
        authChecked.current = true;
      } catch {
        Cookies.remove("token");
        router.push("/login");
      } finally {
        dispatch(setDashboardLoading(false));
      }
    };

    validateAuth();
  }, [dispatch, router, isAuthenticated]);

  // Show loading state while checking authentication
  if (dashboardLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Only redirect if not loading and not authenticated
  if (!dashboardLoading && !isAuthenticated) {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
}
