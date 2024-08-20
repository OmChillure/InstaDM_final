import { loginWithCreds } from "@/actions/auth";
import db from "@/lib/db";
import { saltAndHashPassword } from "@/lib/helpers";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { email, password, name } = await request.json();

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hash = saltAndHashPassword(password);
  try {
    const newUser = await db.user.create({
      data: {
        email,
        password: hash,
        name,
      },
    });

    return NextResponse.json(newUser, { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
