import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();
async function main() {
  if (
    !process.env.ADMIN_USERNAME ||
    !process.env.ADMIN_PASSWORD ||
    !process.env.PERBEKEL_PASSWORD ||
    !process.env.PERBEKEL_USERNAME
  ) {
    console.error(
      "Please provide ADMIN_USERNAME, ADMIN_PASSWORD, PERBEKEL_USERNAME, PERBEKEL_PASSWORD in .env file"
    );
    process.exit(1);
  }

  const admin = await prisma.user.findFirst({
    where: {
      username: process.env.ADMIN_USERNAME,
    },
  });
  if (!admin) {
    const password: string = process.env.ADMIN_PASSWORD;
    const hashedPassword = await hash(password, 10);
    await prisma.user.create({
      data: {
        username: process.env.ADMIN_USERNAME,
        password: hashedPassword,
        role: "ADMIN",
      },
    });
  }

  const perbekel = await prisma.user.findFirst({
    where: {
      username: process.env.PERBEKEL_USERNAME,
    },
  });

  if (!perbekel) {
    const password: string = process.env.PERBEKEL_PASSWORD;
    const hashedPassword = await hash(password, 10);
    await prisma.user.create({
      data: {
        username: process.env.PERBEKEL_USERNAME,
        password: hashedPassword,
        role: "PERBEKEL",
      },
    });
  }

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

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
