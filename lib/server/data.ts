import "server-only";
import prisma from "./prisma";
import { unstable_noStore as noStore } from "next/cache";
import { getCurrentSession } from "./auth";
import type { KodeSurat } from "@prisma/client";
import { generateTotalFromSuratStatusGroup } from "../utils";

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

export async function fetchUserDisplayName() {
  noStore();
  const session = await getCurrentSession();
  const currentUserId = session?.user.id;

  try {
    const data = await prisma.user.findUnique({
      where: {
        id: currentUserId,
      },
      select: {
        warga: {
          select: {
            nama: true,
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user data.");
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

export async function fetchCountSuratByKategoriFiltered(
  startDate: Date | null | undefined,
  endDate: Date | null | undefined
) {
  noStore();

  function generateWhereClause(kode: KodeSurat) {
    return {
      kategori_surat: {
        kode: kode,
      },
      createdAt: startDate && endDate ? { gte: startDate, lte: endDate } : {},
    };
  }

  try {
    const sktmCountsPromise = prisma.surat.groupBy({
      by: ["status"],
      where: generateWhereClause("SKTM"),
      _count: true,
    });

    const skuCountsPromise = prisma.surat.groupBy({
      by: ["status"],
      where: generateWhereClause("SKU"),
      _count: true,
    });

    const skbpkCountsPromise = prisma.surat.groupBy({
      by: ["status"],
      where: generateWhereClause("SKBPK"),
      _count: true,
    });

    const skdCountsPromise = prisma.surat.groupBy({
      by: ["status"],
      where: generateWhereClause("SKD"),
      _count: true,
    });

    const [sktmCounts, skuCounts, skbpkCounts, skdCounts] =
      await prisma.$transaction([
        sktmCountsPromise,
        skuCountsPromise,
        skbpkCountsPromise,
        skdCountsPromise,
      ]);

    return {
      SKTM: generateTotalFromSuratStatusGroup(sktmCounts),
      SKU: generateTotalFromSuratStatusGroup(skuCounts),
      SKBPK: generateTotalFromSuratStatusGroup(skbpkCounts),
      SKD: generateTotalFromSuratStatusGroup(skdCounts),
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch kategori surat.");
  }
}

export async function fetchUserBiodata() {
  noStore();
  const session = await getCurrentSession();
  const currentUserId = session?.user.id;

  try {
    const data = await prisma.warga.findFirst({
      where: {
        id_user: currentUserId,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch current biodata.");
  }
}

export async function fetchUserUsername() {
  noStore();
  const session = await getCurrentSession();
  const currentUserId = session?.user.id;

  try {
    const data = await prisma.user.findUnique({
      where: {
        id: currentUserId,
      },
      select: {
        username: true,
      },
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user username.");
  }
}

export async function fetchALlUserSurat() {
  noStore();
  const session = await getCurrentSession();
  const currentWargaid = session?.user.id_warga;

  try {
    const data = await prisma.surat.findMany({
      where: {
        id_warga: currentWargaid,
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
    throw new Error("Failed to fetch all user surat.");
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
    const countSurat = await prisma.surat.groupBy({
      by: ["status"],
      _count: true,
      where: {
        id_warga: currentWargaid,
      },
    });

    const count = generateTotalFromSuratStatusGroup(countSurat);

    return {
      total: count.total,
      pending: count.pending,
      diproses: count.diproses,
      diterima: count.diterima,
      ditolak: count.ditolak,
      diambil: count.diambil,
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

export async function fetchUserBarChartData() {
  noStore();
  const session = await getCurrentSession();
  const currentWargaid = session?.user.id_warga;

  try {
    const data = await prisma.surat.findMany({
      where: {
        id_warga: currentWargaid,
        createdAt: {
          gte: new Date(new Date().getFullYear(), 0, 1),
          lt: new Date(new Date().getFullYear() + 1, 0, 1),
        },
      },
      select: {
        createdAt: true,
      },
    });

    // Initialize an array with 12 elements for each month
    const monthlyData = Array(12).fill(0) as number[];

    // Fill the array with the data from the database
    data.forEach((item) => {
      const month = item.createdAt.getMonth();
      monthlyData[month]++;
    });

    return [
      {
        name: "Jan",
        total: monthlyData[0],
      },
      {
        name: "Feb",
        total: monthlyData[1],
      },
      {
        name: "Mar",
        total: monthlyData[2],
      },
      {
        name: "Apr",
        total: monthlyData[3],
      },
      {
        name: "Mei",
        total: monthlyData[4],
      },
      {
        name: "Jun",
        total: monthlyData[5],
      },
      {
        name: "Jul",
        total: monthlyData[6],
      },
      {
        name: "Agu",
        total: monthlyData[7],
      },
      {
        name: "Sep",
        total: monthlyData[8],
      },
      {
        name: "Okt",
        total: monthlyData[9],
      },
      {
        name: "Nov",
        total: monthlyData[10],
      },
      {
        name: "Des",
        total: monthlyData[11],
      },
    ] as { name: string; total: number }[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total surat by month.");
  }
}

//! ADMIN DASHBOARD DATA

export async function fetchTotalSurat() {
  const session = await getCurrentSession();
  if (session?.user.role === "WARGA") {
    throw new Error("Failed to fetch total surat.");
  }

  try {
    const countSurat = await prisma.surat.groupBy({
      by: ["status"],
      _count: true,
    });

    const count = generateTotalFromSuratStatusGroup(countSurat);

    return {
      total: count.total,
      pending: count.pending,
      diproses: count.diproses,
      diterima: count.diterima,
      ditolak: count.ditolak,
      diambil: count.diambil,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total surat.");
  }
}

export async function fetchLatestSurat() {
  noStore();
  const session = await getCurrentSession();
  if (session?.user.role === "WARGA") {
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
  if (session?.user.role === "WARGA") {
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
export async function fetchBarChartData() {
  noStore();

  try {
    const data = await prisma.surat.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), 0, 1),
          lt: new Date(new Date().getFullYear() + 1, 0, 1),
        },
      },
      select: {
        createdAt: true,
      },
    });

    // Initialize an array with 12 elements for each month
    const monthlyData = Array(12).fill(0) as number[];

    // Fill the array with the data from the database
    data.forEach((item) => {
      const month = item.createdAt.getMonth();
      monthlyData[month]++;
    });

    return [
      {
        name: "Jan",
        total: monthlyData[0],
      },
      {
        name: "Feb",
        total: monthlyData[1],
      },
      {
        name: "Mar",
        total: monthlyData[2],
      },
      {
        name: "Apr",
        total: monthlyData[3],
      },
      {
        name: "Mei",
        total: monthlyData[4],
      },
      {
        name: "Jun",
        total: monthlyData[5],
      },
      {
        name: "Jul",
        total: monthlyData[6],
      },
      {
        name: "Agu",
        total: monthlyData[7],
      },
      {
        name: "Sep",
        total: monthlyData[8],
      },
      {
        name: "Okt",
        total: monthlyData[9],
      },
      {
        name: "Nov",
        total: monthlyData[10],
      },
      {
        name: "Des",
        total: monthlyData[11],
      },
    ] as { name: string; total: number }[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total surat by month.");
  }
}

export async function fetchSuratDiambil() {
  noStore();
  const session = await getCurrentSession();
  if (session?.user.role === "WARGA") {
    throw new Error("Failed to fetch surat diambil.");
  }

  try {
    const data = await prisma.surat.findMany({
      where: {
        status: "DIAMBIL",
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        kategori_surat: true,
        warga: {
          select: {
            nama: true,
            nik: true,
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch surat diambil.");
  }
}

export async function fetchAllSurat() {
  noStore();
  const session = await getCurrentSession();
  if (session?.user.role === "WARGA") {
    throw new Error("Failed to fetch surat pending.");
  }

  try {
    const data = await prisma.surat.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        kategori_surat: true,
        warga: {
          select: {
            nama: true,
            nik: true,
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all surat.");
  }
}

export async function fetchSuratById(id: string) {
  noStore();

  try {
    const data = await prisma.surat.findUnique({
      where: {
        id: id,
      },
      include: {
        kategori_surat: true,
        warga: {
          select: {
            nama: true,
            nik: true,
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch surat by id.");
  }
}
