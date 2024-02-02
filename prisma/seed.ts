import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import format from "date-fns/format";

const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.findFirst({
    where: {
      username: process.env.ADMIN_USERNAME ?? "admin",
    },
  });
  if (!admin) {
    const password: string = process.env.ADMIN_PASSWORD ?? "password";
    const hashedPassword = await hash(password, 10);
    await prisma.user.create({
      data: {
        username: "admin",
        password: hashedPassword,
        role: "ADMIN",
      },
    });
  }

  const warga = await prisma.user.findFirst({
    where: {
      username: "5108030107020007",
    },
  });

  if (!warga) {
    const date = new Date("2002-07-01");
    const formattedDate = format(date, "ddMMyyyy");
    const hashedPassword = await hash(formattedDate, 10);
    await prisma.user.create({
      data: {
        username: "5108030107020007",
        password: hashedPassword,
        role: "WARGA",
        warga: {
          create: {
            nama: "Nyoman Agus Budhiarta Waisnawa",
            nik: "5108030107020007",
            tempat_lahir: "Denpasar",
            tanggal_lahir: date,
            agama: "HINDU",
            alamat: "Banjar Dinas Pelapuan",
            jenis_kelamin: true,
            pekerjaan: "Mahasiswa",
            kewarganegaraan: "WNI",
            no_kk: "5108030107020007",
            status_perkawinan: "BELUM_KAWIN",
          },
        },
      },
    });

    const SKTM = await prisma.kategoriSurat.findFirst({
      where: {
        kode: "SKTM",
      },
    });

    if (!SKTM) {
      await prisma.kategoriSurat.create({
        data: {
          kode: "SKTM",
          nama: "Surat Keterangan Tidak Mampu",
        },
      });
    }

    const SKU = await prisma.kategoriSurat.findFirst({
      where: {
        kode: "SKU",
      },
    });

    if (!SKU) {
      await prisma.kategoriSurat.create({
        data: {
          kode: "SKU",
          nama: "Surat Keterangan Usaha",
        },
      });
    }

    const SKBPK = await prisma.kategoriSurat.findFirst({
      where: {
        kode: "SKBPK",
      },
    });

    if (!SKBPK) {
      await prisma.kategoriSurat.create({
        data: {
          kode: "SKBPK",
          nama: "Surat Keterangan Belum Pernah Kawin",
        },
      });
    }

    const SKD = await prisma.kategoriSurat.findFirst({
      where: {
        kode: "SKD",
      },
    });

    if (!SKD) {
      await prisma.kategoriSurat.create({
        data: {
          kode: "SKD",
          nama: "Surat Keterangan Domisili",
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
