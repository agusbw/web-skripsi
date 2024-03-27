import type { Metadata } from "next";
import LoginForm from "@/app/(auth)/login/_components/login-form";
import { getCurrentSession } from "@/lib/server/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  const session = await getCurrentSession();

  if (session) {
    session.user.role === "WARGA" ? redirect("/warga") : redirect("/staff");
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center sm:w-[350px]">
      <h1 className="text-2xl font-semibold tracking-tight mb-3">
        Masuk ke Akun Anda
      </h1>
      <LoginForm />
    </div>
  );
}
