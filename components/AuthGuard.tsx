"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setUser, setDashboardLoading } from "@/store/reducers/userReducer";
import agent from "@/agent/agent";
import Cookies from "js-cookie";

const publicPaths = ["/login", "/register"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { isAuthenticated, dashboardLoading } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    const validateAuth = async () => {
      const token = Cookies.get("token");

      // If we're on a public path and there's no token, allow access
      if (publicPaths.includes(pathname) && !token) {
        return;
      }

      // If there's a token, validate it
      if (token) {
        try {
          dispatch(setDashboardLoading(true));
          const response = await agent.Auth.getUser();
          dispatch(setUser({ token, user: response.user }));
        } catch {
          Cookies.remove("token");
          if (!publicPaths.includes(pathname)) {
            router.push("/login");
          }
        } finally {
          dispatch(setDashboardLoading(false));
        }
      } else {
        // No token, redirect to login if trying to access protected route
        if (!publicPaths.includes(pathname)) {
          router.push("/dashboard");
        }
      }
    };

    validateAuth();
  }, [dispatch, pathname, router]);

  useEffect(() => {
    if (!dashboardLoading) {
      // Redirect authenticated users away from auth pages
      if (isAuthenticated && publicPaths.includes(pathname)) {
        router.push("/dashboard");
      }
      // Redirect unauthenticated users to login
      else if (!isAuthenticated && !publicPaths.includes(pathname)) {
        router.push("/login");
      }
    }
  }, [isAuthenticated, dashboardLoading, pathname, router]);

  // Show loading state while checking authentication
  if (dashboardLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show children only if:
  // 1. On public path and not authenticated
  // 2. On protected path and authenticated
  if (
    (publicPaths.includes(pathname) && !isAuthenticated) ||
    (!publicPaths.includes(pathname) && isAuthenticated)
  ) {
    return <>{children}</>;
  }

  // Return null while redirecting
  return null;
}
