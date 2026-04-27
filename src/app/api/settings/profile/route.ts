import { NextResponse } from "next/server";
import { updateUserProfile } from "@/services/user/update-user-profile";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const user = await updateUserProfile(body);

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}