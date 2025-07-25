import { comparePasswords } from "@/app/lib/auth/auth";
import { signToken } from "@/app/lib/auth/verifyToken";
import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const validatedUser = await comparePasswords(password, user.password);
    if (!validatedUser) {
      return NextResponse.json({
        message: "La Contraseña ingresada es incorrecta",
      });
    }

    const token = await signToken({ id: user.id, email: user.email });

    return NextResponse.json({
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("Error al listar por id ".error?.message || error);
    return NextResponse.json(
      {
        message: "Ha ocurrido un error en el servidor ",
      },
      { status: 500 }
    );
  }
}
