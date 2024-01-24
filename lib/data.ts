import "server-only";
import prisma from "./prisma";
import { unstable_noStore as noStore } from "next/cache";
import { getCurrentSession } from "./auth";

export async function fetchWargaList() {
  noStore();
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
    throw new Error("Failed to fetch warga list.");
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
    throw new Error("Failed to fetch warga data.");
  }
}

export async function fetchSuratByUserId(id: string) {
  noStore();
  try {
    const data = await prisma.surat.findMany({
      where: {
        warga: {
          user: {
            id: id,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        kategori_surat: true,
      },
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch surat data.");
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
    throw new Error("Failed to fetch kategori surat.");
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
    throw new Error("Failed to fetch current biodata.");
  }
}

export async function fetchUserSuratPending() {
  noStore();
  const session = await getCurrentSession();
  const currentWargaid = session?.user.id_warga;

  try {
    const data = await prisma.surat.findMany({
      where: {
        id_warga: currentWargaid,
        status: "PENDING",
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        kategori_surat: true,
      },
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch surat pending.");
  }
}

export async function fetchUserSuratSelesai() {
  noStore();
  const session = await getCurrentSession();
  const currentWargaid = session?.user.id_warga;

  try {
    const data = await prisma.surat.findMany({
      where: {
        id_warga: currentWargaid,
        status: "SELESAI",
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        kategori_surat: true,
      },
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch surat selesai.");
  }
}

export async function fetchUserSuratDitolak() {
  noStore();
  const session = await getCurrentSession();
  const currentWargaid = session?.user.id_warga;

  try {
    const data = await prisma.surat.findMany({
      where: {
        id_warga: currentWargaid,
        status: "DITOLAK",
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        kategori_surat: true,
      },
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch surat ditolak.");
  }
}

//! USER DASHBOARD DATA
export async function fetchUserTotalSurat() {
  noStore();
  const session = await getCurrentSession();
  if (session?.user.role === "ADMIN") {
    throw new Error("This function is only for warga.");
  }
  const currentWargaid = session?.user.id_warga;
  try {
    const total = prisma.surat.count({
      where: {
        id_warga: currentWargaid,
      },
    });
    const pending = prisma.surat.count({
      where: {
        id_warga: currentWargaid,
        status: "PENDING",
      },
    });
    const selesai = prisma.surat.count({
      where: {
        id_warga: currentWargaid,
        status: "SELESAI",
      },
    });
    const ditolak = prisma.surat.count({
      where: {
        id_warga: currentWargaid,
        status: "DITOLAK",
      },
    });

    const data = await prisma.$transaction([total, pending, selesai, ditolak]);

    return {
      total: data[0],
      pending: data[1],
      selesai: data[2],
      ditolak: data[3],
    } as {
      total: number;
      pending: number;
      selesai: number;
      ditolak: number;
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total surat.");
  }
}

export async function fetchUserLatestSurat() {
  noStore();
  const session = await getCurrentSession();
  if (session?.user.role === "ADMIN") {
    throw new Error("This function is only for warga.");
  }
  const currentWargaid = session?.user.id_warga;

  try {
    const data = await prisma.surat.findMany({
      where: {
        id_warga: currentWargaid,
      },
      select: {
        createdAt: true,
        status: true,
        kategori_surat: {
          select: {
            nama: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch latest surat.");
  }
}

export async function fetchUserTotalSuratByKategori() {
  noStore();
  const session = await getCurrentSession();
  if (session?.user.role === "ADMIN") {
    throw new Error("This function is only for warga.");
  }
  const currentWargaid = session?.user.id_warga;

  try {
    const sktm = prisma.surat.count({
      where: {
        id_warga: currentWargaid,
        kategori_surat: {
          kode: "SKTM",
        },
      },
    });

    const sku = prisma.surat.count({
      where: {
        id_warga: currentWargaid,
        kategori_surat: {
          kode: "SKU",
        },
      },
    });

    const skbpk = prisma.surat.count({
      where: {
        id_warga: currentWargaid,
        kategori_surat: {
          kode: "SKBPK",
        },
      },
    });

    const skd = prisma.surat.count({
      where: {
        id_warga: currentWargaid,
        kategori_surat: {
          kode: "SKD",
        },
      },
    });

    const data = await prisma.$transaction([sktm, sku, skbpk, skd]);

    return [
      {
        name: "SK Tidak Mampu",
        value: data[0],
      },
      {
        name: "SK Usaha",
        value: data[1],
      },
      {
        name: "SK Belum Pernah Kawin",
        value: data[2],
      },
      {
        name: "SK Domisili",
        value: data[3],
      },
    ];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total surat by kategori.");
  }
}

export async function fetchUserTotalSuratByMonth(month: number) {
  noStore();
  const session = await getCurrentSession();
  const currentWargaid = session?.user.id_warga;

  try {
    const data = await prisma.surat.count({
      where: {
        id_warga: currentWargaid,
        createdAt: {
          gte: new Date(new Date().getFullYear(), month, 1),
          lt: new Date(new Date().getFullYear(), month + 1, 1),
        },
      },
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total surat by month.");
  }
}

export async function fetchUserBarChartData() {
  noStore();
  try {
    const jan = fetchUserTotalSuratByMonth(0);
    const feb = fetchUserTotalSuratByMonth(1);
    const mar = fetchUserTotalSuratByMonth(2);
    const apr = fetchUserTotalSuratByMonth(3);
    const mei = fetchUserTotalSuratByMonth(4);
    const jun = fetchUserTotalSuratByMonth(5);
    const jul = fetchUserTotalSuratByMonth(6);
    const agu = fetchUserTotalSuratByMonth(7);
    const sep = fetchUserTotalSuratByMonth(8);
    const okt = fetchUserTotalSuratByMonth(9);
    const nov = fetchUserTotalSuratByMonth(10);
    const des = fetchUserTotalSuratByMonth(11);

    const data = await Promise.all([
      jan,
      feb,
      mar,
      apr,
      mei,
      jun,
      jul,
      agu,
      sep,
      okt,
      nov,
      des,
    ]);

    return [
      {
        name: "Jan",
        total: data[0],
      },
      {
        name: "Feb",
        total: data[1],
      },
      {
        name: "Mar",
        total: data[2],
      },
      {
        name: "Apr",
        total: data[3],
      },
      {
        name: "Mei",
        total: data[4],
      },
      {
        name: "Jun",
        total: data[5],
      },
      {
        name: "Jul",
        total: data[6],
      },
      {
        name: "Agu",
        total: data[7],
      },
      {
        name: "Sep",
        total: data[8],
      },
      {
        name: "Okt",
        total: data[9],
      },
      {
        name: "Nov",
        total: data[10],
      },
      {
        name: "Des",
        total: data[11],
      },
    ];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch bar chart data.");
  }
}

//! ADMIN DASHBOARD DATA

export async function fetchTotalSurat() {
  const session = await getCurrentSession();
  if (session?.user.role !== "ADMIN") {
    throw new Error("Failed to fetch total surat.");
  }

  try {
    const total = prisma.surat.count();
    const pending = prisma.surat.count({
      where: {
        status: "PENDING",
      },
    });
    const selesai = prisma.surat.count({
      where: {
        status: "SELESAI",
      },
    });
    const ditolak = prisma.surat.count({
      where: {
        status: "DITOLAK",
      },
    });

    const data = await prisma.$transaction([total, pending, selesai, ditolak]);

    return {
      total: data[0],
      pending: data[1],
      selesai: data[2],
      ditolak: data[3],
    } as {
      total: number;
      pending: number;
      selesai: number;
      ditolak: number;
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total surat.");
  }
}

export async function fetchLatestSurat() {
  noStore();
  const session = await getCurrentSession();
  if (session?.user.role !== "ADMIN") {
    throw new Error("Failed to fetch latest surat.");
  }

  try {
    const data = await prisma.surat.findMany({
      select: {
        createdAt: true,
        status: true,
        warga: {
          select: {
            nama: true,
          },
        },
        kategori_surat: {
          select: {
            nama: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch latest surat.");
  }
}

export async function fetchTotalSuratByKategori() {
  noStore();
  const session = await getCurrentSession();
  if (session?.user.role !== "ADMIN") {
    throw new Error("Failed to fetch total surat by kategori.");
  }

  try {
    const sktm = prisma.surat.count({
      where: {
        kategori_surat: {
          kode: "SKTM",
        },
      },
    });

    const sku = prisma.surat.count({
      where: {
        kategori_surat: {
          kode: "SKU",
        },
      },
    });

    const skbpk = prisma.surat.count({
      where: {
        kategori_surat: {
          kode: "SKBPK",
        },
      },
    });

    const skd = prisma.surat.count({
      where: {
        kategori_surat: {
          kode: "SKD",
        },
      },
    });

    const data = await prisma.$transaction([sktm, sku, skbpk, skd]);

    return [
      {
        name: "SK Tidak Mampu",
        value: data[0],
      },
      {
        name: "SK Usaha",
        value: data[1],
      },
      {
        name: "SK Belum Pernah Kawin",
        value: data[2],
      },
      {
        name: "SK Domisili",
        value: data[3],
      },
    ];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total surat by kategori.");
  }
}

export async function fetchTotalSuratByMonth(month: number) {
  noStore();
  const session = await getCurrentSession();
  if (session?.user.role !== "ADMIN") {
    throw new Error("Failed to fetch total surat by kategori.");
  }

  try {
    const data = await prisma.surat.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), month, 1),
          lt: new Date(new Date().getFullYear(), month + 1, 1),
        },
      },
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total surat by month.");
  }
}

export async function fetchBarChartData() {
  noStore();
  try {
    const jan = fetchUserTotalSuratByMonth(0);
    const feb = fetchUserTotalSuratByMonth(1);
    const mar = fetchUserTotalSuratByMonth(2);
    const apr = fetchUserTotalSuratByMonth(3);
    const mei = fetchUserTotalSuratByMonth(4);
    const jun = fetchUserTotalSuratByMonth(5);
    const jul = fetchUserTotalSuratByMonth(6);
    const agu = fetchUserTotalSuratByMonth(7);
    const sep = fetchUserTotalSuratByMonth(8);
    const okt = fetchUserTotalSuratByMonth(9);
    const nov = fetchUserTotalSuratByMonth(10);
    const des = fetchUserTotalSuratByMonth(11);

    const data = await Promise.all([
      jan,
      feb,
      mar,
      apr,
      mei,
      jun,
      jul,
      agu,
      sep,
      okt,
      nov,
      des,
    ]);

    return [
      {
        name: "Jan",
        total: data[0],
      },
      {
        name: "Feb",
        total: data[1],
      },
      {
        name: "Mar",
        total: data[2],
      },
      {
        name: "Apr",
        total: data[3],
      },
      {
        name: "Mei",
        total: data[4],
      },
      {
        name: "Jun",
        total: data[5],
      },
      {
        name: "Jul",
        total: data[6],
      },
      {
        name: "Agu",
        total: data[7],
      },
      {
        name: "Sep",
        total: data[8],
      },
      {
        name: "Okt",
        total: data[9],
      },
      {
        name: "Nov",
        total: data[10],
      },
      {
        name: "Des",
        total: data[11],
      },
    ];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch bar chart data.");
  }
}
