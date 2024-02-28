import DashboardContainer from "@/components/layouts/dashboard-container";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ADMIN_WHATSAPP_NUMBER, WHATSAPP_TEXT } from "@/lib/constant";
import { AlertCircle, MessageSquare, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchUserUsername } from "@/lib/server/data";
import ChangePasswordButton from "./_components/change-password-buttton";
import ChangeUsernameButton from "./_components/change-username-button";
import Link from "next/link";
import { type Metadata } from "next";
import Biodata from "./_components/biodata";

export const metadata: Metadata = {
  title: "Biodata",
  description: "Halaman Bioadata Warga",
};
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BiodataPage() {
  const user = await fetchUserUsername();

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
        <div className="p-5 rounded shadow-sm border space-y-4">
          <div className="flex gap-2">
            <Settings />
            <p className="text-xl font-medium">Pengaturan Akun</p>
          </div>
          <div className="mt-4">
            <p className="text-lg font-medium">Ganti Username</p>
            <Alert className="bg-blue-500/10 text-blue-600 my-2">
              <AlertDescription>
                Anda dapat mengganti username dari NIK menjadi username yang
                lebih mudah diingat.
                <p className="font-medium">
                  Username saat ini: {user?.username}
                </p>
              </AlertDescription>
            </Alert>
            <ChangeUsernameButton />
            <p className="text-xs text-muted-foreground mt-1">
              Apabila sewaktu-waktu anda lupa username, anda dapat menghubungi
              admin desa untuk melakukan reset username.
            </p>
          </div>
          <div className="mt-4">
            <p className="text-lg font-medium">Ganti Password</p>
            <Alert className="bg-blue-500/10 text-blue-600 my-2">
              <AlertDescription>
                Ganti password secara berkala untuk keamanan akun anda.
              </AlertDescription>
            </Alert>
            <ChangePasswordButton />
            <p className="text-xs text-muted-foreground mt-1">
              Apabila sewaktu-waktu anda lupa password, anda dapat menghubungi
              admin desa untuk melakukan reset password.
            </p>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}
