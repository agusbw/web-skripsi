import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RedirectDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  if (session?.user.role === "WARGA") {
    if (session?.user.id_warga === undefined) {
      return redirect("/warga/biodata");
    }

    return redirect("/warga");
  }

  if (session?.user.role === "ADMIN") {
    return redirect("/admin");
  }

  return <div>Redirecting... </div>;
}
