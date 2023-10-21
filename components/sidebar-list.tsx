"use client";

import { adminSidebar, wargaSidebar } from "@/config/site-config";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { isLinkActive } from "@/lib/utils";

function SidebarList({ wide }: { wide: boolean }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [delayedWide, setDelayedWide] = useState(wide);

  // useEffect to handle the delayed update of delayedWide
  useEffect(() => {
    if (wide) {
      const delay = 200;
      const timer = setTimeout(() => {
        setDelayedWide(wide);
      }, delay);
      return () => clearTimeout(timer);
    }

    setDelayedWide(wide);
  }, [wide]);

  return (
    <>
      {/*Admin Sidebar*/}
      {session && (
        <>
          {session &&
            session.user?.role === "ADMIN" &&
            adminSidebar.map((item, index) => (
              <Link
                key={item.title}
                href={item.path}
                className={`p-3 rounded-md hover:bg-primary/10  transition-colors duration-300 ${
                  wide
                    ? "hover:translate-x-3 mx-5 transition-transform"
                    : "mx-auto"
                } active:outline active:outline-accent ${
                  isLinkActive(pathname, item.path) && wide
                    ? "bg-primary/10 translate-x-3 text-primary font-semibold"
                    : isLinkActive(pathname, item.path)
                    ? "bg-primary/10"
                    : ""
                }`}
              >
                <p className={"flex items-center gap-3"}>
                  <span className="text-primary">{item.icon}</span>
                  <span className={`${delayedWide ? "inline" : "hidden"}`}>
                    {item.title}
                  </span>
                </p>
              </Link>
            ))}

          {/*User Sidebar*/}
          {session &&
            session.user?.role === "WARGA" &&
            wargaSidebar.map((item) => {
              if (session.user?.id_warga === undefined) {
                if (item.title === "Biodata") {
                  return (
                    <Link
                      key={item.title}
                      href={item.path}
                      className={`p-3 rounded-md hover:bg-primary/10  transition-colors duration-300 ${
                        wide
                          ? "hover:translate-x-3 mx-5 transition-transform"
                          : "mx-auto"
                      } active:outline active:outline-accent ${
                        isLinkActive(pathname, item.path) && wide
                          ? "bg-primary/10 translate-x-3 text-primary font-semibold"
                          : isLinkActive(pathname, item.path)
                          ? "bg-primary/10"
                          : ""
                      }`}
                    >
                      <p className={"flex items-center gap-3"}>
                        <span className="text-primary">{item.icon}</span>
                        <span
                          className={`${delayedWide ? "inline" : "hidden"}`}
                        >
                          {item.title}
                        </span>
                      </p>
                    </Link>
                  );
                }
              } else {
                return (
                  <Link
                    key={item.title}
                    href={item.path}
                    className={`p-3 rounded-md hover:bg-primary/10  transition-colors duration-300 ${
                      wide
                        ? "hover:translate-x-3 mx-5 transition-transform"
                        : "mx-auto"
                    } active:outline active:outline-accent ${
                      isLinkActive(pathname, item.path) && wide
                        ? "bg-primary/10 translate-x-3 text-primary font-semibold"
                        : isLinkActive(pathname, item.path)
                        ? "bg-primary/10"
                        : ""
                    }`}
                  >
                    <p className={"flex items-center gap-3"}>
                      <span className="text-primary">{item.icon}</span>
                      <span className={`${delayedWide ? "inline" : "hidden"}`}>
                        {item.title}
                      </span>
                    </p>
                  </Link>
                );
              }
            })}
        </>
      )}
    </>
  );
}

export default SidebarList;
