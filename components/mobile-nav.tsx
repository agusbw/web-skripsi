import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import * as React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SidebarList from "./sidebar-list";

const MobileNav = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
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
