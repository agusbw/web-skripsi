"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import {
  changePasswordSchema,
  createWargaSchema,
  createSktmSchema,
  createSkbpkSchema,
  insertSkuSchema,
  createSkdSchema,
  tolakSuratSchema,
  createNomorSuratSchema,
  changeUsernameSchema,
} from "@/types/schema";
import { format } from "date-fns";
import { hash, compare } from "bcryptjs";
import { getCurrentSession } from "./auth";
import { type ActionsResponse } from "@/types/types";
import { utcToZonedTime } from "date-fns-tz";
import { utapi } from "./uploathing";
import type * as z from "zod";
type CreateWarga = z.infer<typeof createWargaSchema>;
type ChangePassword = z.infer<typeof changePasswordSchema>;
type CreateSktm = z.infer<typeof createSktmSchema>;
type CreateSkbpk = z.infer<typeof createSkbpkSchema>;
type CreateSku = z.infer<typeof insertSkuSchema>;
type CreateSkd = z.infer<typeof createSkdSchema>;
type TolakSurat = z.infer<typeof tolakSuratSchema>;
type CreateNomorSurat = z.infer<typeof createNomorSuratSchema>;
type ChangeUsername = z.infer<typeof changeUsernameSchema>;

export async function createWarga(
  formData: CreateWarga
): Promise<ActionsResponse> {
  const session = await getCurrentSession();
  if (!session || session.user.role !== "ADMIN") {
    return {
      success: false,
      message: "Anda tidak memiliki akses",
    };
  }

  const validatedData = createWargaSchema.safeParse(formData);
  if (!validatedData.success) {
    return {
      success: false,
      message: "Data tidak valid",
    };
  }

  try {
    const isExist = await prisma.warga.count({
      where: {
        nik: validatedData.data.nik,
      },
    });

    if (isExist > 0) {
      return {
        success: false,
        message: "NIK sudah terdaftar",
      };
    }

    const newTanggalLahir = utcToZonedTime(
      new Date(validatedData.data.tanggal_lahir),
      "Asia/Singapore"
    );

    const hashedPassword = await hash(format(newTanggalLahir, "ddMMyyyy"), 10);

    const user = await prisma.user.create({
      data: {
        username: validatedData.data.nik,
        password: hashedPassword,
        warga: {
          create: {
            ...validatedData.data,
            jenis_kelamin: validatedData.data.jenis_kelamin === "true",
          },
        },
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Berhasil menambahkan data warga",
      data: user,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Terjadi kesalahan pada server",
    };
  }
}

export async function updateWarga(
  id: string,
  formData: CreateWarga
): Promise<ActionsResponse> {
  const session = await getCurrentSession();
  if (!session || session.user.role !== "ADMIN") {
    return {
      success: false,
      message: "Anda tidak memiliki akses",
    };
  }

  const validatedData = createWargaSchema.safeParse(formData);
  if (!validatedData.success) {
    return {
      success: false,
      message: "Data tidak valid",
    };
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        warga: {
          id,
        },
      },
      include: {
        warga: {
          select: {
            tanggal_lahir: true,
            nik: true,
          },
        },
      },
    });

    if (!user) return { success: false, message: "Data warga tidak ditemukan" };

    const isExist = await prisma.warga.count({
      where: {
        nik: {
          equals: validatedData.data.nik,
        },
        NOT: {
          nik: user.warga?.nik,
        },
      },
    });

    if (isExist > 0) {
      return {
        success: false,
        message: "NIK sudah terdaftar",
      };
    }

    //check if user change his password
    let formattedOldTanggalLahir = "";

    if (user.warga?.tanggal_lahir) {
      const oldTanggalLahir = utcToZonedTime(
        user.warga.tanggal_lahir,
        "Asia/Singapore"
      );

      formattedOldTanggalLahir = format(oldTanggalLahir, "ddMMyyyy");
    }

    //compare user formatted tanggal lahir with password
    const isSame = await compare(formattedOldTanggalLahir, user.password);

    let hashedPassword = user.password;

    if (isSame) {
      const newTanggalLahir = utcToZonedTime(
        new Date(validatedData.data.tanggal_lahir),
        "Asia/Singapore"
      );

      hashedPassword = await hash(format(newTanggalLahir, "ddMMyyyy"), 10);
    }

    // check if user change his nik
    const isUsernameEqualsToNik = user.username === user.warga?.nik;

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        username: isUsernameEqualsToNik
          ? validatedData.data.nik
          : user.username,
        warga: {
          update: {
            ...validatedData.data,
            jenis_kelamin: validatedData.data.jenis_kelamin === "true",
          },
        },
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Berhasil mengubah data warga",
      data: updatedUser,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Terjadi kesalahan pada server",
    };
  }
}

export async function deleteWarga(id: string): Promise<ActionsResponse> {
  const session = await getCurrentSession();
  if (!session || session.user.role !== "ADMIN") {
    return {
      success: false,
      message: "Anda tidak memiliki akses",
    };
  }

  try {
    const userCount = await prisma.user.count({
      where: {
        id,
      },
    });

    if (userCount <= 0)
      return { success: false, message: "Data warga tidak ditemukan" };

    await prisma.user.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Data warga berhasil dihapus",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Terjadi kesalahan pada server",
    };
  }
}

export async function changePassword(
  values: ChangePassword
): Promise<ActionsResponse> {
  try {
    const session = await getCurrentSession();

    if (!session) {
      return {
        success: false,
        message: "Anda belum login",
      };
    }

    const validatedData = changePasswordSchema.safeParse(values);
    if (!validatedData.success) {
      return {
        success: false,
        message: "Data tidak valid",
      };
    }

    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Data user tidak ditemukan",
      };
    }

    const isPasswordMatch = await compare(
      validatedData.data.old_password,
      user.password
    );

    if (!isPasswordMatch) {
      return {
        success: false,
        message: "Password lama tidak sesuai",
      };
    }

    const hashedPassword = await hash(validatedData.data.new_password, 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "Berhasil mengubah password",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Terjadi kesalahan pada server",
    };
  }
}

export async function changeUsername(
  values: ChangeUsername
): Promise<ActionsResponse> {
  try {
    const session = await getCurrentSession();

    if (!session) {
      return {
        success: false,
        message: "Anda belum login",
      };
    }

    const validatedData = changeUsernameSchema.safeParse(values);
    if (!validatedData.success) {
      return {
        success: false,
        message: "Data tidak valid",
      };
    }

    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Data user tidak ditemukan",
      };
    }

    // check if username is already used
    const isExist = await prisma.user.count({
      where: {
        username: validatedData.data.username,
        NOT: {
          id: user.id,
        },
      },
    });

    if (isExist > 0) {
      return {
        success: false,
        message: "Username sudah terdaftar",
      };
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        username: validatedData.data.username,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Berhasil mengubah username",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Terjadi kesalahan pada server",
    };
  }
}

export async function createSktm(
  formData: CreateSktm
): Promise<ActionsResponse> {
  const session = await getCurrentSession();
  if (!session) return { success: false, message: "Anda belum login" };
  if (!session.user.id_warga)
    return { success: false, message: "Anda belum terdaftar sebagai warga" };

  const validatedData = createSktmSchema.safeParse(formData);

  if (!validatedData.success) {
    return {
      success: false,
      message: "Data tidak valid",
    };
  }

  try {
    const kategoriSurat = await prisma.kategoriSurat.findUnique({
      where: {
        kode: "SKTM",
      },
    });

    const warga = await prisma.warga.findUnique({
      where: {
        id: session.user.id_warga,
      },
    });

    if (!warga)
      return { success: false, message: "Data warga tidak ditemukan" };

    if (!kategoriSurat)
      return {
        success: false,
        message: "Data kategori surat tidak tersedia",
      };

    const result = await prisma.surat.create({
      data: {
        keperluan: validatedData.data.keperluan,
        id_warga: session.user.id_warga,
        id_kategori_surat: kategoriSurat.id,
        agama: warga.agama,
        jenis_kelamin: warga.jenis_kelamin,
        nama: warga.nama,
        nik: warga.nik,
        pekerjaan: warga.pekerjaan,
        tempat_lahir: warga.tempat_lahir,
        alamat: warga.alamat,
        tanggal_lahir: warga.tanggal_lahir,
        kewarganegaraan: warga.kewarganegaraan,
        no_kk: warga.no_kk,
        status_perkawinan: warga.status_perkawinan,

        dtks: validatedData.data.informasi.includes("dtks") ? true : false,
      },
    });

    revalidatePath("/");
    return {
      success: true,
      message: "Surat keterangan berhasil diajukan",
      data: result,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Terjadi kesalahan pada server",
    };
  }
}

export async function createSkbpk(
  formData: CreateSkbpk
): Promise<ActionsResponse> {
  const session = await getCurrentSession();
  if (!session) return { success: false, message: "Anda belum login" };
  if (!session.user.id_warga)
    return { success: false, message: "Anda belum terdaftar sebagai warga" };

  const validatedData = createSkbpkSchema.safeParse(formData);

  if (!validatedData.success) {
    return {
      success: false,
      message: "Data tidak valid",
    };
  }

  try {
    const kategoriSurat = await prisma.kategoriSurat.findUnique({
      where: {
        kode: "SKBPK",
      },
    });

    const warga = await prisma.warga.findUnique({
      where: {
        id: session.user.id_warga,
      },
    });

    if (!warga)
      return { success: false, message: "Data warga tidak ditemukan" };

    if (!kategoriSurat)
      return {
        success: false,
        message: "Data kategori surat tidak tersedia",
      };

    const result = await prisma.surat.create({
      data: {
        keperluan: validatedData.data.keperluan,
        id_warga: session.user.id_warga,
        id_kategori_surat: kategoriSurat.id,
        agama: warga.agama,
        jenis_kelamin: warga.jenis_kelamin,
        nama: warga.nama,
        nik: warga.nik,
        pekerjaan: warga.pekerjaan,
        tempat_lahir: warga.tempat_lahir,
        alamat: warga.alamat,
        tanggal_lahir: warga.tanggal_lahir,
        kewarganegaraan: warga.kewarganegaraan,
        no_kk: warga.no_kk,
        status_perkawinan: warga.status_perkawinan,
      },
    });

    revalidatePath("/");
    return {
      success: true,
      message: "Surat keterangan berhasil diajukan",
      data: result,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Terjadi kesalahan pada server",
    };
  }
}

export async function createSku(formData: CreateSku): Promise<ActionsResponse> {
  const session = await getCurrentSession();
  if (!session) return { success: false, message: "Anda belum login" };
  if (!session.user.id_warga)
    return { success: false, message: "Anda belum terdaftar sebagai warga" };

  const validatedData = insertSkuSchema.safeParse(formData);

  if (!validatedData.success) {
    return {
      success: false,
      message: "Data tidak valid",
    };
  }

  try {
    const kategoriSurat = await prisma.kategoriSurat.findUnique({
      where: {
        kode: "SKU",
      },
    });

    const warga = await prisma.warga.findUnique({
      where: {
        id: session.user.id_warga,
      },
    });

    if (!warga)
      return { success: false, message: "Data warga tidak ditemukan" };

    if (!kategoriSurat)
      return {
        success: false,
        message: "Data kategori surat tidak tersedia",
      };

    const result = await prisma.surat.create({
      data: {
        keperluan: validatedData.data.keperluan,
        id_warga: session.user.id_warga,
        id_kategori_surat: kategoriSurat.id,
        agama: warga.agama,
        jenis_kelamin: warga.jenis_kelamin,
        nama: warga.nama,
        nik: warga.nik,
        pekerjaan: warga.pekerjaan,
        tempat_lahir: warga.tempat_lahir,
        alamat: warga.alamat,
        tanggal_lahir: warga.tanggal_lahir,
        kewarganegaraan: warga.kewarganegaraan,
        no_kk: warga.no_kk,
        status_perkawinan: warga.status_perkawinan,

        lokasi_usaha: validatedData.data.lokasi_usaha,
        nama_usaha: validatedData.data.nama_usaha,
        foto_usaha: validatedData.data.foto_usaha,
      },
    });

    revalidatePath("/");
    return {
      success: true,
      message: "Surat keterangan berhasil diajukan",
      data: result,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Terjadi kesalahan pada server",
    };
  }
}

export async function createSkd(formData: CreateSkd): Promise<ActionsResponse> {
  const session = await getCurrentSession();
  if (!session) return { success: false, message: "Anda belum login" };
  if (!session.user.id_warga)
    return { success: false, message: "Anda belum terdaftar sebagai warga" };

  const validatedData = createSkdSchema.safeParse(formData);

  if (!validatedData.success) {
    return {
      success: false,
      message: "Data tidak valid",
    };
  }

  try {
    const kategoriSurat = await prisma.kategoriSurat.findUnique({
      where: {
        kode: "SKD",
      },
    });

    const warga = await prisma.warga.findUnique({
      where: {
        id: session.user.id_warga,
      },
    });

    if (!warga)
      return { success: false, message: "Data warga tidak ditemukan" };

    if (!kategoriSurat)
      return {
        success: false,
        message: "Data kategori surat tidak tersedia",
      };

    const result = await prisma.surat.create({
      data: {
        keperluan: validatedData.data.keperluan,
        id_warga: session.user.id_warga,
        id_kategori_surat: kategoriSurat.id,
        agama: warga.agama,
        jenis_kelamin: warga.jenis_kelamin,
        nama: warga.nama,
        nik: warga.nik,
        pekerjaan: warga.pekerjaan,
        tempat_lahir: warga.tempat_lahir,
        alamat: warga.alamat,
        tanggal_lahir: warga.tanggal_lahir,
        kewarganegaraan: warga.kewarganegaraan,
        no_kk: warga.no_kk,
        status_perkawinan: warga.status_perkawinan,

        domisili: validatedData.data.domisili,
      },
    });

    revalidatePath("/");
    return {
      success: true,
      message: "Surat keterangan berhasil diajukan",
      data: result,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Terjadi kesalahan pada server",
    };
  }
}

export async function tolakSurat(
  id: string,
  formData: TolakSurat
): Promise<ActionsResponse> {
  const session = await getCurrentSession();
  if (!session || session.user.role === "WARGA") {
    return {
      success: false,
      message: "Anda tidak memiliki akses",
    };
  }

  const validatedData = tolakSuratSchema.safeParse(formData);

  if (!validatedData.success) {
    return {
      success: false,
      message: "Data tidak valid",
    };
  }

  try {
    const surat = await prisma.surat.findFirst({
      where: {
        id,
      },
    });

    if (!surat)
      return { success: false, message: "Data surat tidak ditemukan" };

    await prisma.surat.update({
      where: {
        id: surat.id,
      },
      data: {
        status: "DITOLAK",
        no_surat: null,
        pesan_penolakan: validatedData.data.pesan_penolakan,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Pengajuan berhasil ditolak",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Terjadi kesalahan pada server",
    };
  }
}

export async function prosesSurat(id: string) {
  const session = await getCurrentSession();
  if (!session || session.user.role !== "ADMIN") {
    return {
      success: false,
      message: "Anda tidak memiliki akses",
    };
  }

  try {
    const surat = await prisma.surat.findFirst({
      where: {
        id,
      },
    });

    if (!surat)
      return { success: false, message: "Data surat tidak ditemukan" };

    await prisma.surat.update({
      where: {
        id: surat.id,
      },
      data: {
        status: "DIPROSES",
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Status surat berhasil diubah menjadi diproses",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Terjadi kesalahan pada server",
    };
  }
}

export async function terimaSurat(id: string) {
  const session = await getCurrentSession();
  if (!session || session.user.role !== "PERBEKEL") {
    return {
      success: false,
      message: "Anda tidak memiliki akses",
    };
  }

  try {
    const surat = await prisma.surat.findFirst({
      where: {
        id,
      },
    });

    if (!surat)
      return { success: false, message: "Data surat tidak ditemukan" };

    await prisma.surat.update({
      where: {
        id: surat.id,
      },
      data: {
        status: "DITERIMA",
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Status surat berhasil diubah menjadi diterima",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Terjadi kesalahan pada server",
    };
  }
}

export async function createNomorSurat(
  id: string,
  formData: CreateNomorSurat
): Promise<ActionsResponse> {
  const session = await getCurrentSession();
  if (!session || session.user.role !== "ADMIN") {
    return {
      success: false,
      message: "Anda tidak memiliki akses",
    };
  }

  const validatedData = createNomorSuratSchema.safeParse(formData);

  if (!validatedData.success) {
    return {
      success: false,
      message: "Data tidak valid",
    };
  }

  try {
    const surat = await prisma.surat.findFirst({
      where: {
        id,
      },
    });

    if (!surat)
      return { success: false, message: "Data surat tidak ditemukan" };

    if (validatedData.data.no_surat) {
      const isExist = await prisma.surat.findFirst({
        where: {
          no_surat: validatedData.data.no_surat,
        },
      });

      if (isExist) {
        return {
          success: false,
          message: "Nomor surat sudah terdaftar",
        };
      }
    }

    await prisma.surat.update({
      where: {
        id: surat.id,
      },
      data: {
        no_surat: validatedData.data.no_surat
          ? validatedData.data.no_surat
          : null,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Nomor surat berhasil diubah",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Terjadi kesalahan pada server",
    };
  }
}

export async function ambilSurat(id: string) {
  const session = await getCurrentSession();
  if (!session || session.user.role !== "ADMIN") {
    return {
      success: false,
      message: "Anda tidak memiliki akses",
    };
  }

  try {
    const surat = await prisma.surat.findFirst({
      where: {
        id,
      },
    });

    if (!surat)
      return { success: false, message: "Data surat tidak ditemukan" };

    await prisma.surat.update({
      where: {
        id: surat.id,
      },
      data: {
        status: "DIAMBIL",
        tanggal_pengambilan: new Date(),
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Status surat berhasil diubah menjadi diambil",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Terjadi kesalahan pada server",
    };
  }
}

export async function resetPasswordWarga(user_id: string) {
  const session = await getCurrentSession();
  if (!session || session.user.role !== "ADMIN") {
    return {
      success: false,
      message: "Anda tidak memiliki akses",
    };
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
      include: {
        warga: {
          select: {
            tanggal_lahir: true,
          },
        },
      },
    });

    if (!user || !user.warga)
      return { success: false, message: "Data warga tidak ditemukan" };

    const newTanggalLahir = utcToZonedTime(
      new Date(user.warga.tanggal_lahir),
      "Asia/Singapore"
    );

    const hashedPassword = await hash(format(newTanggalLahir, "ddMMyyyy"), 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "Password berhasil direset",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Terjadi kesalahan pada server",
    };
  }
}

export async function resetUsernameWarga(user_id: string) {
  const session = await getCurrentSession();
  if (!session || session.user.role !== "ADMIN") {
    return {
      success: false,
      message: "Anda tidak memiliki akses",
    };
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
      include: {
        warga: {
          select: {
            nik: true,
          },
        },
      },
    });

    if (!user || !user.warga)
      return { success: false, message: "Data warga tidak ditemukan" };

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        username: user.warga.nik,
      },
    });

    return {
      success: true,
      message: "Username berhasil direset menjadi NIK",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Terjadi kesalahan pada server",
    };
  }
}

export async function deleteSurat(id: string) {
  const session = await getCurrentSession();
  if (!session || session.user.role !== "ADMIN") {
    return {
      success: false,
      message: "Anda tidak memiliki akses",
    };
  }

  try {
    const surat = await prisma.surat.findFirst({
      where: {
        id,
      },
      include: {
        kategori_surat: {
          select: {
            kode: true,
          },
        },
      },
    });

    if (!surat)
      return { success: false, message: "Data surat tidak ditemukan" };

    if (surat.kategori_surat.kode === "SKU" && surat.foto_usaha) {
      await deleteFileByURL(surat.foto_usaha);
    }

    await prisma.surat.delete({
      where: {
        id: surat.id,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Data surat berhasil dihapus",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Terjadi kesalahan pada server",
    };
  }
}

export async function uploadFiles(fd: FormData) {
  try {
    const files = fd.getAll("files");
    return await utapi.uploadFiles(files);
  } catch (err) {
    throw new Error("Gagal upload foto");
  }
}

export async function deleteFileByURL(url: string) {
  try {
    const parts = url.split("/");

    const filename = parts[parts.length - 1];
    if (filename) {
      return await utapi.deleteFiles(filename);
    }
    return false;
  } catch (err) {
    throw new Error("Gagal delete foto");
  }
}
