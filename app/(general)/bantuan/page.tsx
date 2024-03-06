import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { ADMIN_WHATSAPP_NUMBER } from "@/lib/constant";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Pusat Bantuan",
  description: "Pusat Bantuan Sistem Informasi Pengajuan Surat Keterangan",
};

export default function HelpPage() {
  return (
    <div>
      <div className={"lg:px-24 lg:pt-32 lg:pb-12 pt-16 px-8 text-center"}>
        <h1 className={"text-3xl mb-4 font-bold text-primary"}>
          Bantuan Pengguna
        </h1>
        <p>
          Kami telah mengumpulkan hal-hal yang sering ditanyakan oleh pengguna
          lainnya.
        </p>
      </div>
      <div
        className={"border mx-4 lg:mx-48 lg:mt-10 px-5 mt-12 mb-12 lg:mb-28"}
      >
        <Accordion
          type="single"
          collapsible
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              SIPSK itu aplikasi apa?
            </AccordionTrigger>
            <AccordionContent>
              SIPSK adalah website yang digunakan untuk mempermudah masyarakat
              dalam mengajukan surat keterangan Desa Pelapuan.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">
              Apa yang melatarbelakangi dibangunnya SIPSK?
            </AccordionTrigger>
            <AccordionContent>
              SIPSK dilatarbelakangi oleh kurangnya aksesibilitas masyarakat
              dalam mengajukan surat keterangan secara online Desa Pelapuan.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">
              Bagaimana caranya mengajukan surat?
            </AccordionTrigger>
            <AccordionContent>
              Tata cara pengajuan surat tersedia di halaman{" "}
              <Link
                className="underline text-primary"
                href="/#step"
              >
                beranda
              </Link>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left">
              Jika ada kendala atau masalah, kemana saya harus melapor?
            </AccordionTrigger>
            <AccordionContent>
              Anda dapat melaporkan masalah atau kendala melalui kontak{" "}
              <Link
                className="underline text-primary"
                href={`https://wa.me/${ADMIN_WHATSAPP_NUMBER}`}
              >
                berikut
              </Link>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left">
              Saya tidak punya akun, harus bagaimana?
            </AccordionTrigger>
            <AccordionContent>
              Anda dapat menuju halaman login, lalu klik{" "}
              <span className="text-primary">
                &apos;Belum punya akun?&apos;
              </span>
              , lalu anda akan diarahkan menuju kontak petugas untuk melakukan
              pendaftaran.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-left">
              Apakah saya tetap mengambil surat di Kantor Desa?
            </AccordionTrigger>
            <AccordionContent>
              Iya, surat keterangan adalah dokumen resmi yang memerlukan tanda
              tangan dan cap resmi dari Pemerintah Desa Pelapuan. Website ini
              mempersingkat waktu anda, anda tidak perlu lagi mengajukan surat,
              mengurus data administrasi, menunggu pencetakan surat, dan
              melakukan proses lainnya di Kantor Desa. Hanya anda perlu
              mengambil suratnya langsung ketika sudah selesai.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
