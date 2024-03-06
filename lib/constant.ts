import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const ADMIN_WHATSAPP_NUMBER = "6281353270169";

const WHATSAPP_TEXT = {
  laporBug: `Halo admin, saya menemukan masalah pada Sistem Pengajuan Surat Keterangan. Masalah yang saya temukan adalah: {masukkan masalah yang anda temukan}`,
  daftarAkun: `Halo admin, saya belum punya akun pada Sistem Pengajuan Surat Keterangan. Saya ingin mendaftar.`,
  lupaPassword: `Halo admin, saya lupa password akun di Sistem Pengajuan Surat Keterangan. NIK saya adalah: {masukkan NIK anda}`,
  lupaUsername: `Halo admin, saya lupa username akun di Sistem Pengajuan Surat Keterangan. NIK saya adalah: {masukkan NIK anda}`,
  kesalahanData: `Halo admin, saya ingin melaporkan kesalahan data pribadi pada Sistem Pengajuan Surat Keterangan. Kesalahan data diri saya adalah {masukkan kesalahan data anda}`,
};

export { ADMIN_WHATSAPP_NUMBER, WHATSAPP_TEXT };
