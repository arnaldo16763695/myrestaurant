import { NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";

import bcrypt from "bcrypt";

export async function GET() {
  const users = await prisma.user.findMany();
  console.log(users);
  return NextResponse.json(users);
}

export async function POST(request) {
  const { email, password, name } = await request.json();
  if (email.trim() === "" || password.trim() === "" || name.trim() === "") {
    // return NextResponse.json("no puede haber datos vacios");
    return  NextResponse.json({
      status: 400,
      message: "No puede haber datos vacíos",
    });
  }

  const exist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (exist) {
    return NextResponse.json({
      status: 400,
      message: "Email ya existe",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
  return NextResponse.json(newUser);
}
