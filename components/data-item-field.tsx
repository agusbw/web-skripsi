import { Label } from "./ui/label";

export default function DataItemField({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) {
  return (
    <div>
      <Label>{label}: </Label>
      <div className="p-2 bg-accent text-accent-foreground border cursor-not-allowed">
        <p className="text-sm">{value ? value : "-"}</p>
      </div>
    </div>
  );
}
