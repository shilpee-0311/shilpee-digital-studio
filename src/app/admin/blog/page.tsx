import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { AdminBlogManager } from "@/components/admin/AdminBlogManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog Management | Shilpee Digital Studio Admin",
  robots: { index: false, follow: false },
};

export default async function AdminBlogPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return <AdminBlogManager username={session.username} />;
}
