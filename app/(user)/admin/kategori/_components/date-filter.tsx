"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function DateFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const params = new URLSearchParams(searchParams);

  function handleStartDateChange(date: string) {
    if (date) {
      params.set("startDate", date);
    } else {
      params.delete("startDate");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleEndDateChange(date: string) {
    if (date) {
      params.set("endDate", date);
    } else {
      params.delete("endDate");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-3">
      <div className="">
        <p className="text-sm font-medium text-muted-foreground">Dari</p>
        <input
          type="date"
          className="border-2 rounded-lg p-1 focus:outline-primary"
          onChange={(e) => {
            handleStartDateChange(e.target.value);
          }}
          defaultValue={searchParams.get("startDate")?.toString()}
        />
      </div>
      <div className="">
        <p className="text-sm font-medium text-muted-foreground">Hingga</p>
        <input
          type="date"
          className="border-2 rounded-lg p-1 focus:outline-primary"
          onChange={(e) => {
            handleEndDateChange(e.target.value);
          }}
          defaultValue={searchParams.get("endDate")?.toString()}
        />
      </div>
    </div>
  );
}
