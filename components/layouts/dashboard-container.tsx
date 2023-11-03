"use client";

import Image from "next/image";
import { CalendarDays, Clock3, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import React from "react";
import { useSession } from "next-auth/react";

function DashboardContainer({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const [date, setDate] = useState(new Date());
  const session = useSession();

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/*desktop*/}
      <div className={"pt-4 pb-4 lg:pt-16 px-10 hidden lg:block"}>
        <div className={"flex gap-3 mb-4"}>
          <span className={"flex items-center gap-1"}>
            <CalendarDays className={"w-4 text-primary"} />{" "}
            {format(date, "d MMMM yyyy")}
          </span>
          <span className={"flex items-center gap-1"}>
            <Clock3 className={"w-4 text-primary"} /> {format(date, "hh:mm")}
          </span>
        </div>
        <div className={"flex justify-between items-start"}>
          <h2 className={"text-2xl sm:text-3xl font-semibold mb-4 lg:mb-16"}>
            {title}
          </h2>
          <div
            className={
              "flex gap-5 rounded-md bg-primary/10 h-12 px-2 py-3 items-center"
            }
          >
            <div className={"flex items-center"}>
              <Image
                src={"/user-photo.png"}
                alt={"user image"}
                width={40}
                height={40}
              />
              <span className={` text-muted-foreground`}>
                {session && session.data?.user.role === "ADMIN"
                  ? "Admin"
                  : "Warga"}
              </span>
            </div>
            <div className={"border-l-2 border-muted-foreground px-4"}>
              <LogOut
                size={18}
                className={"text-red-500 hover:text-red-500/80 cursor-pointer"}
                onClick={() => signOut()}
              />
            </div>
          </div>
        </div>
        <div>{children}</div>
      </div>

      <div className="block lg:hidden">
        <div>{children}</div>
      </div>
    </>
  );
}

export default DashboardContainer;
