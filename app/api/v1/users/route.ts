import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";
import { registerUserSchema } from "@/types/types";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const data = await request.json();
  const result = registerUserSchema.safeParse(data);

  if (!result.success) {
    let errorMessage = "";

    result.error.issues.forEach((issue) => {
      errorMessage += issue.message + "\n";
    });

    console.log(errorMessage);
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

  try {
    //cek username
    const checkUsername = await prisma.user.findUnique({
      where: {
        username: result.data.username,
      },
    });

    if (checkUsername) {
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

    //hash password
    const hashedPassword = await hash(result.data.password, 10);

    const user = await prisma.user.create({
      data: {
        username: result.data.username,
        password: hashedPassword,
      },
    });
    return Response.json(
      {
        success: true,
        message: "Berhasil membuat akun baru",
        data: user,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Terjadi kesalahan saat membuat akun baru, coba lagi!",
      },
      {
        status: 500,
      }
    );
  }
}
