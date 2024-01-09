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
    <nav className="flex flex-wrap items-center gap-8 text-base text-primary-foreground">
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
      <Button
        variant={"secondary"}
        className="rounded-full"
        onClick={() => signIn()}
      >
        Masuk <EnterIcon className={"ml-1"} />
      </Button>
    </nav>
  );
}
