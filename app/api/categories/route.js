import { NextResponse } from "next/server";

import { prisma } from "../../lib/prisma";

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
  const { name, active } = await request.json();
  if (name.trim() === "") {
    return NextResponse.json("no puede haber datos vacios");
  }
  const newCategory = await prisma.categories.create({
    data: {
      name,
      active,
      
    },
  });
  return NextResponse.json(newCategory);
}
