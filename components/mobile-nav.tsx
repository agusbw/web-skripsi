import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import * as React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SidebarList from "./sidebar-list";
import { fetchWargaByUserId } from "@/lib/data";

import { redirect } from "next/navigation";

const MobileNav = async () => {
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
    <div
      className={
        "lg:hidden py-5 px-5 border-b border-2 font-semibold flex justify-between"
      }
    >
      <p className={"text-xl"}>SIPSK</p>
      <Sheet>
        <SheetTrigger>
          <div className="p-2 border rounded-md border-primary/20">
            <span className="after:content-[''] after:block after:h-0.5 after:mb-1 after:rounded-full after:w-5 after:bg-primary"></span>
            <span className="after:content-[''] after:block after:h-0.5 after:mb-1 after:rounded-full after:w-5 after:bg-primary"></span>
            <span className="after:content-[''] after:block after:h-0.5  after:rounded-full after:w-5 after:bg-primary"></span>
          </div>
        </SheetTrigger>
        <SheetContent className="">
          <div
            className={
              "flex flex-col space-y-4 text-center mt-10 sm:text-left "
            }
          >
            <SidebarList session={session} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
