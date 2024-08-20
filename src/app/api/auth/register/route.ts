import db from "@/lib/db";
import { saltAndHashPassword } from "@/lib/helpers";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  try {
    const { email, password, name } = await request.json();

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hash = saltAndHashPassword(password);
    const newUser = await db.user.create({
      data: {
        email,
        password: hash,
        name,
      },
    });

    return NextResponse.json({ success: true, user: newUser }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message },
      { status: 200 }
    );
  }
};
