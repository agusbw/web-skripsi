import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authOptions } from "@/lib/auth";
import AdminLoginForm from "@/app/(auth)/login/_components/admin-login-form";
import WargaLoginForm from "@/app/(auth)/login/_components/warga-login-form";

export const metadata: Metadata = {
  title: "Halaman Login",
};

export default async function LoginPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <Tabs
        defaultValue="warga"
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="warga">Warga</TabsTrigger>
          <TabsTrigger value="admin">Staff</TabsTrigger>
        </TabsList>
        <TabsContent value="warga">
          <h1 className="my-3 text-2xl font-semibold tracking-tight">
            Masuk ke akun Warga
          </h1>
          <WargaLoginForm />
        </TabsContent>
        <TabsContent value="admin">
          <h1 className="my-3 text-2xl font-semibold tracking-tight">
            Masuk ke akun Staff
          </h1>
          <AdminLoginForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
