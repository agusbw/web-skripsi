import { RegistrationForm } from "@/app/(auth)/register/_components/register-form";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Halaman Registrasi",
};
export default async function RegisterPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Buat Akun Baru
        </h1>
      </div>
      <RegistrationForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        Dengan mengklik &rdquo;Buat Akun&rdquo;, data akun anda akan tersimpan
        dan anda <span className={"text-destructive font-bold"}>hanya</span>{" "}
        dapat login, lengkapi biodata untuk membuat pengajuan surat!.
      </p>
    </div>
  );
}
