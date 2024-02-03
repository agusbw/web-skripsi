import Link from "next/link";
import { FileText } from "lucide-react";

function CardItem({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="group relative cursor-pointer overflow-hidden bg-background px-6 pt-10 pb-4 shadow-md border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
      <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-primary transition-all duration-700 group-hover:scale-[13]" />
      <div className="relative z-10 mx-auto max-w-md">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-primary transition-all duration-300 group-hover:bg-violet-500">
          <FileText className="h-10 w-10 text-white" />
        </span>
        <div className="mt-4">
          <h3 className="text-lg font-semibold leading-7 transition-all duration-300 group-hover:text-white/90">
            {title}
          </h3>
        </div>
        <div className="pt-3 text-base leading-7 text-muted-foreground transition-all duration-300 group-hover:text-white/90">
          <p>{description}</p>
        </div>
        <div className="pt-3 text-base font-semibold leading-7">
          <p>
            <Link
              href={href}
              className="text-primary transition-all duration-300 group-hover:text-white"
            >
              Ajukan surat →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function StatisticsSection() {
  return (
    <section className="body-font">
      <div className="px-5 lg:px-32 pb-12 mx-auto">
        <div className="flex flex-col w-full mb-8 text-center">
          <p className="mb-4 text-2xl font-semibold text-primary sm:text-3xl">
            Ajukan Surat Keterangan dengan Mudah
          </p>
          <p className="mx-auto text-lg leading-relaxed lg:w-2/3 text-muted-foreground">
            Adapun surat keterangan yang dapat diajukan melalui website ini
            antara lain.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-4 lg:gap-0 lg:gap-y-0 lg:grid-cols-4 lg:gap-x-4">
          <CardItem
            title="Surat Keterangan Tidak Mampu"
            description="Surat keterangan untuk masyarakat yang tidak mampu secara ekonomi."
            href="/warga/pengajuan/sktm"
          />
          <CardItem
            title="Surat Keterangan Domisili"
            description="Surat keterangan yang menyatakan domisili seseorang."
            href="/warga/pengajuan/skd"
          />
          <CardItem
            title="Surat Keterangan Belum Pernah Kawin"
            description="Surat keterangan yang menyatakan bahwa seseorang belum pernah menikah."
            href="/warga/pengajuan/skbpk"
          />
          <CardItem
            title="Surat Keterangan Usaha"
            description="Surat keterangan yang menyatakan bahwa seseorang memiliki usaha."
            href="/warga/pengajuan/sku"
          />
        </div>
      </div>
    </section>
  );
}

export default StatisticsSection;
