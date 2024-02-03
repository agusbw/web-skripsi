import SidebarList from "@/components/sidebar-list";
import { getCurrentSession } from "@/lib/server/auth";
import { fetchUserDisplayName } from "@/lib/server/data";
import Image from "next/image";

const Sidebar = async () => {
  const session = await getCurrentSession();

  if (!session) {
    return;
  }

  const data = await fetchUserDisplayName();

  return (
    <>
      <div className="sticky top-0 hidden w-3/12 h-screen transition-all duration-300 border-r border-slate-300 lg:block">
        <Image
          src="/logo-desa.png"
          alt="Logo Desa"
          width={50}
          height={50}
          className="mx-auto mt-12"
        />
        <p
          className={`text-xl px-3 transition inline-block mx-auto w-full py-4  text-center  font-semibold`}
        >
          Sistem Pengajuan Surat Keterangan
        </p>

        <SidebarList
          session={session}
          displayName={data?.warga?.nama ?? "Warga"}
        />
      </div>
    </>
  );
};

export default Sidebar;
