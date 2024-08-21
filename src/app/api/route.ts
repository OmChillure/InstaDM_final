import { NextResponse } from 'next/server';

export const POST = async (request: any) => {
    const { username } = await request.json();
    return NextResponse.json({ success: true, user: username }, { status: 200 });
};

export const GET = async (request: any) => {
    return new NextResponse(`Hello Instadm` ,{ status: 200 });
};