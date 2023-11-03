import Sidebar from "@/components/sidebar";
import MobileNav from "@/components/mobile-nav";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin Dashboard",
    default: "Admin Dashboard",
  },
  description:
    "Admin dashboard sistem pengajuan surat keterangan Desa Pelapuan.",
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
