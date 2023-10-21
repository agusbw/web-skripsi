"use client";

import { adminSidebar, wargaSidebar } from "@/config/site-config";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { isLinkActive } from "@/lib/utils";

function SidebarList() {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <>
      {/*Render Admin Sidebar*/}
      {session && (
        <>
          {session &&
            session.user?.role === "ADMIN" &&
            adminSidebar.map((item, index) => (
              <Link
                key={item.title}
                href={item.path}
                className={`p-3 rounded-md hover:bg-primary/10  transition-all duration-300 hover:translate-x-3 mx-5 active:outline active:outline-accent ${
                  isLinkActive(pathname, item.path)
                    ? "bg-primary/10 translate-x-3 text-primary font-semibold"
                    : ""
                }`}
              >
                <p className={"flex items-center gap-3"}>
                  <span className="text-primary">{item.icon}</span>
                  {item.title}
                </p>
              </Link>
            ))}

          {/*Render User Sidebar*/}
          {session &&
            session.user?.role === "WARGA" &&
            wargaSidebar.map((item) => (
              <Link
                key={item.title}
                href={item.path}
                className={`p-3 rounded-md hover:bg-primary/10 duration-300 transition-all active:outline active:outline-accent ${
                  isLinkActive(pathname, item.path)
                    ? "bg-primary/10  text-primary font-semibold"
                    : ""
                }`}
              >
                <p className={"flex items-center gap-3"}>
                  <span className="text-primary">{item.icon}</span>
                  {item.title}
                </p>
              </Link>
            ))}
        </>
      )}
    </>
  );
}

export default SidebarList;
