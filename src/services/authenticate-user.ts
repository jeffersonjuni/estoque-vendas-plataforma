import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

type AuthenticateUserParams = {
  email: string;
  password: string;
};

export async function authenticateUser({
  email,
  password,
}: AuthenticateUserParams) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}