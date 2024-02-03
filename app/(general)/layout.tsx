import React from "react";
import Header from "@/app/(general)/_components/header";
import Footer from "@/app/(general)/_components/footer";

function GeneralLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="hidden sm:block bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 to-transparent rounded-full h-80 w-80 z-0 blur-3xl absolute top-0 -left-24"></div>
      <div className="hidden sm:block bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 to-transparent rounded-full h-96 w-80 z-0 blur-3xl absolute top-3/4 -right-72 transform -translate-x-1/2 -translate-1/2 "></div>
      <Header />
      <main className={"w-full"}>{children}</main>
      <Footer />
    </>
  );
}

export default GeneralLayout;
