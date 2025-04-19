"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { responseType, signupType } from "@/lib/types";

interface myError extends Error {
  status: number;
}

export async function signup(
  prevState: responseType,
  formdata: FormData
): Promise<responseType> {
  const name = formdata.get("name") as string;
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;
  // Check if user already exists

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      const err = new Error("User already exists") as myError;
      err.status = 400;
      throw err;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generating a unique username
    const baseUsername = name.trim().toLowerCase().replace(/\s+/g, "_");
    let username = baseUsername;
    let counter = 1;

    while (await prisma.user.findUnique({ where: { username } })) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
      omit: {
        password: true,
      },
    });

    return {
      error: false,
      message: "User created successfully",
      status: 201,
      payload: user,
    };
  } catch (error) {
    const err = error as myError;

    return {
      error: true,
      message: err.message || "Something went wrong",
      status: err.status || 500,
      payload: {name, email, password} as signupType,
    };
  }
}
