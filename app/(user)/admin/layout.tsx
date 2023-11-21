import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import React from "react";
import { notFound } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session?.user.role === "WARGA") {
    notFound();
  }

  return <>{children}</>;
}
