import { type ComplaintStep } from "@/types/types";
import {
  Users,
  CalendarClock,
  User,
  BarChart2,
  LayoutList,
  LogIn,
  ScrollText,
  FormInput,
  FilePlus2,
  FileCheck,
  MailCheck,
  CheckCircle2,
  Layers,
} from "lucide-react";

export const ComplaintSteps: ComplaintStep[] = [
  {
    title: "Login",
    description: "Login terlebih dahulu dengan akun yang telah terdaftar.",
    icon: <LogIn />,
  },
  {
    title: "Pilih Jenis Surat",
    description:
      "Cari menu lalu tekan menu Ajukan Surat dan pilih jenis surat yang ingin diajukan. Pastikan jenis surat yang dipilih sesuai dengan kebutuhan.",
    icon: <ScrollText />,
  },
  {
    title: "Isi Formulir dan Kirim",
    description:
      "Isi formulir pengajuan surat dengan lengkap dan benar, lalu kirim pengajuan.",
    icon: <FormInput />,
  },
  {
    title: "Pantau Status Pengajuan",
    description:
      "Pantau status pengajuan surat melalui halaman riwayat pengajuan. Surat yang sudah selesai akan memiliki status 'selesai'.",
    icon: <MailCheck />,
  },
  {
    title: "Ambil Surat",
    description: "Ambil surat yang telah selesai dibuat di kantor desa.",
    icon: <CheckCircle2 />,
  },
];

const adminSidebar = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: <BarChart2 size={18} />,
  },
  {
    title: "Data Warga",
    path: "/admin/warga",
    icon: <Users size={18} />,
  },
  {
    title: "Data Pengajuan Surat",
    path: "/admin/pengajuan",
    icon: <LayoutList size={18} />,
  },
  {
    title: "Data Pengambilan Surat",
    path: "/admin/riwayat-pengambilan",
    icon: <FileCheck size={18} />,
  },

  {
    title: "Kategori Surat",
    path: "/admin/kategori",
    icon: <Layers size={18} />,
  },
];

const wargaSidebar = [
  {
    title: "Dashboard",
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
    path: "/warga/riwayat",
    icon: <CalendarClock size={18} />,
  },
];

export { adminSidebar, wargaSidebar };
