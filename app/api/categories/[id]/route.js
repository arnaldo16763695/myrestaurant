import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';



export async function GET(request, { params }) {

    const id = parseInt(params.id)
    const categ = await prisma.categories.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,            
        },
    })

    // return NextResponse.json({data: product, status:200})
    return NextResponse.json(categ);
}


export async function POST(request) {
    const { id, name } = await request.json();
    const myId = parseInt(id)
    if ( name.trim() === "" ) {
        return NextResponse.json({ status: 201, message: "No puede haber datos vacios" });
    }
    
    
    try {
        const Newcategory = await prisma.categories.update({
            where: {
                id: myId
            },
            data: {
                name,      
               
              },
        });

        return NextResponse.json({ data: Newcategory, status: 200, message: 'Registro editado exitosamente!!' });

    } catch (error) {
        return NextResponse.json(error);
    }
}