import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

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

  const perbekel = await prisma.user.findFirst({
    where: {
      username: process.env.ADMIN_USERNAME ?? "perbekel",
    },
  });
  if (!perbekel) {
    const password: string = process.env.PERBEKEL_PASSWORD ?? "password";
    const hashedPassword = await hash(password, 10);
    await prisma.user.create({
      data: {
        username: "perbekel",
        password: hashedPassword,
        role: "PERBEKEL",
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
