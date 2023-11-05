import { NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const products = await prisma.products.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  // console.log(products)
  return NextResponse.json(products);
}

export async function POST(request) {
  const { name, price, categoryId } = await request.json();
  
  if (name.trim() === "" || categoryId.trim() === "" || price.trim() === "") {
    return NextResponse.json({status:201, message: "No puede haber datos vacios"});
  }
  if (isNaN(price)) {
    return NextResponse.json({status:201, message: "El precio debe ser numerico"});
  }
  if (isNaN(categoryId)) {
    return NextResponse.json({status:201, message: "La categoria es incorrecta"});
  }
  if (price <= 0) {
    return NextResponse.json({status:201, message: "El precio debe ser un valor positivo superior a cero"});
  }

  try {
    const newProduct = await prisma.products.create({
      data: {
        name,
        price: parseFloat(price),
        categoryId: parseInt(categoryId)
      },
    });

    return NextResponse.json({data:newProduct, status:200, message:'Registro creado exitosamente!!'});

  } catch (error) {
    return NextResponse.json(error);
  }
}
