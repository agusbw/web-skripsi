import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/app/providers";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "SIPEM",
  description: "Sistem Informasi Pengaduan Masyarakat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(GeistSans.className, "light")}
      style={{
        colorScheme: "light",
      }}
    >
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
