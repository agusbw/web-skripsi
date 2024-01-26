import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  count: number | undefined;
  title: string;
  Icon: LucideIcon;
  className?: string;
};

export default function SuratCountCard({
  count,
  title,
  className,
  Icon,
}: Props) {
  return (
    <Card
      className={cn(
        "bg-primary rounded-sm text-primary-foreground transition-all hover:shadow-md hover:scale-[1.01]",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
      </CardContent>
    </Card>
  );
}
