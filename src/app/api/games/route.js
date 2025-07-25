import { guardarImage } from "@/app/lib/image/guardarImage";
import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const game = await prisma.games.findMany();

    return NextResponse.json(game);
  } catch (error) {
    console.error("Error al crear el juego".error?.message || error);
    return NextResponse.json(
      {
        message: "Ha ocurrido un error en el servidor ",
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const platform_id = parseInt(formData.get("platform") || "");
    const category_id = parseInt(formData.get("category") || "");
    const year = parseInt(formData.get("year") || "");
    const coverFile = formData.get("cover");
    console.log("Archivo recibido:", coverFile);
    console.log("Nombre:", coverFile?.name);
    console.log("Tipo:", coverFile?.type);
    console.log("Tamaño:", coverFile?.size);
    // Validaciones básicas
    if (!title || isNaN(platform_id) || isNaN(category_id)) {
      return NextResponse.json(
        { error: "Datos requeridos inválidos" },
        { status: 400 }
      );
    }



    // Validar imagen
    if (!coverFile || typeof coverFile === "string") {
      return NextResponse.json(
        { error: "Imagen de portada faltante o inválida" },
        { status: 400 }
      );
    }

    // Guardar imagen
    const cover = await guardarImage(coverFile);

    // Crear juego
    const juego = await prisma.games.create({
      data: {
        title,
        platform_id,
        category_id,
        year, 
        cover,
      },
    });

    return NextResponse.json({ message: "Juego creado", juego });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al crear juego" },
      { status: 500 }
    );
  }
}
