import SkuForm from "./_components/form";
import UserData, { UserDataSkeleton } from "../_components/user-data";
import { ADMIN_WHATSAPP_NUMBER, WHATSAPP_TEXT } from "@/lib/constant";
import { Suspense } from "react";
import Link from "next/link";

export default function SkuPage() {
  return (
    <div>
      <p className="text-xl font-medium">
        Pengajuan Surat Keterangan Usaha (SKU)
      </p>
      <p className="text-muted-foreground text-sm mb-5">
        Isi form dibawah ini untuk mengajukan surat keterangan usaha
      </p>
      <div className="space-y-5">
        <div>
          <p className="font-medium">Data Pengaju Surat</p>
          <p className="text-sm text-muted-foreground mb-4">
            Apabila terdapat kesalahan data pengaju,{" "}
            <Link
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://wa.me/${ADMIN_WHATSAPP_NUMBER}/?text=${WHATSAPP_TEXT.kesalahanData}`}
            >
              hubungi admin
            </Link>
          </p>
        </div>
        <Suspense fallback={<UserDataSkeleton />}>
          <UserData />
        </Suspense>
        <SkuForm />
      </div>
    </div>
  );
}
