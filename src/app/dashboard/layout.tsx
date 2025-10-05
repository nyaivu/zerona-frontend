import AuthGuard from "@/components/AuthGuard";
import DashboardNavBar from "@/components/DashboardNavBar";
import { useSessionStore } from "@/stores/sessionStore";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const DashboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AuthGuard>
      <DashboardNavBar />
      {children}
    </AuthGuard>
  );
};

export default DashboardLayout;
