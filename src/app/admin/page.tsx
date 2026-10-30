import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard | Shilpee Digital Studio",
  robots: { index: false, follow: false },
};

export default async function AdminHomePage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return <AdminDashboardClient username={session.username} />;
}
