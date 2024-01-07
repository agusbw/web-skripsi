import DashboardContainer from "@/components/layouts/dashboard-container";
import { getUserBiodata } from "@/lib/data";
import { format } from "date-fns";
import { formatEnumValue } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ADMIN_WHATSAPP_NUMBER } from "@/lib/constant";
import { AlertCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChangePasswordButton from "./_components/change-password-buttton";
import Link from "next/link";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Biodata",
  description: "Halaman Bioadata Warga",
};

export default async function BiodataPage() {
  const biodata = await getUserBiodata();

  if (!biodata) return;

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
              href={`https://wa.me/${ADMIN_WHATSAPP_NUMBER}`}
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              Hubungi Admin
            </Link>
          </Button>
        </AlertDescription>
      </Alert>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-4 md:gap-y-0">
        <div className="max-w-2xl bg-white p-5 rounded shadow-sm border">
          <h2 className="text-2xl font-semibold mb-2">Biodata</h2>
          <table className="table-auto w-full">
            <tbody>
              <tr>
                <td className="font-bold py-2">NIK:</td>
                <td className="py-2">{biodata.nik}</td>
              </tr>
              <tr>
                <td className="font-bold py-2">No KK:</td>
                <td className="py-2">{biodata.no_kk}</td>
              </tr>
              <tr>
                <td className="font-bold  py-2">Nama:</td>
                <td className=" py-2">{biodata.nama}</td>
              </tr>
              <tr>
                <td className="font-bold  py-2">Alamat:</td>
                <td className=" py-2">{biodata.alamat}</td>
              </tr>
              <tr>
                <td className="font-bold  py-2">Tempat/Tanggal Lahir:</td>
                <td className="py-2">
                  {biodata.tempat_lahir +
                    ", " +
                    format(new Date(biodata.tanggal_lahir), "dd MMMM yyyy")}
                </td>
              </tr>
              <tr>
                <td className="font-bold  py-2">Agama:</td>
                <td className=" py-2">{formatEnumValue(biodata.agama)}</td>
              </tr>
              <tr>
                <td className="font-bold  py-2">Kewarganegaraan:</td>
                <td className=" py-2">{biodata.kewarganegaraan}</td>
              </tr>
              <tr>
                <td className="font-bold  py-2">Pekerjaan:</td>
                <td className=" py-2">
                  {biodata?.pekerjaan ? biodata.pekerjaan : "-"}
                </td>
              </tr>
              <tr>
                <td className="font-bold  py-2">Jenis Kelamin:</td>
                <td className=" py-2">
                  {biodata.jenis_kelamin ? "Laki-Laki" : "Perempuan"}
                </td>
              </tr>
              <tr>
                <td className="font-bold  py-2">Status Perkawinan:</td>
                <td className=" py-2">
                  {formatEnumValue(biodata.status_perkawinan)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="max-w-2xl bg-white p-5 rounded shadow-sm border space-y-2">
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
