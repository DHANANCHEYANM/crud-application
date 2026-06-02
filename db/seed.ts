// db/seed.ts

import { auth } from "@/lib/auth";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema/schema";

const usersToSeed = [
  {
    email: "dhana@gmail.com",
    name: "Dhanancheyan",
    password: "Dhana@123",
    role: "admin",
  },
];

export async function seedUsers() {
  console.log("🌱 Seeding users...");

  for (const userData of usersToSeed) {
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, userData.email))
      .limit(1);

    if (existing.length > 0) {
      console.log(
        `⚠️ User ${userData.email} already exists, skipping...`
      );
      continue;
    }

    await auth.api.signUpEmail({
      body: {
        email: userData.email,
        name: userData.name,
        password: userData.password,
      },
    });

    await db
      .update(users)
      .set({
        role: userData.role,
        emailVerified: true,
      })
      .where(eq(users.email, userData.email));

    console.log(
      `✅ Created: ${userData.email}`
    );
  }

  console.log("✅ Seeding complete!");
}

seedUsers()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });