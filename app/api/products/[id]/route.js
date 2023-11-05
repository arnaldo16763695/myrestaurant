import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';



export async function GET(request, { params }) {


    const product = await prisma.products.findUnique({
        where: {
            id: params.id,
        },
        select: {
            id: true,
            name: true,
            price: true,
            categoryId: true
        },
    })

    // return NextResponse.json({data: product, status:200})
    return NextResponse.json(product);
}


export async function POST(request) {
    const { id, name, price, categoryId } = await request.json();

    if (name.trim() === "" || categoryId.toString().trim() === "" || price.toString().trim() === "") {
        return NextResponse.json({ status: 201, message: "No puede haber datos vacios" });
    }
    if (isNaN(price)) {
        return NextResponse.json({ status: 201, message: "El precio debe ser numerico" });
    }
    if (isNaN(categoryId)) {
        return NextResponse.json({ status: 201, message: "La categoria es incorrecta" });
    }
    if (price <= 0) {
        return NextResponse.json({ status: 201, message: "El precio debe ser un valor positivo superior a cero" });
    }
    console.log("*******",id, name, price, categoryId)
    try {
        const newProduct = await prisma.products.update({
            where: {
                id: id
            },
            data: {
                name,
                price: parseFloat(price),
                categoryId: parseInt(categoryId)
              },
        });

        return NextResponse.json({ data: newProduct, status: 200, message: 'Registro editado exitosamente!!' });

    } catch (error) {
        return NextResponse.json(error);
    }
}