"use client";

import { Button } from "@/components/ui/button";
import { EnterIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";

export default function HeaderLoginButton() {
  return (
    <Button onClick={() => signIn()}>
      Masuk <EnterIcon className={"ml-1"} />
    </Button>
  );
}
