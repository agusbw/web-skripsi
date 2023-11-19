"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EnterIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";

export default function HeaderNavigationLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-5 text-base">
      <Button
        variant={"ghost"}
        className={`font-semibold ${
          pathname === "/" ? "text-accent-foreground bg-accent" : ""
        }`}
        asChild
      >
        <Link href="/">Beranda</Link>
      </Button>
      <Button
        variant={"ghost"}
        className={`font-semibold ${
          pathname === "/bantuan" ? "text-accent-foreground bg-accent" : ""
        }`}
        asChild
      >
        <Link href="/bantuan">Bantuan</Link>
      </Button>
      <Button onClick={() => signIn()}>
        Masuk <EnterIcon className={"ml-1"} />
      </Button>
    </nav>
  );
}
