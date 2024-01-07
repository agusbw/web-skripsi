import SidebarList from "@/components/sidebar-list";
import { getCurrentSession } from "@/lib/auth";

const Sidebar = async () => {
  const session = await getCurrentSession();

  if (!session) {
    return;
  }

  return (
    <>
      <div className="sticky top-0 hidden w-3/12 h-screen transition-all duration-300 border-r border-slate-300 lg:block">
        <p
          className={`mt-16 text-xl px-3 transition inline-block mx-auto w-full py-4  text-center  font-semibold`}
        >
          Sistem Pengajuan Surat Keterangan
        </p>

        <SidebarList session={session} />
      </div>
    </>
  );
};

export default Sidebar;
