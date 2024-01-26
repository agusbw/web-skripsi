import DashboardContainer from "@/components/layouts/dashboard-container";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ADMIN_WHATSAPP_NUMBER, WHATSAPP_TEXT } from "@/lib/constant";
import { AlertCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChangePasswordButton from "./_components/change-password-buttton";
import Link from "next/link";
import { type Metadata } from "next";
import Biodata from "./_components/biodata";

export const metadata: Metadata = {
  title: "Biodata",
  description: "Halaman Bioadata Warga",
};

export default async function BiodataPage() {
  return (
    <DashboardContainer title="Data Warga">
      <Alert className="mb-4 bg-primary text-primary-foreground">
        <AlertCircle
          className="h-5 w-5"
          color="white"
        />
        <AlertTitle className="text-lg font-semibold">Peringatan!</AlertTitle>
        <AlertDescription>
          <p className="mb-2">
            Data yang ditampilkan di halaman ini adalah data yang telah diinput
            oleh admin. Jika terdapat kesalahan data, silahkan hubungi admin.
          </p>
          <Button
            variant={"secondary"}
            size={"sm"}
            asChild
          >
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={`https://wa.me/${ADMIN_WHATSAPP_NUMBER}/?text=${WHATSAPP_TEXT.kesalahanData}`}
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              Hubungi Admin
            </Link>
          </Button>
        </AlertDescription>
      </Alert>
      <div className="grid grid-cols-1 gap-y-4 w-full">
        <Biodata />
        <div className="bg-white p-5 rounded shadow-sm border space-y-2">
          <h2 className="text-2xl font-semibold">Ganti Kata Sandi</h2>
          <p>
            Ubah kata sandi Anda secara berkala untuk menjaga keamanan akun.
          </p>
          <ChangePasswordButton />
          <p className="text-sm text-muted-foreground">
            Apabila sewaktu-waktu Anda lupa kata sandi, Anda dapat menghubungi
            admin desa untuk melakukan reset kata sandi.
          </p>
        </div>
      </div>
    </DashboardContainer>
  );
}
