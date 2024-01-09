import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
function HelpCta() {
  return (
    <section className="bg-secondary body-font py-10">
      <div className="px-5 py-12 mx-auto">
        <div className="flex flex-col items-center gap-4 mx-auto lg:w-2/3 sm:flex-row">
          <h1 className="flex-grow text-2xl font-medium text-center sm:text-left sm:pr-16 title-font">
            Masih bingung dengan tata cara penggunaan website ini? Klik tombol
            bantuan untuk membaca panduan.
          </h1>
          <Button
            variant={"default"}
            className="rounded-full"
            size={"lg"}
            asChild
          >
            <Link href="/bantuan">Bantuan</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HelpCta;
