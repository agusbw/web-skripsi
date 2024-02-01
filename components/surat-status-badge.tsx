import { type Status } from "@prisma/client";
import { cn, formatEnumValue } from "@/lib/utils";
import { Badge } from "./ui/badge";

export default function SuratStatusBadge({
  status,
  className,
}: {
  status: Status;
  className?: string;
}) {
  function getBadgeVariant(status: Status) {
    switch (status) {
      case "DIAMBIL":
        return "bg-blue-500 hover:bg-blue-500";
      case "PENDING":
        return "bg-yellow-500 hover:bg-yellow-500";
      case "SELESAI":
        return "bg-green-500 hover:bg-green-500";
      case "DITOLAK":
        return "bg-red-500 hover:bg-red-500";

      default:
    }
  }

  return (
    <Badge
      className={cn(
        "rounded-full flex items-center justify-center w-fit text-white",
        getBadgeVariant(status),
        className
      )}
    >
      <div className={cn("w-1.5 h-1.5 rounded-full mr-1", "bg-white")}></div>
      <div>{formatEnumValue(status)}</div>
    </Badge>
  );
}
