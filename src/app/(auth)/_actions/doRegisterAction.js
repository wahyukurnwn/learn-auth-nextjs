"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";

export async function doRegisterAction(_, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !email || !password) {
    return {
      success: false,
      message: "all fields are required!",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return {
      success: false,
      message: "user already registered!",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    success: true,
    message: "Register success!",
  };
}
