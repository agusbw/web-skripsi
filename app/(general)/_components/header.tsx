import HeaderNavigationLinks from "@/app/(general)/_components/header-navigation-links";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 text-gray-600 shadow-md body-font bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 p-5 mx-auto sm:flex-row">
        <a className="flex items-center font-medium text-gray-900 title-font">
          <span className="ml-3 text-xl font-semibold">SIPSK</span>
        </a>
        <HeaderNavigationLinks />
      </div>
    </header>
  );
}
