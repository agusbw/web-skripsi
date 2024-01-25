import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import Providers from "@/app/providers";
import { cn } from "@/lib/utils";
import { inter } from "@/lib/constant";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(inter.className, "light")}
      style={{
        colorScheme: "light",
      }}
    >
      <body>
        <Providers>
          {children}
          <Toaster
            richColors
            closeButton
          />
        </Providers>
      </body>
    </html>
  );
}
