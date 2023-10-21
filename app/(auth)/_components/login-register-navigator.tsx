"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LoginRegisterNavigator() {
  const pathname = usePathname();

  if (pathname === "/login") {
    return (
      <Link
        href={"/register"}
        className={cn(buttonVariants({ variant: "ghost" }), " font-semibold")}
      >
        Buat Akun
      </Link>
    );
  } else {
    return (
      <Button
        onClick={() => signIn()}
        variant={"ghost"}
        className={"font-semibold"}
      >
        Masuk
      </Button>
    );
  }
}
