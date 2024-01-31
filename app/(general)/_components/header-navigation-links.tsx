"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EnterIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";

export default function HeaderNavigationLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap sm:items-center gap-8 text-base text-primary justify-between sm:justify-end w-full sm:w-auto">
      <div className="flex items-center gap-x-3 sm:gap-8">
        <Link
          className={cn("", pathname === "/" ? "font-bold" : "")}
          href="/"
        >
          Beranda
        </Link>
        <Link
          className={cn("", pathname === "/bantuan" ? "font-bold" : "")}
          href="/bantuan"
        >
          Bantuan
        </Link>
      </div>
      <Button
        className="rounded-full"
        onClick={() => signIn()}
      >
        <EnterIcon className={"mr-1"} /> | Masuk
      </Button>
    </nav>
  );
}
