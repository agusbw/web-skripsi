import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

export default function DataItemField({
  label,
  value,
  className,
}: {
  label: string;
  value: string | number | null;
  className?: string;
}) {
  return (
    <div className={cn(className)}>
      <Label>{label}: </Label>
      <div className="p-2 bg-accent text-accent-foreground border cursor-not-allowed w-full">
        <p className="text-sm">{value ? value : "-"}</p>
      </div>
    </div>
  );
}
