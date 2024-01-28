import HeaderNavigationLinks from "@/app/(general)/_components/header-navigation-links";

export default function Header() {
  return (
    <header className="bg-white border-b shadow-sm z-50 body-font sticky top-0">
      <div className="flex flex-col items-center justify-between gap-4 py-3 lg:px-32 px-5 mx-auto sm:flex-row">
        <a className="flex items-center font-medium title-font">
          <span className="ml-3 hidden sm:inline font-medium text-2xl text-primary">
            Desa Pelapuan
          </span>
        </a>
        <HeaderNavigationLinks />
      </div>
    </header>
  );
}
