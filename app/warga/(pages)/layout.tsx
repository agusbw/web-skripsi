import Sidebar from "@/components/sidebar";
import MobileNav from "@/components/mobile-nav";
import React from "react";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"flex flex-col lg:flex-row"}>
      <Sidebar />
      <MobileNav />
      <div className={"w-full"}>{children}</div>
    </div>
  );
}
