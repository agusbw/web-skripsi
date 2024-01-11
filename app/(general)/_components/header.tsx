import HeaderNavigationLinks from "@/app/(general)/_components/header-navigation-links";

export default function Header() {
  return (
    <header className="bg-primary z-50 body-font">
      <div className="container flex flex-col items-center justify-between gap-4 p-5 mx-auto sm:flex-row">
        <a className="flex items-center font-medium title-font">
          <span className="ml-3 hidden sm:inline font-medium text-2xl text-primary-foreground">
            Desa Pelapuan
          </span>
        </a>
        <HeaderNavigationLinks />
      </div>
    </header>
  );
}
