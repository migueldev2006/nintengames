import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request, context) {
  try {
    const id = parseInt(context.params.id);
    const category = await prisma.categories.findFirst({
      where: {
        id: id,
      },
    });

    if (!category) {
      return NextResponse.json(
        {
          message: `No se encontrola categoria con el id ${id}`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error al Buscar la categoria".error?.message || error);
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
        { message: "No se encuentra la categoria" },
        { status: 404 }
      );
    }

    const json = await request.json();

    const category = await prisma.categories.update({
      where: {
        id: id,
      },
      data:{
        name:json.name
      },
    });

    return NextResponse.json({ "Categoria Actualizada Exitosamente": category });
  } catch (error) {
    console.error("Error al actualizar la categoria".error?.message || error);
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

    await prisma.categories.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: "Categoria Elimiada con Exito" });
  } catch (error) {
    console.error("Error al eliminar la categoria".error?.message || error);
    return NextResponse.json(
      {
        message: "Ha ocurrido un error en el servidor ",
      },
      { status: 500 }
    );
  }
}
