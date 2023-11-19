import React from "react";
import Header from "@/app/(general)/_components/header";
import Footer from "@/app/(general)/_components/footer";

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
