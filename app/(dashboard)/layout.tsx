import Sidebar from "@/components/Sidebar";
import AuthGuard from "@/components/guards/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-50/50">
        <Sidebar />
        <main className="flex-1 ml-20">{children}</main>
      </div>
    </AuthGuard>
  );
}
