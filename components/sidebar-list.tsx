"use client";

import { adminSidebar, wargaSidebar } from "@/config/site-config";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLinkActive } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

function SidebarList({ session }: { session: Session }) {
  const pathname = usePathname();
  const user = session.user;
  const getConfig = (role: string) => {
    if (role === "ADMIN") return adminSidebar;
    if (role === "WARGA") return wargaSidebar;

    return [];
  };

  return (
    <>
      <div className="flex items-center gap-2 p-3 my-6 rounded-md bg-primary/10 lg:mx-5">
        <Avatar className="w-12 h-12 border-2 shadow-sm">
          <AvatarImage src="/user.webp" />
        </Avatar>
        <p className="line-clamp-2">{user.display_name}</p>
      </div>
      <div className="flex flex-col w-full gap-3">
        {getConfig(user.role).map((item) => (
          <Link
            key={item.title}
            href={item.path}
            className={cn(
              "p-3 rounded-md lg:hover:bg-primary/10 duration-300 lg:mx-5 transition active:border-0 active:outline active:outline-accent",
              isLinkActive(pathname, item.path)
                ? "bg-primary/10 text-primary font-semibold"
                : ""
            )}
          >
            <p className={"flex items-center gap-3"}>
              <span className="text-primary">{item.icon}</span>
              <span>{item.title}</span>
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
