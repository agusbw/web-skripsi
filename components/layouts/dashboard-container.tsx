"use client";

import { CalendarDays, Clock3 } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import React from "react";

function DashboardContainer({
  children,
  title
}: {
  children: React.ReactNode;
  title: string;
}) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/*desktop*/}
      <div className={"pt-4 pb-4 lg:pt-16 px-4 lg:px-10 block"}>
        <div className={"flex gap-3 mb-4"}>
          <span className={"flex items-center gap-1"}>
            <CalendarDays className={"w-4 text-primary"} />{" "}
            {format(date, "d MMMM yyyy")}
          </span>
          <span className={"flex items-center gap-1"}>
            <Clock3 className={"w-4 text-primary"} /> {format(date, "hh:mm")}
          </span>
        </div>

        <h2 className={"text-2xl sm:text-3xl font-semibold mb-8 lg:mb-16"}>
          {title}
        </h2>

        <div>{children}</div>
      </div>
    </>
  );
}

export default DashboardContainer;
