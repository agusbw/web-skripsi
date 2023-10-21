import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
function HelpCta() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
          <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">
            Masih bingung dengan sistem pengaduan ini? Klik tombol bantuan untuk
            membaca panduan.
          </h1>
          <Button asChild>
            <Link href="/bantuan">Bantuan</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HelpCta;
