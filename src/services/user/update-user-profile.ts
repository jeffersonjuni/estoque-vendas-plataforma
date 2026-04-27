import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";

export async function updateUserProfile(data: {
  name: string;
  email: string;
}) {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    throw new Error("Não autorizado");
  }

  const userId = session.user.id;

  // verificar email duplicado
  const existingUser = await prisma.user.findFirst({
    where: {
      email: data.email,
      NOT: { id: userId },
    },
  });

  if (existingUser) {
    throw new Error("E-mail já está em uso");
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      email: data.email,
    },
  });

  return updatedUser;
}