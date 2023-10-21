import prisma from "@/lib/prisma";
import { signersSchema } from "@/types/types";

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
    const res = await prisma.penandatangan.delete({
      where: {
        id: id,
      },
    });

    return Response.json(
      {
        success: true,
        message: "Data berhasil dihapus!",
        data: res,
      },
      {
        status: 200,
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
  const id = params.id;

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
    const res = await prisma.penandatangan.update({
      where: {
        id: id,
      },
      data: {
        nama: result.data.nama,
        jabatan: result.data.jabatan,
        alamat: result.data.alamat,
      },
    });

    return Response.json(
      {
        success: true,
        message: "Data berhasil diubah!",
        data: res,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
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
