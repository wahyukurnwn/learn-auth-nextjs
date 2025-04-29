"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function doLoginAction(_, formData) {
  const cookieStore = await cookies();
  const email = formData.get("email");
  const password = formData.get("password");

  // Validasi input
  if (!email || !password) {
    return {
      success: false,
      message: "All fields are required",
    };
  }

  // Cari user di database
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Validasi user
  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  // Validasi password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return {
      success: false,
      message: "Invalid password",
    };
  }

  // create session
  const newSession = await prisma.session.create({
    data: {
      userId: user.id,
      expiredAt: new Date(Date.now() + 30 * 60 * 60 * 10000 * 24),
    },
  });

  cookieStore.set("sessionId", newSession.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: newSession.expiredAt,
    sameSite: true,
  });

  redirect("/dashboard");
}
