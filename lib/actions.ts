"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import {
  changePasswordSchema,
  createWargaSchema,
  createSktmSchema,
} from "@/types/schema";
import { format } from "date-fns";
import { hash, compare } from "bcryptjs";
import { getCurrentSession } from "./auth";
import { type ActionsResponse } from "@/types/types";
import type * as z from "zod";
type CreateWarga = z.infer<typeof createWargaSchema>;
type ChangePassword = z.infer<typeof changePasswordSchema>;
type CreateSktm = z.infer<typeof createSktmSchema>;

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
    const isExist = await prisma.warga.findFirst({
      where: {
        nik: validatedData.data.nik,
      },
    });

    if (isExist) {
      return {
        success: false,
        message: "NIK sudah terdaftar",
      };
    }

    const hashedPassword = await hash(
      format(validatedData.data.tanggal_lahir, "ddMMyyyy"),
      10
    );

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
      message: "Warga berhasil ditambahkan",
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
    });

    if (!user) return { success: false, message: "Warga tidak ditemukan" };

    const isExist = await prisma.warga.findFirst({
      where: {
        nik: {
          equals: validatedData.data.nik,
        },
        NOT: {
          nik: user.username,
        },
      },
    });

    if (isExist) {
      return {
        success: false,
        message: "NIK sudah terdaftar",
      };
    }

    const hashedPassword = await hash(
      format(validatedData.data.tanggal_lahir, "ddMMyyyy"),
      10
    );

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        username: validatedData.data.nik,
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
      message: "Warga berhasil diubah",
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
    const user = await prisma.user.findFirst({
      where: {
        warga: {
          id,
        },
      },
    });

    if (!user) return { success: false, message: "Warga tidak ditemukan" };

    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Warga berhasil dihapus",
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
        message: "User tidak ditemukan",
      };
    }

    const isPasswordMatch = await compare(
      validatedData.data.old_password,
      user.password
    );

    if (!isPasswordMatch) {
      return {
        success: false,
        message: "Kata sandi lama tidak sesuai",
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
      message: "Kata sandi berhasil diubah",
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

    if (!warga) return { success: false, message: "Warga tidak ditemukan" };

    if (!kategoriSurat)
      return {
        success: false,
        message: "Kategori surat tidak ditemukan",
      };

    const result = await prisma.surat.create({
      data: {
        keperluan: validatedData.data.keperluan,
        dtks: validatedData.data.informasi.includes("dtks") ? true : false,
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
