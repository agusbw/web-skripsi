import prisma from "@/lib/prisma";
import { signersSchema } from "@/types/types";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const data = await request.json();

  const result = signersSchema.safeParse(data);

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

  try {
    const signer = await prisma.penandatangan.create({
      data: {
        ...result.data,
      },
    });

    return Response.json(
      {
        success: true,
        message: "Data berhasil ditambahkan!",
        data: signer,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Terjadi kesalahan!",
      },
      {
        status: 400,
      }
    );
  }
}
