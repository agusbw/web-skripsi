import HeaderNavigationLinks from "@/app/(general)/_components/header-navigation-links";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-background border-b shadow-sm z-50 body-font sticky top-0">
      <div className="flex flex-col items-center justify-between gap-4 py-3 lg:px-32 px-5 mx-auto sm:flex-row">
        <div className="hidden sm:flex gap-x-2 items-center w-fit">
          <Image
            src="/logo-desa.png"
            alt="Pelapuan Logo"
            width={50}
            height={50}
          />
          <div className="mt-2.5 font-medium text-md text-primary w-fit">
            Desa Pelapuan
          </div>
        </div>
        <HeaderNavigationLinks />
      </div>
    </header>
  );
}
