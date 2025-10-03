import DashboardNavBar from "@/components/DashboardNavBar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const DashboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }
  return (
    <>
      <DashboardNavBar />
      {children}
    </>
  );
};

export default DashboardLayout;
