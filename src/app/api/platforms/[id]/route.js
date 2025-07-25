import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request, context) {
  try {
    const id = parseInt(context.params.id);
    const plataform = await prisma.platforms.findFirst({
      where: {
        id: id,
      },
    });

    if (!plataform) {
      return NextResponse.json(
        {
          message: `No se encontro la plataforma con el id ${id}`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(plataform);
  } catch (error) {
    console.error("Error al Buscar la plataforma".error?.message || error);
    return NextResponse.json(
      {
        message: "Ha ocurrido un error en el servidor ",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request, context) {
  try {
    const id = parseInt(context.params.id);

    if (!id) {
      return NextResponse.json(
        { message: "No se encuentra la plataforma" },
        { status: 404 }
      );
    }

    const json = await request.json();
    const plataform = await prisma.platforms.update({
      where: {
        id: id,
      },
      data: {
        name:json.name
      },
    });

    return NextResponse.json({ "Plataforma Actualizada Exitosamente": plataform });
  } catch (error) {
    console.error("Error al actualizar la plataforma".error?.message || error);
    return NextResponse.json(
      {
        message: "Ha ocurrido un error en el servidor ",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  try {
    const id = parseInt(context.params.id);

    await prisma.platforms.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: "Plataforma Elimiada con Exito" });
  } catch (error) {
    console.error("Error al eliminar la plataforma".error?.message || error);
    return NextResponse.json(
      {
        message: "Ha ocurrido un error en el servidor ",
      },
      { status: 500 }
    );
  }
}
