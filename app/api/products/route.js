import { NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const products = await prisma.products.findMany();
  // console.log(products)
  return NextResponse.json(products);
}

export async function POST(request) {
  const { name, active, price, categoryId } = await request.json();
  if (name.trim() === "") {
    return NextResponse.json("no puede haber datos vacios");
  }
  const newProduct = await prisma.products.create({
    data: {
      name,
      active,
      price,
      categoryId,
    },
  });
  return NextResponse.json(newProduct);
}
