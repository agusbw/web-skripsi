import { changePasswordSchema } from "@/types/types";
import prisma from "@/lib/prisma";
import { compare, hash } from "bcryptjs";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  //reset password

  const id = params.id;
  const data = await request.json();

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

    const result = changePasswordSchema.safeParse(data);

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

    const { oldPassword, newPassword } = result.data;

    //get the old password from database
    const oldPasswordFromDatabase = user.password;

    //compare the old password from database with the old password from request
    const isOldPasswordValid = await compare(
      oldPassword,
      oldPasswordFromDatabase
    );

    if (!isOldPasswordValid) {
      return Response.json(
        {
          success: false,
          message: "Password lama tidak cocok!",
        },
        {
          status: 400,
        }
      );
    }

    //hash the new password

    const hashedNewPassword = await hash(newPassword, 10);

    //update the password
    const res = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: hashedNewPassword,
      },
    });

    return Response.json({
      success: true,
      message: "Password berhasil diubah!",
      data: res,
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Terjadi kesalahan!",
      },
      {
        status: 500,
      }
    );
  }
}
