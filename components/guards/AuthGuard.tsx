"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setUser, setDashboardLoading } from "@/store/reducers/userReducer";
import agent from "@/agent/agent";
import Cookies from "js-cookie";
import Loader from "../Loader";

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
        dispatch(setDashboardLoading(false));
        router.push("/login");
        return;
      }

      try {
        dispatch(setDashboardLoading(true));
        const response = await agent.Auth.getUser();
        dispatch(setUser({ token, user: response.data.user }));
      } catch {
        Cookies.remove("token");
        router.push("/login");
      } finally {
        dispatch(setDashboardLoading(false));
      }
    };

    validateAuth();
  }, [dispatch, router]);

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
