"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { responseType, signupType } from "@/lib/types";
import { signupSchema } from "@/validations/user";
import { createSession } from "@/lib/session";

interface myError extends Error {
  status: number;
  errors?: {
    [key: string]: string[];
  };
}

export async function signup(
  prevState: responseType,
  formdata: FormData
): Promise<responseType> {
  const signupData = {
    name: formdata.get("name"),
    password: formdata.get("password"),
    email: formdata.get("email"),
  };
  const validation = signupSchema.safeParse(signupData);

  const { name, email, password } = signupData as signupType;

  try {
    if (!validation.success) {
      const err = new Error() as myError;
      err.errors = validation.error.flatten().fieldErrors;
      throw err;
    }

    // Check if user already exists
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
        profile: {
          create: {},
        },
      },
      omit: {
        password: true,
      },
    });

    await createSession(user.id);

    return {
      success: true,
      message: "User created successfully",
      status: 201,
      payload: { user },
    };
  } catch (error) {
    const err = error as myError;

    return {
      success: false,
      message: err.message,
      status: err.status,
      errors: err.errors,
      data: { name, email, password },
    };
  }
}
