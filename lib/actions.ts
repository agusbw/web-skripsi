"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { createWargaSchema } from "@/types/schema";
import { format } from "date-fns";
import { hash } from "bcryptjs";
import { type ActionsResponse } from "@/types/types";
import * as z from "zod";

type CreateWarga = z.infer<typeof createWargaSchema>;

function generateDataId(format: string, latestId: string) {
  const latestIdNumber = parseInt(latestId.slice(3));
  return format + ("0000" + (latestIdNumber + 1)).slice(-4);
}

export async function createWarga(
  formData: CreateWarga
): Promise<ActionsResponse> {
  let id = "WAR0001";
  const validatedData = createWargaSchema.safeParse(formData);
  if (!validatedData.success) {
    return {
      success: false,
      message: "Data tidak valid",
    };
  }

  try {
    const latestTransaction = await prisma.warga.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    latestTransaction ? (id = generateDataId("WAR", latestTransaction.id)) : id;

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
            id,
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
