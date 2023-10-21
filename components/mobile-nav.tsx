import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MobileNavList from "@/components/mobile-nav-list";
import * as React from "react";

const MobileNav = () => {
  return (
    <div
      className={
        "lg:hidden py-5 px-5 border-b border-2 font-semibold flex justify-between"
      }
    >
      <p className={"text-xl"}>SI PEN</p>
      <Sheet>
        <SheetTrigger>Menu</SheetTrigger>
        <SheetContent>
          <div
            className={"flex flex-col space-y-4 text-center sm:text-left mt-32"}
          >
            <p className={"font-semibold text-left text-2xl"}>Dashboard Menu</p>
            <MobileNavList />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
