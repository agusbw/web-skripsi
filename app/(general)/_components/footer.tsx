import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col flex-wrap px-5 lg:px-32 py-24 mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap">
        <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-x-2">
            <Image
              src="/logo-desa.png"
              alt="Pelapuan Logo"
              width={50}
              height={50}
            />
            <span className="inline-block mt-3 text-primary">SIPSK</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Pemerintah Desa Pelapuan @2024
          </p>
        </div>
        <div className="flex flex-wrap mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
          <div className="w-full px-4">
            <h2 className="mb-3 text-sm font-medium tracking-widest  title-font">
              NAVIGASI
            </h2>
            <nav className="mb-10 list-none">
              <li>
                <Link
                  href="/bantuan"
                  className="text-muted-foreground hover:text-primary"
                >
                  Bantuan
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-muted-foreground hover:text-primary"
                >
                  Login
                </Link>
              </li>
            </nav>
          </div>
        </div>
        <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
          <div className="w-full px-4 ">
            <h2 className="mb-3 text-sm font-medium tracking-widest title-font">
              TENTANG DESA
            </h2>
            <nav className="mb-10 list-none">
              <li>
                <Link
                  href="http://pelapuan-buleleng.desa.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  Website Desa
                </Link>
              </li>
              <li>
                <Link
                  href="https://web.facebook.com/pemdes.pelapuan.9?mibextid=9R9pXO&_rdc=1&_rdr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  Halaman Facebook
                </Link>
              </li>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
