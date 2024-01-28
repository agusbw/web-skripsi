import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-gray-600 body-font">
      <div className="flex flex-col flex-wrap px-5 lg:px-32 py-24 mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap">
        <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
          <Link
            href="#"
            className="flex items-center justify-center font-medium text-gray-900 title-font md:justify-start"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-10 h-10 p-2 text-white bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">SIPSK</span>
          </Link>
          <p className="mt-2 text-sm text-gray-500">
            Pemerintah Desa Pelapuan @2023
          </p>
        </div>
        <div className="flex flex-wrap mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
          <div className="w-full px-4">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 title-font">
              NAVIGASI
            </h2>
            <nav className="mb-10 list-none">
              <li>
                <Link
                  href="/bantuan"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Bantuan
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Login
                </Link>
              </li>
            </nav>
          </div>
        </div>
        <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
          <div className="w-full px-4 ">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 title-font">
              TENTANG DESA
            </h2>
            <nav className="mb-10 list-none">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Website Desa
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-800"
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
