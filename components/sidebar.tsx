import SidebarList from "@/components/sidebar-list";
import { getCurrentSession } from "@/lib/auth";
import { fetchUserDisplayName } from "@/lib/data";

const Sidebar = async () => {
  const session = await getCurrentSession();

  if (!session) {
    return;
  }

  const data = await fetchUserDisplayName();

  return (
    <>
      <div className="sticky top-0 hidden w-3/12 h-screen transition-all duration-300 border-r border-slate-300 lg:block">
        <p
          className={`mt-16 text-xl px-3 transition inline-block mx-auto w-full py-4  text-center  font-semibold`}
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
