import AuthGuard from "@/components/AuthGuard";
import DashboardNavBar from "@/components/DashboardNavBar";

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
