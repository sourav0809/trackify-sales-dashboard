"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Cookies from "js-cookie";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, dashboardLoading } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    const token = Cookies.get("token");

    if (!dashboardLoading) {
      if (isAuthenticated && token) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }
  }, [dashboardLoading, isAuthenticated, router]);

  // Show loading state while checking authentication
  if (dashboardLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return null;
}
