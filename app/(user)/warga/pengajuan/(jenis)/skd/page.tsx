import SktmForm from "./_components/form";
import UserData, { UserDataSkeleton } from "../_components/user-data";
import { ADMIN_WHATSAPP_NUMBER } from "@/lib/constant";
import { Suspense } from "react";
import Link from "next/link";

export default function SkdForm() {
  return (
    <div>
      <p className="text-xl font-medium">
        Pengajuan Surat Keterangan Domisili (SKD)
      </p>
      <p className="text-muted-foreground text-sm mb-5">
        Isi form dibawah ini untuk mengajukan surat keterangan domisili
      </p>
      <div className="space-y-5">
        <div>
          <p className="font-medium">Data Pengaju Surat</p>
          <p className="text-sm text-muted-foreground mb-4">
            Apabila terdapat kesalahan data pengaju,{" "}
            <Link
              className="text-primary hover:underline"
              href={`https://wa.me/${ADMIN_WHATSAPP_NUMBER}`}
            >
              hubungi admin
            </Link>
          </p>
        </div>
        <Suspense fallback={<UserDataSkeleton />}>
          <UserData />
        </Suspense>
        <SktmForm />
      </div>
    </div>
  );
}
