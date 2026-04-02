import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";
import { isPasswordStrong } from "@/lib/password-validation";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Dados inválidos." },
        { status: 400 }
      );
    }

    if (!isPasswordStrong(password)) {
      return NextResponse.json(
        {
          message:
            "A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial.",
        },
        { status: 400 }
      );
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return NextResponse.json(
        { message: "E-mail já cadastrado." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "Usuário criado com sucesso.",
    });
  } catch {
    return NextResponse.json(
      { message: "Erro ao criar usuário." },
      { status: 500 }
    );
  }
}