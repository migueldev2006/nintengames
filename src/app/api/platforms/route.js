import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const platform = await prisma.platforms.findMany();

    return NextResponse.json({ Plataformas: platform });
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

export async function POST(request) {
  try {
    const json = await request.json();

    const platform = await prisma.platforms.create({
      data: json,
    });

    return NextResponse.json({
      "Plataforma Registrada Exitosamente": platform,
    });
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
