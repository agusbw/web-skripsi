import { Metadata } from "next";
import LoginForm from "@/app/(auth)/login/_components/login-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Halaman Login",
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Masuk ke akun Anda
        </h1>
        <p className="text-sm text-muted-foreground">
          Masukkan username dan password Anda untuk melanjutkan dan mulai
          mengajukan pengaduan.
        </p>
      </div>
      <LoginForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        Dengan klik &rdquo;Login&rdquo;, anda akan diarahkan ke halaman
        Dashboard pengaduan.
      </p>
    </div>
  );
}
