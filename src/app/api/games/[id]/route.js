import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
import { guardarImage } from "@/app/lib/image/guardarImage";

const prisma = new PrismaClient();

export async function GET(request, context) {
  try {
    const id = parseInt(context.params.id);
    const game = await prisma.games.findFirst({
      where: {
        id: id,
      },
    });

    if (!game) {
      return NextResponse.json(
        {
          message: `No se encontro el juego con el id ${id}`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(game);
  } catch (error) {
    console.error("Error al Buscar el juego".error?.message || error);
    return NextResponse.json(
      {
        message: "Ha ocurrido un error en el servidor ",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req,context) {
  const id = parseInt(context.params.id);
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const platform_id = parseInt(formData.get("platform"));
    const category_id = parseInt(formData.get("category"));
    const year = parseInt(formData.get("year"));
    const coverFile = formData.get("cover");

    const dataToUpdate = {
      title,
      platform_id,
      category_id,
      year,
    };

    const newCover = await guardarImage(coverFile);
    if (newCover) dataToUpdate.cover = newCover;

    const juegoActualizado = await prisma.games.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json({
      message: "Juego actualizado",
      juego: juegoActualizado,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al actualizar juego" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  try {
    const id = parseInt(context.params.id);

    await prisma.games.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: "Juego Elimiado con Exito" });
  } catch (error) {
    console.error("Error al eliminar el juego".error?.message || error);
    return NextResponse.json(
      {
        message: "Ha ocurrido un error en el servidor ",
      },
      { status: 500 }
    );
  }
}
