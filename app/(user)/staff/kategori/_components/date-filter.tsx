"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export default function DateFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const params = new URLSearchParams(searchParams);

  function handleStartDateChange(date: string | null) {
    if (date) {
      params.set("startDate", date);
    } else {
      params.delete("startDate");
    }

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  function handleEndDateChange(date: string | null) {
    if (date) {
      params.set("endDate", date);
    } else {
      params.delete("endDate");
    }
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <div className="flex gap-3 items-end">
      <div className="">
        <p className="text-sm font-medium text-muted-foreground">Dari</p>
        <input
          type="date"
          id="startDateInput"
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
          id="endDateInput"
          className="border-2 rounded-lg p-1 focus:outline-primary"
          onChange={(e) => {
            handleEndDateChange(e.target.value);
          }}
          defaultValue={searchParams.get("endDate")?.toString()}
        />
      </div>
      <Button
        size={"icon"}
        variant={"outline"}
        onClick={() => {
          handleStartDateChange(null);
          handleEndDateChange(null);

          const startDateInput = document.getElementById(
            "startDateInput"
          ) as HTMLInputElement;
          const endDateInput = document.getElementById(
            "endDateInput"
          ) as HTMLInputElement;
          if (startDateInput) startDateInput.value = "";
          if (endDateInput) endDateInput.value = "";
        }}
      >
        <RefreshCcw size={16} />
      </Button>
    </div>
  );
}
