import prisma from "@/lib/prisma";
import { wargaSchema } from "@/types/types";

export const revalidate = 0;
export const dynamic = "force-dynamic";

//add biodata to corresponding user

export async function POST(
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

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
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
    const data = await request.json();
    const result = wargaSchema.safeParse(data);

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

    let wargaId: string;
    const latestWarga = await prisma.warga.findFirst({
      orderBy: {
        id: "desc",
      },
    });
    if (!latestWarga) {
      wargaId = "WAR0001";
    } else {
      const latestId = latestWarga.id;
      const latestIdNumber = parseInt(latestId.slice(3));
      wargaId = "WAR" + ("0000" + (latestIdNumber + 1)).slice(-4);
    }

    const warga = await prisma.warga.create({
      data: {
        id: wargaId,
        nama: result.data.nama,
        alamat: result.data.alamat,
        agama: result.data.agama,
        kewarganegaraan: result.data.kewarganegaraan,
        nik: result.data.nik,
        no_telp: result.data.no_telp,
        pekerjaan: result.data.pekerjaan,
        tanggal_lahir: result.data.tanggal_lahir,
        tempat_lahir: result.data.tempat_lahir,
        status_perkawinan: result.data.status_perkawinan,
        jenis_kelamin: result.data.jenis_kelamin,
        id_user: userId,
      },
    });

    return Response.json(
      {
        success: true,
        message: "Berhasil membuat biodata",
        data: warga,
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    return Response.json(
      {
        success: false,
        message: "Terjadi kesalahan server!",
      },
      {
        status: 500,
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
  const userId = params.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        warga: true,
      },
    });

    if (!user?.warga) {
      return Response.json(
        {
          success: false,
          message: "Data warga tidak ditemukan!",
        },
        {
          status: 404,
        }
      );
    }

    const data = await request.json();
    const result = wargaSchema.safeParse(data);

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

    const res = await prisma.warga.update({
      where: {
        id: user.warga.id,
      },
      data: {
        nama: result.data.nama,
        alamat: result.data.alamat,
        agama: result.data.agama,
        kewarganegaraan: result.data.kewarganegaraan,
        nik: result.data.nik,
        no_telp: result.data.no_telp,
        pekerjaan: result.data.pekerjaan,
        tanggal_lahir: result.data.tanggal_lahir,
        tempat_lahir: result.data.tempat_lahir,
        status_perkawinan: result.data.status_perkawinan,
        jenis_kelamin: result.data.jenis_kelamin,
      },
    });

    return Response.json(
      {
        success: true,
        message: "Berhasil mengubah biodata",
        data: res,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return Response.json(
      {
        success: false,
        message: "Terjadi kesalahan server!",
      },
      {
        status: 500,
      }
    );
  }
}
