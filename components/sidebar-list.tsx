"use client";

import { adminSidebar, wargaSidebar } from "@/config/site-config";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { isLinkActive } from "@/lib/utils";
import { cn } from "@/lib/utils";

function SidebarList({
  user,
}: {
  user:
    | {
        id: string;
        username: string;
        role: string;
        id_warga?: string | undefined;
      }
    | undefined;
}) {
  const pathname = usePathname();

  const getConfig = (role: string) => {
    if (role === "ADMIN") return adminSidebar;
    if (role === "WARGA") return wargaSidebar;

    return [];
  };

  return (
    <div className="flex flex-col w-full gap-5">
      {user &&
        getConfig(user.role).map((item) => (
          <Link
            key={item.title}
            href={item.path}
            className={cn(
              "p-3 rounded-md hover:bg-primary/10 duration-300 hover:translate-x-3 mx-5 transition active:border-0 active:outline active:outline-accent",
              isLinkActive(pathname, item.path)
                ? "bg-primary/10 translate-x-3 text-primary font-semibold"
                : ""
            )}
          >
            <p className={"flex items-center gap-3"}>
              <span className="text-primary">{item.icon}</span>
              <span>{item.title}</span>
            </p>
          </Link>
        ))}
    </div>
  );
}

export default SidebarList;
