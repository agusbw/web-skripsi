"use client";

import SidebarList from "@/components/sidebar-list";
import { outfit } from "@/app/fonts";
import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

const Sidebar = () => {
  const [isWide, setIsWide] = useState(true);

  return (
    <>
      <div
        className={`${
          isWide ? "w-3/12" : "w-[70px]"
        } min-h-screen hidden lg:block  border-r border-2 transition-all duration-300`}
      >
        {isWide ? (
          <div className={"flex flex-col"}>
            <PanelLeftClose
              onClick={() => {
                setIsWide(false);
              }}
              className={
                "mt-5 mb-10 self-end mr-3  text-primary transition cursor-pointer hover:text-primary/80"
              }
            />
          </div>
        ) : (
          <PanelLeftOpen
            onClick={() => {
              setIsWide(true);
            }}
            className={
              "mt-5 mb-44 mx-auto  text-primary transition cursor-pointer hover:text-primary/80"
            }
          />
        )}

        {isWide && (
          <p
            className={`mb-16 text-4xl transition tracking-wide inline-block mx-auto w-full py-4  text-center  font-semibold ${outfit.className}`}
          >
            Dashboard
          </p>
        )}

        <div className={"flex flex-col gap-5"}>
          <SidebarList wide={isWide} />
        </div>

        {isWide && (
          <p className={"px-5 text-center mt-5 text-xs text-muted-foreground"}>
            Skripsi Demo [Server Action Implementation]
          </p>
        )}
      </div>
    </>
  );
};

export default Sidebar;
