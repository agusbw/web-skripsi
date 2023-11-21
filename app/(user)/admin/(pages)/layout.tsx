import Sidebar from "@/components/sidebar";
import MobileNav from "@/components/mobile-nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: {
    template: "%s | Dashboard",
    default: "Dashboard",
  },
  description: "Dashboard sistem pengajuan surat keterangan Desa Pelapuan.",
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"flex flex-col lg:flex-row"}>
      <Sidebar />
      <MobileNav />
      <div className="w-full max-h-screen overflow-y-auto">{children}</div>
    </div>
  );
}
