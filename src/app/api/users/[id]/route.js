import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request, context ) {
  try {
    const id = parseInt(context.params.id);
    const user = await prisma.users.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: `No se encontro el usuario con el id ${id}`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
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

export async function PATCH(request, context ) {
  try {
    const id = parseInt(context.params.id);

    if (!id) {
      return NextResponse.json(
        { message: "No se encuentra el usuario" },
        { status: 404 }
      );
    }

      const json = await request.json();

    const user = await prisma.users.update({
      where: {
        id: id,
      },
      data:{
        fullname:json.fullname,
        email:json.email
      },
    });

    return NextResponse.json({ "Usuario ACtualizado Exitosamente": user });
  } catch (error) {
    console.error("Error al actualizar el Usuario".error?.message || error);
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

    await prisma.users.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: "Usuario Elimiado con Exito" });
  } catch (error) {
    console.error("Error al eliminar el Usuario".error?.message || error);
    return NextResponse.json(
      {
        message: "Ha ocurrido un error en el servidor ",
      },
      { status: 500 }
    );
  }
}
