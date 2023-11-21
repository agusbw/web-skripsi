import SidebarList from "@/components/sidebar-list";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { fetchWargaByUserId } from "@/lib/data";

const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  let fullName = "Admin";

  if (!session) {
    redirect("/api/auth/signin");
  }

  // get fullNamee if it's not an admin
  if (session.user.role === "WARGA" && session.user.id_warga) {
    const warga = await fetchWargaByUserId(session.user.id_warga);
    fullName = warga ? warga.nama : "Warga Desa";
  }

  return (
    <>
      <div className="hidden w-3/12 min-h-screen transition-all duration-300 border-r border-slate-300 lg:block">
        <p
          className={`mt-16 text-2xl px-3 transition inline-block mx-auto w-full py-4  text-center  font-semibold`}
        >
          Sistem Pengajuan Surat Keterangan
        </p>

        <SidebarList session={session} />

        <p className={"px-5 text-center mt-5 text-xs text-muted-foreground"}>
          Website Untuk Skripsinya Bewe
        </p>
      </div>
    </>
  );
};

export default Sidebar;
