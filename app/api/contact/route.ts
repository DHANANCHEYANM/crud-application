import { NextResponse } from "next/server";
import { db } from "@/db";
import { contacts } from "@/db/schema/contact-schema";

export async function GET() {
  try {
    const data = await db
      .select()
      .from(contacts);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(
    "PUT ERROR:",
    error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch contacts",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();

    const result = await db
      .insert(contacts)
      .values({
        name: body.name,
        email: body.email,
        phone: body.phone,
        status: body.status,
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
  console.error(
    "POST ERROR:",
    error
  );

  return NextResponse.json(
    {
      success: false,
      message:
        "Failed to create contact",
    },
    { status: 500 }
  );
}
}