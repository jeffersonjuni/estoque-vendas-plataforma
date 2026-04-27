import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import bcrypt from "bcrypt";
import { isPasswordStrong } from "@/lib/password-validation";

export async function updateUserPassword(data: {
  currentPassword: string;
  newPassword: string;
}) {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    throw new Error("Não autorizado");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  // 🔐 validar senha atual
  const isValid = await bcrypt.compare(
    data.currentPassword,
    user.password
  );

  if (!isValid) {
    throw new Error("Senha atual incorreta");
  }

  // validar nova senha (MESMA REGRA DO REGISTER)
  if (!isPasswordStrong(data.newPassword)) {
    throw new Error(
      "A nova senha deve conter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial."
    );
  }

  const hashedPassword = await bcrypt.hash(data.newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
    },
  });

  return { success: true };
}