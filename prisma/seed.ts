import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("123456", 10);

  await prisma.user.upsert({
    where: {
      email: "admin@stocksales.com",
    },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@stocksales.com",
      password: passwordHash,
    },
  });

  console.log("Usuário de teste criado com sucesso.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });