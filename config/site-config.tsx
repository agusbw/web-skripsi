import { type ComplaintStep } from "@/types/types";
import {
  Book,
  CalendarClock,
  User2,
  BarChart2,
  User,
  FilePlus2,
} from "lucide-react";

export const ComplaintSteps: ComplaintStep[] = [
  {
    title: "Daftar Akun",
    description:
      "VHS cornhole pop-up, try-hard 8-bit iceland helvetica. Kinfolk bespoke try-hard cliche palo santo offal.",
    icon: <User />,
  },
  {
    title: "Daftar Akun",
    description:
      "VHS cornhole pop-up, try-hard 8-bit iceland helvetica. Kinfolk bespoke try-hard cliche palo santo offal.",
    icon: <User />,
  },
  {
    title: "Daftar Akun",
    description:
      "VHS cornhole pop-up, try-hard 8-bit iceland helvetica. Kinfolk bespoke try-hard cliche palo santo offal.",
    icon: <User />,
  },
  {
    title: "Daftar Akun",
    description:
      "VHS cornhole pop-up, try-hard 8-bit iceland helvetica. Kinfolk bespoke try-hard cliche palo santo offal.",
    icon: <User />,
  },
  {
    title: "Daftar Akun",
    description:
      "VHS cornhole pop-up, try-hard 8-bit iceland helvetica. Kinfolk bespoke try-hard cliche palo santo offal.",
    icon: <User />,
  },
];

const adminSidebar = [
  {
    title: "Overview",
    path: "/admin/dashboard",
    icon: <BarChart2 size={18} />,
  },
  {
    title: "Buku & Rak",
    path: "/admin/dashboard/books",
    icon: <Book size={18} />,
  },
  {
    title: "Peminjaman",
    path: "/admin/dashboard/transactions",
    icon: <CalendarClock size={18} />,
  },
  {
    title: "Anggota",
    path: "/admin/dashboard/members",
    icon: <User2 size={18} />,
  },
];

const wargaSidebar = [
  {
    title: "Ringkasan",
    path: "/warga",
    icon: <BarChart2 size={18} />,
  },
  {
    title: "Biodata",
    path: "/warga/biodata",
    icon: <User size={18} />,
  },
  {
    title: "Ajukan Surat",
    path: "/warga/pengajuan",
    icon: <FilePlus2 size={18} />,
  },
  {
    title: "Riwayat Pengajuan",
    path: "/warga/penganjuan",
    icon: <CalendarClock size={18} />,
  },
];

export { adminSidebar, wargaSidebar };
