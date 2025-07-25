import { hashPassword } from "@/app/lib/auth/auth";
import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const user = await prisma.users.findMany();

    return NextResponse.json({ usuarios: user });
  } catch (error) {
    console.error("Error al listar el Usuario".error?.message || error);
    return NextResponse.json(
      {
        message: "Ha ocurrido un error en el servidor ",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { fullname, email, password } = await request.json();

    const hash = await hashPassword(password);

    const user = await prisma.users.create({
      data: {
        fullname,
        email,
        password: hash,
      },
    });

    return NextResponse.json({ "Usuario Registrado Exitosamente": user });
  } catch (error) {
    console.error("Error al crear el Usuario".error?.message || error);
    return NextResponse.json(
      {
        message: "Ha ocurrido un error en el servidor ",
      },
      { status: 500 }
    );
  }
}
