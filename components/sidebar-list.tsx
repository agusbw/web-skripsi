"use client";

import { adminSidebar, wargaSidebar } from "@/config/site-config";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLinkActive } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

function SidebarList({
  session,
  displayName,
}: {
  session: Session;
  displayName: string;
}) {
  const pathname = usePathname();
  const user = session.user;
  const getConfig = (role: string) => {
    if (role === "ADMIN") return adminSidebar;
    if (role === "WARGA") return wargaSidebar;

    return [];
  };

  const generateAvatar = (displayName: string) => {
    const name = displayName.split(" ");
    const firstName = name[0];
    const lastName = name[1];

    if (!firstName) return "WRG";
    if (!lastName) return `${firstName[0]}`;

    return `${firstName[0]}${lastName[0]}`;
  };

  return (
    <>
      <div className="flex items-center gap-2 p-3 my-6 rounded-md bg-primary text-primary-foreground lg:mx-5">
        <Avatar className="w-12 h-12 border shadow-sm border-primary">
          {user.role === "WARGA" && (
            <AvatarFallback className="text-primary bg-primary-foreground">
              {generateAvatar(displayName)}
            </AvatarFallback>
          )}
          {user.role === "ADMIN" && <AvatarImage src="/user.webp" />}
        </Avatar>
        <div className="flex flex-col items-start">
          <div className="">
            <div className="h-2.5 w-2.5 bg-green-400 rounded-full inline-block mr-1"></div>
            <span className="text-xs">Online</span>
          </div>
          <div>
            <p className="line-clamp-1 text-sm font-medium text-left  ">
              {user.role === "WARGA" ? displayName : "Admin Desa Pelapuan"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-3">
        {getConfig(user.role).map((item) => (
          <Link
            key={item.title}
            href={item.path}
            className={cn(
              "p-3 rounded-md duration-300 lg:mx-5 transition active:border-0 active:outline active:outline-accent group/item",
              isLinkActive(pathname, item.path)
                ? "bg-primary text-primary-foreground font-medium"
                : "lg:hover:bg-primary/10"
            )}
          >
            <p
              className={cn(
                "flex items-center gap-3",
                !isLinkActive(pathname, item.path) &&
                  "group-hover/item:text-primary"
              )}
            >
              <span
                className={cn(
                  "text-primary",
                  isLinkActive(pathname, item.path)
                    ? "text-primary-foreground"
                    : ""
                )}
              >
                {item.icon}
              </span>
              <span className="text-left">{item.title}</span>
            </p>
          </Link>
        ))}
        <Button
          className="p-3 rounded-md lg:mx-5"
          variant={"destructive"}
          onClick={() => signOut()}
        >
          Keluar
          <LogOut className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </>
  );
}

export default SidebarList;
