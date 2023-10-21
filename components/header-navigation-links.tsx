"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNavigationLinks() {
  const pathname = usePathname();

  return (
    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
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
        className={`ml-4 font-semibold ${
          pathname === "/bantuan" ? "text-accent-foreground bg-accent" : ""
        }`}
        asChild
      >
        <Link href="/bantuan">Bantuan</Link>
      </Button>
    </nav>
  );
}
