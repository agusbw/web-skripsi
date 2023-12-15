import "server-only";
import prisma from "./prisma";
import { unstable_noStore as noStore } from "next/cache";
import { getCurrentSession } from "./auth";

export async function fetchWargaList() {
  noStore();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const data = await prisma.warga.findMany({
      select: {
        id: true,
        nik: true,
        no_kk: true,
        nama: true,
        pekerjaan: true,
        agama: true,
        status_perkawinan: true,
        alamat: true,
        jenis_kelamin: true,
        kewarganegaraan: true,
        surat: true,
        tanggal_lahir: true,
        tempat_lahir: true,
        id_user: true,
      },
      orderBy: {
        user: {
          createdAt: "desc",
        },
      },
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchWargaByUserId(id: string) {
  noStore();
  try {
    const data = await prisma.warga.findUnique({
      where: {
        id_user: id,
      },
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchKategoriSurat() {
  noStore();
  try {
    const data = await prisma.kategoriSurat.findMany({
      include: {
        surat: true,
      },
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchPenandatangan() {
  noStore();
  try {
    const data = await prisma.penandatangan.findMany();
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function getUserBiodata() {
  noStore();
  const session = await getCurrentSession();
  const currentUserId = session?.user.id;
  try {
    const data = await prisma.warga.findFirst({
      where: {
        id_user: currentUserId,
      },
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
