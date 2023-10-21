import prisma from "@/lib/prisma";
import { updateUserSchema } from "@/types/types";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const id = params.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User tidak ditemukan!",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return Response.json({
      success: true,
      message: "User berhasil dihapus!",
    });
  } catch (e) {
    return Response.json({
      success: false,
      message: "Terjadi kesalahan!",
    });
  }
}

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const userId = params.id;
  let data = await request.json();
  if (!data.role) {
    data.role = "WARGA";
  }
  try {
    //check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!data.username) {
      data.username = user?.username;
    }

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User tidak ditemukan!",
        },
        {
          status: 404,
        }
      );
    }

    const result = updateUserSchema.safeParse(data);

    if (!result.success) {
      let errorMessage = "";

      result.error.issues.forEach((issue) => {
        errorMessage += issue.message + "\n";
      });

      return Response.json(
        {
          success: false,
          message: "Data tidak valid!",
          errors: errorMessage,
        },
        {
          status: 400,
        }
      );
    }

    //check if the username is already taken
    const username = result.data.username;
    const usernameExists = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (usernameExists && usernameExists.id !== userId) {
      return Response.json(
        {
          success: false,
          message: "Username sudah digunakan!",
        },
        {
          status: 400,
        }
      );
    }

    //update the user
    const res = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: result.data.username,
        role: result.data.role,
      },
    });

    return Response.json({
      success: true,
      message: "User berhasil diupdate!",
      data: res,
    });
  } catch (e) {
    return Response.json({
      success: false,
      message: "Terjadi kesalahan!",
    });
  }
}
