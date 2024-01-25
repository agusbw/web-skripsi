import { type Status } from "@prisma/client";
import { cn, formatEnumValue } from "@/lib/utils";
import { Badge } from "./ui/badge";

export default function SuratStatusBadge({ status }: { status: Status }) {
  function getBadgeVariant(status: Status) {
    switch (status) {
      case "DITOLAK":
        return "destructive";
      case "PENDING":
        return "outline";
      case "SELESAI":
        return "default";
    }
  }

  return (
    <Badge
      variant={getBadgeVariant(status)}
      className="rounded-full flex items-center justify-center w-fit"
    >
      <div
        className={cn(
          "w-1.5 h-1.5 rounded-full mr-1",
          getBadgeVariant(status) === "outline" ? "bg-black" : "bg-white"
        )}
      ></div>
      <div>{formatEnumValue(status)}</div>
    </Badge>
  );
}
