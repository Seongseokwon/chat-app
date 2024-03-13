import prisma from "@/libs/prismadb";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("### 123", body);

  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 13);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json({ message: "hellow " });
}
