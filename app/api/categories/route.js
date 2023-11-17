import { NextResponse } from "next/server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const categories = await prisma.categories.findMany();
    // console.log(products)
    return NextResponse.json(categories);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request) {
  const { name } = await request.json();
  if (name.trim() === "" ) {
    return NextResponse.json({ status: 201, message: "No puede haber campos vacíos" });
  }

  try {
    const newCategory = await prisma.categories.create({
      data: {
        name,
      },
    });
    revalidatePath('/menu');
    
    return NextResponse.json({ data: newCategory, status: 200, message: 'Registro creado exitosamente!!' });

  } catch (error) {
    return NextResponse.json(error);
  }

}
