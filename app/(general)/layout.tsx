import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

function GeneralLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className={"w-full"}>{children}</main>
      <Footer />
    </>
  );
}

export default GeneralLayout;
