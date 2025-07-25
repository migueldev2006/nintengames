import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const category = await prisma.categories.findMany();

    return NextResponse.json({ Categorias: category });
  } catch (error) {
    console.error("Error al crear la categoria".error?.message || error);
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

    const category = await prisma.categories.create({
      data: json,
    });

    return NextResponse.json({
      "Categoria Registrada Exitosamente": category,
    });
  } catch (error) {
    console.error("Error al crear la categoria".error?.message || error);
    return NextResponse.json(
      {
        message: "Ha ocurrido un error en el servidor ",
      },
      { status: 500 }
    );
  }
}
