import { NextResponse } from "next/server";
import { db } from "@/db";
import { contacts } from "@/db/schema/contact-schema";
import { eq } from "drizzle-orm";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const result = await db
    .update(contacts)
    .set({
      name: body.name,
      email: body.email,
      phone: body.phone,
      status: body.status,
    })
    .where(eq(contacts.id, id))
    .returning();

  return NextResponse.json(result);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await db
    .delete(contacts)
    .where(eq(contacts.id, id));

  return NextResponse.json({
    success: true,
  });
}