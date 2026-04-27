import { NextResponse } from "next/server";
import { updateUserPassword } from "@/services/user/update-user-password";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    await updateUserPassword(body);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}